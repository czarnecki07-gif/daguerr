let assistantData = null;
let currentLang = "en";

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

function setupLanguageSync() {
    const select = document.getElementById("languageSelect");
    currentLang = select.value;

    select.addEventListener("change", () => {
        currentLang = select.value;
        renderAssistant(currentLang);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupModal();
    setupLanguageSync();
    loadAssistantData();
});

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("assistantInput");
  const button = document.getElementById("assistantSend");

  if (!input || !button) {
    console.warn("Chat UI not found in DOM.");
    return;
  }

  button.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const reply = await sendMessageToAI(text);
    addMessage(reply, "assistant");
  });
});

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
    return "Wklej swój OpenAI API Key.";
  }

  const body = {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are DAGUERR Photo Assistant." },
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
  return data.choices?.[0]?.message?.content || "Brak odpowiedzi.";
}

// --- CHAT LOGIC ---

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

  const body = {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are DAGUERR Photo Assistant." },
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

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("assistantInput");
  const button = document.getElementById("assistantSend");

  if (!input || !button) {
    console.warn("Chat UI not found.");
    return;
  }

  button.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const reply = await sendMessageToAI(text);
    addMessage(reply, "assistant");
  });
});

