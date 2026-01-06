// ======================================================
//  BASIC STATE
// ======================================================

let assistantData = null;
let currentLang = "en";
let activeModule = "Photo Planner"; // default module


// ======================================================
//  MODULE SYSTEM PROMPTS
// ======================================================

function getSystemPrompt(module) {
  switch (module) {

    case "Photo Planner":
      return "You are DAGUERR Photo Planner — a precise, calm, highly practical assistant who helps photographers plan a shot from idea to execution. Ask 1–2 clarifying questions if needed. Provide a clear plan: light, composition, timing, camera settings, backup options. Offer 2–3 variations: safe, cinematic, bold. Your tone: confident, concise, helpful.";

    case "Gear Advisor":
      return "You are DAGUERR Gear Advisor — a neutral, expert-level consultant for photography equipment. Recommend gear based on the user's budget, style, and goals. Compare options clearly (pros, cons, use cases). Suggest lenses, bodies, lights, filters, tripods, accessories. Give 2–3 alternatives for every recommendation. Tone: objective, technical, trustworthy.";

    case "Lighting Assistant":
      return "You are DAGUERR Lighting Assistant — a specialist in understanding and shaping light. Explain what the light is doing and why it matters. Suggest specific setups: positions, angles, distances, modifiers. Provide natural light, artificial light, and mixed-light solutions. Offer 2–3 variants: safe, creative, bold. Tone: practical, visual, encouraging.";

    case "Composition Coach":
      return "You are DAGUERR Composition Coach — a mentor for visual storytelling. Analyze the user's idea and propose strong framing options. Explain balance, leading lines, depth, rhythm, negative space. Suggest 2–3 compositions: classic, modern, experimental. Tone: artistic, clear, constructive.";

    case "Creative Generator":
      return "You are DAGUERR Creative Generator — a source of bold, cinematic, unexpected photo ideas. Generate creative concepts based on the user's theme. Offer 3 ideas: simple, cinematic, extreme. Include mood, light, color palette, props, location, emotion. Tone: imaginative, energetic, inspiring.";

    default:
      return "You are DAGUERR Photo Assistant — a helpful, intelligent photography companion.";
  }
}


// ======================================================
//  LOAD JSON + RENDER MODAL CONTENT
// ======================================================

async function loadAssistantData() {
  try {
    const response = await fetch("json/photo.json");
    assistantData = await response.json();
    renderAssistant(currentLang);
  } catch (error) {
    console.error("Error loading assistant JSON:", error);
  }
}

function renderAssistant(lang) {
  if (!assistantData) return;

  const safeLang = assistantData.role[lang] ? lang : "en";

  document.getElementById("assistantRole").textContent =
    assistantData.role[safeLang];

  document.getElementById("assistantWelcome").textContent =
    assistantData.welcome[safeLang];

  fillList("assistantInstructions", assistantData.instructions[safeLang], assistantData.instructions["en"]);
  fillList("assistantFeatures", assistantData.features[safeLang], assistantData.features["en"]);
  fillList("assistantExamples", assistantData.examples[safeLang], assistantData.examples["en"]);
}

function fillList(id, primary, fallback) {
  const ul = document.getElementById(id);
  ul.innerHTML = "";

  const items = primary.length > 0 ? primary : fallback;

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}


// ======================================================
//  MODAL LOGIC
// ======================================================

function setupModal() {
  const modal = document.getElementById("assistantModal");
  const openBtn = document.getElementById("openAssistantBtn");
  const closeBtn = document.getElementById("closeAssistantBtn");

  openBtn.addEventListener("click", () => {
    modal.classList.add("visible");
    renderAssistant(currentLang);
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("visible");
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("visible");
    }
  });
}


// ======================================================
//  LANGUAGE SYNC
// ======================================================

function setupLanguageSync() {
  const select = document.getElementById("languageSelect");
  currentLang = select.value;

  select.addEventListener("change", () => {
    currentLang = select.value;
    renderAssistant(currentLang);
  });
}


// ======================================================
//  CHAT UI LOGIC
// ======================================================

function addMessage(text, sender) {
  const output = document.querySelector(".assistant-output");

  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;

  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

async function sendMessageToAI(userMessage) {
  const apiKey = document.getElementById("apiKeyInput")?.value.trim();

  if (!apiKey) {
    return "Please paste your OpenAI API Key.";
  }

  const systemPrompt = getSystemPrompt(activeModule);

  const body = {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ]
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response.";
}


// ======================================================
//  MODULE BUTTONS
// ======================================================

function setupModuleButtons() {
  const buttons = document.querySelectorAll(".module-button");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      activeModule = btn.textContent.trim();
    });
  });
}


// ======================================================
//  INIT
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  setupModal();
  setupLanguageSync();
  setupModuleButtons();
  loadAssistantData();

  const input = document.getElementById("assistantInput");
  const button = document.getElementById("assistantSend");

  button.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const reply = await sendMessageToAI(text);
    addMessage(reply, "assistant");
  });
});
