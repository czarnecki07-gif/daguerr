alert("assistant-panel.js działa!");

// ========== PODSTAWOWA KONFIGURACJA ==========

// Aktualny moduł (domyślnie planner)
let currentModule = "planner";

// Pobieramy elementy z DOM
const output = document.getElementById("assistantOutput");
const input = document.getElementById("assistantInput");
const sendBtn = document.getElementById("assistantSend");

// Prosta ochrona: jeśli któregoś elementu brakuje, przerwij
if (!output || !input || !sendBtn) {
  console.error("Brakuje elementów assistantOutput / assistantInput / assistantSend w HTML.");
}

// ========== MODUŁY ==========

const modules = {
  planner: (text) =>
    `📸 <b>Photo Planner</b><br><br>You asked: "${text}"<br><br>I’ll help you plan your shot step by step.`,
  gear: (text) =>
    `🔧 <b>Gear Advisor</b><br><br>You asked: "${text}"<br><br>We’ll choose the best lenses, bodies and accessories.`,
  lighting: (text) =>
    `💡 <b>Lighting Assistant</b><br><br>You asked: "${text}"<br><br>Let’s design a lighting setup for your scene.`,
  composition: (text) =>
    `📐 <b>Composition Coach</b><br><br>You asked: "${text}"<br><br>We’ll refine framing, balance and visual flow.`,
  creative: (text) =>
    `🎨 <b>Creative Generator</b><br><br>You asked: "${text}"<br><br>Let’s generate ideas, concepts and variations.`
};

// ========== WYSYŁANIE WIADOMOŚCI ==========

function sendMessage() {
  if (!input || !output) return;

  const text = input.value.trim();
  if (!text) return;

  console.log("currentModule =", currentModule);
  console.log("moduleFn =", modules[currentModule]);

  addUserMessage(text);
  input.value = "";

  const moduleFn = modules[currentModule] || modules["planner"];
  const response = moduleFn ? moduleFn(text) : "⚠️ Module not found.";

  console.log("response =", response);

  addAssistantMessage(response);
}


// ========== RENDEROWANIE WIADOMOŚCI ==========

function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "msg user-msg";
  div.innerHTML = text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

function addAssistantMessage(text) {
  const div = document.createElement("div");
  div.className = "msg assistant-msg";
  div.innerHTML = text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

// ========== ZDARZENIA (CLICK + ENTER) ==========

if (sendBtn) {
  sendBtn.addEventListener("click", sendMessage);
}

if (input) {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
}
// ========== WYBÓR MODUŁU (NOWE PRZYCISKI W JEDNEJ LINII) ==========

document.querySelectorAll(".module-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const mod = btn.dataset.module;
    if (!mod || !modules[mod]) return;

    // ustaw aktualny moduł
    currentModule = mod;

    // usuń active ze wszystkich
    document.querySelectorAll(".module-btn").forEach(b => b.classList.remove("active"));

    // dodaj active do klikniętego
    btn.classList.add("active");
  });

// ========== USTAW DOMYŚLNIE AKTYWNY MODUŁ ==========

const defaultBtn = document.querySelector('.module-btn[data-module="planner"]');
if (defaultBtn) {
  defaultBtn.classList.add("active");
}
