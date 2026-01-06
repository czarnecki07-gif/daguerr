document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("assistantModal");
    const openBtn = document.getElementById("openAssistantBtn");
    const closeBtn = document.getElementById("closeAssistantBtn");

    // Otwieranie modala
    openBtn.addEventListener("click", () => {
        modal.classList.add("visible");
        console.log("Modal opened");
    });

    // Zamykanie modala przyciskiem X
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("visible");
        console.log("Modal closed (button)");
    });

    // Zamykanie kliknięciem w tło
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("visible");
            console.log("Modal closed (backdrop)");
        }
    });

    console.log("assistant.js v0.1 loaded");
});
