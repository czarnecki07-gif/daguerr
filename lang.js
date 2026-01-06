const translations = {
    en: {
        menu_assistant: "Photo Assistant",
        menu_gear: "Gear Finder",
        menu_world: "Photo World",
        menu_encyclopedia: "Encyclopedia",
        hero_title: "Daguerr Photo Assistant",
        hero_subtitle: "Your intelligent companion for photography — planning, learning, creativity, and workflow.",
        hero_button: "Open Assistant"
    },

    pl: {
        menu_assistant: "Asystent Fotografa",
        menu_gear: "Gear Finder",
        menu_world: "Świat Fotografii",
        menu_encyclopedia: "Encyklopedia",
        hero_title: "Daguerr Photo Assistant",
        hero_subtitle: "Twój inteligentny pomocnik fotograficzny — planowanie, nauka, kreatywność i workflow.",
        hero_button: "Otwórz Asystenta"
    },

    de: {}, fr: {}, es: {}, it: {}, pt: {}, nl: {}, cz: {}, ua: {}, zh: {}, ja: {}
};

document.getElementById("languageSelect").addEventListener("change", function () {
    const lang = this.value;

    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        el.textContent = translations[lang][key] || translations["en"][key];
    });
});
