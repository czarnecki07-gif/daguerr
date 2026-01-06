let assistantData = null;
let currentLang = "en";

async function loadAssistantData() {
    const response = await fetch("json/photo.json");
    assistantData = await response.json();
    renderAssistant(currentLang);
}

function renderAssistant(lang) {
    const safe = assistantData.role[lang] ? lang : "en";

    document.getElementById("assistantRole").textContent =
        assistantData.role[safe];

    document.getElementById("assistantWelcome").textContent =
        assistantData.welcome[safe];

    fill("assistantInstructions", assistantData.instructions[safe], assistantData.instructions.en);
    fill("assistantFeatures", assistantData.features[safe], assistantData.features.en);
    fill("assistantExamples", assistantData.examples[safe], assistantData.examples.en);
}

function fill(id, primary, fallback) {
    const ul = document.getElementById(id);
    ul.innerHTML = "";
    (primary.length ? primary : fallback).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });
}

function setupModal() {
    const modal = document.getElementById("assistantModal");
    const open = document.getElementById("openAssistantBtn");
    const close = document.getElementById("closeAssistantBtn");

    open.onclick = () => modal.classList.add("visible");
    close.onclick = () => modal.classList.remove("visible");

    window.onclick = e => {
        if (e.target === modal) modal.classList.remove("visible");
    };
}

function setupLang() {
    const select = document.getElementById("languageSelect");
    currentLang = select.value;

    select.onchange = () => {
        currentLang = select.value;
        renderAssistant(currentLang);
    };
}

document.addEventListener("DOMContentLoaded", () => {
    setupModal();
    setupLang();
    loadAssistantData();
});
