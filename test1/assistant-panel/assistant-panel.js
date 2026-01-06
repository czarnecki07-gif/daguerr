let lang = localStorage.getItem("lang") || "en";
const output = document.getElementById("assistantOutput");
const input = document.getElementById("assistantInput");
const sendBtn = document.getElementById("assistantSend");
sendBtn.addEventListener("click", sendMessage);

let currentModule = "planner";

/* MODULE ROUTER */
const modules = {
  planner: (text) => `📸 <b>Photo Planner</b><br>I'll help you plan your shot.<br><br>You asked: "${text}"`,
  gear: (text) => `🔧 <b>Gear Advisor</b><br>Let's talk equipment.<br><br>You asked: "${text}"`,
  lighting: (text) => `💡 <b>Lighting Assistant</b><br>Lighting makes the photo.<br><br>You asked: "${text}"`,
  composition: (text) => `📐 <b>Composition Coach</b><br>Let's refine your framing.<br><br>You asked: "${text}"`,
  creative: (text) => `🎨 <b>Creative Generator</b><br>Let's spark some ideas.<br><br>You asked: "${text}"`
};
/* SEND MESSAGE FUNCTION */
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

/* ENTER KEY SUPPORT */
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});


/* SIDEBAR CLICK HANDLER */

  item.addEventListener("click", () => {
    document.querySelectorAll(".sidebar-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
    currentModule = item.dataset.module;
  });
});

/* SEND MESSAGE */
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = "";

  const response = modules[currentModule](text);
  addAssistantMessage(response);
}


  // User bubble
  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerHTML = text;
  output.appendChild(userMsg);

  // Assistant bubble
  const assistantMsg = document.createElement("div");
  assistantMsg.className = "message assistant";
  assistantMsg.innerHTML = modules[currentModule](text);
  output.appendChild(assistantMsg);

  input.value = "";
  output.scrollTop = output.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
// Apply translations to UI
document.querySelector(".assistant-welcome h2").innerText = t[lang].welcome_title;
document.querySelector(".assistant-welcome p").innerText = t[lang].welcome_sub;
document.getElementById("assistantInput").placeholder = t[lang].placeholder;
document.getElementById("assistantSend").innerText = t[lang].send;

// Translate inline module buttons
document.querySelector('[data-module="planner"]').innerText = t[lang].modules.planner;
document.querySelector('[data-module="gear"]').innerText = t[lang].modules.gear;
document.querySelector('[data-module="lighting"]').innerText = t[lang].modules.lighting;
document.querySelector('[data-module="composition"]').innerText = t[lang].modules.composition;
document.querySelector('[data-module="creative"]').innerText = t[lang].modules.creative;

