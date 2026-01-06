const output = document.getElementById("assistantOutput");
const input = document.getElementById("assistantInput");
const sendBtn = document.getElementById("assistantSend");

let currentModule = "planner";

/* MODULE ROUTER */
const modules = {
  planner: (text) => `📸 <b>Photo Planner</b><br>I'll help you plan your shot.<br><br>You asked: "${text}"`,
  gear: (text) => `🔧 <b>Gear Advisor</b><br>Let's talk equipment.<br><br>You asked: "${text}"`,
  lighting: (text) => `💡 <b>Lighting Assistant</b><br>Lighting makes the photo.<br><br>You asked: "${text}"`,
  composition: (text) => `📐 <b>Composition Coach</b><br>Let's refine your framing.<br><br>You asked: "${text}"`,
  creative: (text) => `🎨 <b>Creative Generator</b><br>Let's spark some ideas.<br><br>You asked: "${text}"`
};

/* SIDEBAR CLICK HANDLER */
document.querySelectorAll(".sidebar-item").forEach(item => {
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

