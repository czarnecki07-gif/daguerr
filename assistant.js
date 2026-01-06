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
        assistantData.role[safeLang] || assistantData.role["en"];

    document.getElementById("assistantWelcome").textContent =
        assistantData.welcome[safeLang] || assistantData.welcome["en"];

    fillList("assistantInstructions", assistantData.instructions[safeLang], assistantData.instructions["en"]);
    fillList("assistantFeatures", assistantData.features[safeLang], assistantData.features["en"]);
    fillList("assistantExamples", assistantData.examples[safeLang], assistantData.examples["en"]);
}

function fillList(elementId, primaryArray, fallbackArray) {
    const ul = document.getElementById(elementId);
    ul.innerHTML = "";

    const items = (primaryArray && primaryArray.length > 0)
        ? primaryArray
        : fallbackArray;

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
        modal.style.display = "block";
        renderAssistant(currentLang);
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
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

