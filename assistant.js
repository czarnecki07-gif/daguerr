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
console.log("Assistant JS loaded");
