// ========== KONFIGURACJA ==========

let currentModule = "planner";

const input = document.getElementById("assistantInput");
const output = document.getElementById("assistantOutput");
const sendBtn = document.getElementById("assistantSend");

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
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = "";

  const moduleFn = modules[currentModule] || modules["planner"];
  const response = moduleFn(text);

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

// ========== ZDARZENIA ==========

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

// ========== WYBÓR MODUŁU ==========

document.querySelectorAll(".module-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const mod = btn.dataset.module;
    if (!mod || !modules[mod]) return;

    currentModule = mod;

    document.querySelectorAll(".module-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
}); // ← TEN NAWIAS BYŁ BRAKOWANY

// ========== DOMYŚLNY MODUŁ ==========

const defaultBtn = document.querySelector('.module-btn[data-module="planner"]');
if (defaultBtn) defaultBtn.classList.add("active");
