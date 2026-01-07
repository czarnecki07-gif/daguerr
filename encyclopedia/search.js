async function loadCategories() {
  const res = await fetch("data/categories.json");
  const categories = await res.json();

  const container = document.getElementById("categories");

  categories.forEach(cat => {
    const div = document.createElement("div");
    div.className = "category-card";
    div.textContent = cat.name;
    div.onclick = () => searchEntries(cat.id);
    container.appendChild(div);
  });
}

async function searchEntries(category = null) {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const res = await fetch("data/entries.json");
  const entries = await res.json();

  const results = entries.filter(e =>
    (!category || e.category === category) &&
    (e.title.toLowerCase().includes(query) ||
     e.content.toLowerCase().includes(query))
  );

  const container = document.getElementById("results");
  container.innerHTML = "";

  results.forEach(e => {
    const div = document.createElement("div");
    div.className = "result-item";
    div.textContent = e.title;
    div.onclick = () => location.href = `entry.html?id=${e.id}`;
    container.appendChild(div);
  });
}

loadCategories();
