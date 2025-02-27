
function generateParagraphs(paragraphs) {
    return paragraphs.map((text) => `<p>${text}</p>`).join("");
}

// Function to update text content based on selected language
function setLanguage(lang) {
    const langData = translations[lang];

    // Update the <title> tag separately
    document.querySelector("title").innerText = langData.title;
    // Set the language select's value
    document.getElementById("language-select").value = lang;

    // Loop through each key in the language data
    Object.keys(langData).forEach((key) => {
        const el = document.getElementById(key);
        const elData = langData[key]
        if (el) {
            if (typeof elData === 'string') {
                el.innerText = elData;
            } else {
                el.innerHTML = generateParagraphs(elData)
            }
        }
    });

    // Store the selected language in localStorage
    localStorage.setItem("language", lang);
}

// Initialize language on DOM load
document.addEventListener("DOMContentLoaded", function () {
    const langSelect = document.getElementById("language-select");

    // 1. Check for a cached language
    let savedLang = localStorage.getItem("language");

    if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
    } else {
        // 2. No stored language, so check browser's preferred language
        let browserLang = navigator.language.slice(0, 2);
        if (translations[browserLang]) {
            setLanguage(browserLang);
        } else {
            // Default to English if browser's language is not supported
            setLanguage("en");
        }
    }

    // 3. When language is changed, update and store new value
    langSelect.addEventListener("change", function () {
        setLanguage(this.value);
    });
});
