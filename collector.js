import Parser from "rss-parser";
import fs from "fs";
import fetch from "node-fetch";

const parser = new Parser();

// Load sources.json
const sources = JSON.parse(
  fs.readFileSync("./world/photography/sources.json", "utf8")
).sources;

let allItems = [];

async function fetchRSS(source) {
  try {
    const feed = await parser.parseURL(source.url);

    feed.items.forEach((item, index) => {
      allItems.push({
        id: `${source.id}-${Date.now()}-${index}`,
        title: item.title || "",
        description: item.contentSnippet || "",
        image: item.enclosure?.url || "",
        url: item.link || "",
        source: source.id,
        source_id: source.id,
        category: source.category,
        tags: [],
        published: item.isoDate || item.pubDate || ""
      });
    });
  } catch (err) {
    console.log("RSS error:", source.id, err.message);
  }
}

async function fetchYouTube(source) {
  try {
    const apiKey = process.env.YT_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${source.channelId}&part=snippet,id&order=date&maxResults=10`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.items) return;

    data.items.forEach((item, index) => {
      if (!item.id.videoId) return;

      allItems.push({
        id: `${source.id}-${Date.now()}-${index}`,
        title: item.snippet.title,
        description: item.snippet.description,
        image: item.snippet.thumbnails.medium.url,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        source: source.id,
        source_id: source.id,
        category: source.category,
        tags: [],
        published: item.snippet.publishedAt
      });
    });
  } catch (err) {
    console.log("YouTube error:", source.id, err.message);
  }
}

async function run() {
  for (const source of sources) {
    if (source.type === "rss") await fetchRSS(source);
    if (source.type === "youtube") await fetchYouTube(source);
  }

  // Sort by date
  allItems.sort((a, b) => new Date(b.published) - new Date(a.published));

  // Limit to 200 items
  allItems = allItems.slice(0, 200);

  const output = {
    generated_at: new Date().toISOString(),
    source_count: sources.length,
    item_count: allItems.length,
    items: allItems
  };

  fs.writeFileSync(
    "./world/photography/feed.json",
    JSON.stringify(output, null, 2)
  );

  console.log("Feed generated:", allItems.length, "items");
}

run();
