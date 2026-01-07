document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("assistant-form");
  const input = document.getElementById("assistant-input");
  const messages = document.getElementById("assistant-messages");

  if (!form || !input || !messages) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    // Tu później podłączymy prawdziwe AI.
    // Na razie prosta odpowiedź „echo” z lekkim przetworzeniem:
    setTimeout(() => {
      const reply =
        "Odebrałem Twoją wiadomość:\n\n" +
        text +
        "\n\nNa tym etapie to tryb demo. W finalnej wersji tutaj odpowiada QASSIX AI Assistant.";
      addMessage("system", reply);
      scrollToBottom();
    }, 400);
  });

  function addMessage(role, text) {
    const wrapper = document.createElement("div");
    wrapper.className =
      "message " + (role === "user" ? "message-user" : "message-system");

    const label = document.createElement("div");
    label.className = "message-label";
    label.textContent = role === "user" ? "Ty" : "Asystent";

    const body = document.createElement("div");
    body.className = "message-body";
    body.textContent = text;

    wrapper.appendChild(label);
    wrapper.appendChild(body);
    messages.appendChild(wrapper);
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }
});
