


// Voice Interaction Button Functionality
document.getElementById('voice-interaction-btn').addEventListener('click', () => {
    const synth = window.speechSynthesis;
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    let currentStep = 0;

    const prompts = {
        en: [
            "Please say your mobile number.",
            "Please say your PIN."
        ],
        mr: [
            "कृपया आपला मोबाइल नंबर सांगा.",
            "कृपया आपला पिन सांगा."
        ]
    };

    const langSwitch = document.getElementById('languageSwitch').checked ? 'mr' : 'en';

    const getVoice = (lang) => {
        const voices = synth.getVoices();
        return voices.find(voice => voice.lang === (lang === 'mr' ? 'mr-IN' : 'en-US'));
    };

    const handleStep = (event) => {
        const userResponse = event.results[0][0].transcript;
        console.log(userResponse);

        if (currentStep === 0) {
            // Set the mobile number input value
            document.getElementById('mobileInp').value = userResponse;
            // Automatically invoke the next step after a 2-second delay
            setTimeout(() => {
                document.getElementById('submitBtn').click(); // Simulate the Face Login Button click
            }, 2000);
        } else if (currentStep === 1) {
            // Set the PIN input value
            document.getElementById('pinInp').value = userResponse;
            // Automatically invoke the PIN login button click
            setTimeout(() => {
                document.getElementById('submitPIN').click(); // Simulate the PIN Login Button click
            }, 2000);
        }

        currentStep++;
        if (currentStep < prompts[langSwitch].length) {
            askQuestion();
        }
    };

    const askQuestion = () => {
        if (currentStep < prompts[langSwitch].length) {
            const utterance = new SpeechSynthesisUtterance(prompts[langSwitch][currentStep]);
            utterance.voice = getVoice(langSwitch);
            utterance.lang = langSwitch === 'mr' ? 'mr-IN' : 'en-US';
            utterance.onend = () => {
                setTimeout(() => recognition.start(), 500); // Give enough time for user to respond
            };
            synth.speak(utterance);
        }
    };

    recognition.onresult = handleStep;
    recognition.onspeechend = () => recognition.stop();
    recognition.onerror = (event) => {
        console.log('Error occurred in recognition: ' + event.error);
        const errorMsg = langSwitch === 'mr' ? "समझा नाही, कृपया पुन्हा सांगा." : "I didn't get that, please repeat.";
        const utterance = new SpeechSynthesisUtterance(errorMsg);
        utterance.voice = getVoice(langSwitch);
        utterance.lang = langSwitch === 'mr' ? 'mr-IN' : 'en-US';
        synth.speak(utterance);
        setTimeout(() => recognition.start(), 500); // Give enough time for user to respond
    };

    askQuestion();
});

// Language Switch Functionality
document.getElementById('languageSwitch').addEventListener('change', () => {
    const isMarathi = document.getElementById('languageSwitch').checked;
    const translations = {
        en: {
            welcomeText: 'Check Balance!',
            mobilePlaceholder: 'Mobile Number',
            pinInp: 'PIN',
            keepLoggedInLabel: 'Keep me Logged In',
            noAccountText: 'Don\'t have an account?',
            signupLink: 'Sign Up',
            back_btn: 'Back'
        },
        mr: {
            welcomeText: 'शिल्लक रक्कम तपासा!',
            mobilePlaceholder: 'मोबाइल नंबर',
            pinInp: 'पिन',
            keepLoggedInLabel: 'लॉगिन राहू द्या',
            noAccountText: 'खाते नाही?',
            signupLink: 'साइन अप करा',
            back_btn: 'मागे जा!'
        }
    };

    const lang = isMarathi ? 'mr' : 'en';
    const trans = translations[lang];

    document.getElementById('languageLabel').innerText = isMarathi ? 'मराठी' : 'English';
    document.getElementById('welcomeText').innerText = trans.welcomeText;
    document.getElementById('mobileInp').placeholder = trans.mobilePlaceholder;
    document.getElementById('pinInp').placeholder = trans.pinInp;
    document.getElementById('keepLoggedInLabel').innerText = trans.keepLoggedInLabel;
    document.getElementById('noAccountText').innerText = trans.noAccountText;
    document.getElementById('signupLink').innerText = trans.signupLink;
    document.getElementById('back_btn').innerText = trans.back_btn;
});
