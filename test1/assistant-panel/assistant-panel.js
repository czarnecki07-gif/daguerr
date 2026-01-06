/* LOAD LANGUAGE */
let lang = localStorage.getItem("lang") || "en";

/* ELEMENTS */
const output = document.getElementById("assistantOutput");
const input = document.getElementById("assistantInput");
const sendBtn = document.getElementById("assistantSend");

/* CURRENT MODULE */
let currentModule = "planner";

/* MODULE ROUTER */
const modules = {
  planner: (text) => `📸 <b>${t[lang].modules.planner}</b><br><br>${text}`,
  gear: (text) => `🔧 <b>${t[lang].modules.gear}</b><br><br>${text}`,
  lighting: (text) => `💡 <b>${t[lang].modules.lighting}</b><br><br>${text}`,
  composition: (text) => `📐 <b>${t[lang].modules.composition}</b><br><br>${text}`,
  creative: (text) => `🎨 <b>${t[lang].modules.creative}</b><br><br>${text}`
};

/* SEND MESSAGE */
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = "";

  const response = modules[currentModule](text);
  addAssistantMessage(response);
}

/* ADD USER MESSAGE */
function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "msg user-msg";
  div.innerHTML = text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

/* ADD ASSISTANT MESSAGE */
function addAssistantMessage(text) {
  const div = document.createElement("div");
  div.className = "msg assistant-msg";
  div.innerHTML = text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

/* CLICK SEND */
sendBtn.addEventListener("click", sendMessage);

/* ENTER KEY */
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

/* INLINE MODULE BUTTONS */
document.querySelectorAll(".module-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentModule = btn.dataset.module;
  });
});

/* APPLY TRANSLATIONS */
document.querySelector(".assistant-welcome h2").innerText = t[lang].welcome_title;
document.querySelector(".assistant-welcome p").innerText = t[lang].welcome_sub;
input.placeholder = t[lang].placeholder;
sendBtn.innerText = t[lang].send;

document.querySelector('[data-module="planner"]').innerText = t[lang].modules.planner;
document.querySelector('[data-module="gear"]').innerText = t[lang].modules.gear;
document.querySelector('[data-module="lighting"]').innerText = t[lang].modules.lighting;
document.querySelector('[data-module="composition"]').innerText = t[lang].modules.composition;
document.querySelector('[data-module="creative"]').innerText = t[lang].modules.creative;
