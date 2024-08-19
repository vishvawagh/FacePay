document.addEventListener('DOMContentLoaded', () => {
    const languageSwitch = document.getElementById('languageSwitch');
    const languageLabel = document.getElementById('languageLabel');
    
    // Text translations
    const translations = {
        en: {
            title: "Shopkeeper Transaction History",
            backButton: "Back",
            // Add more translations here as needed
        },
        mr: {
            title: "दुकानदार लेनदेन इतिहास",
            backButton: "परत",
            // Add more translations here as needed
        }
    };

    // Function to update text based on selected language
    const updateTextContent = (lang) => {
        document.querySelector('h1').textContent = translations[lang].title;
        document.getElementById('back_btn').textContent = translations[lang].backButton;
        // Update more elements as needed
    };

    // Check and apply initial language
    const applyInitialLanguage = () => {
        const savedLanguage = localStorage.getItem('language') || 'en';
        languageSwitch.checked = savedLanguage === 'mr';
        languageLabel.textContent = savedLanguage === 'mr' ? 'मराठी' : 'English';
        updateTextContent(savedLanguage);
    };

    // Toggle language
    languageSwitch.addEventListener('change', () => {
        const selectedLanguage = languageSwitch.checked ? 'mr' : 'en';
        languageLabel.textContent = selectedLanguage === 'mr' ? 'मराठी' : 'English';
        updateTextContent(selectedLanguage);
        localStorage.setItem('language', selectedLanguage);
    });

    // Apply initial language on page load
    applyInitialLanguage();
});
