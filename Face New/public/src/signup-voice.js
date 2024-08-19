// // signup-voice.js
// // Voice Interaction Button Functionality for Signup

// document.getElementById('voice-interaction-btn').addEventListener('click', () => {
//     const synth = window.speechSynthesis;
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     let currentStep = 0;

//     const prompts = {
//         en: [
//             "Please say your full name.",
//             "Please say your email address.",
//             "Please say your username.",
//             "Please say your phone number."
//         ],
//         mr: [
//             "Krupaya Tumcha Purna Nav Saanga.",
//             "Krupaya Tumcha Email Saanga.",
//             "Krupaya Tumcha Username Saanga.",
//             "Krupaya Tumcha Phone Number Saanga."
//         ]
//     };

//     const langSwitch = document.getElementById('languageSwitch').checked ? 'mr' : 'en';

//     const getVoice = (lang) => {
//         const voices = synth.getVoices();
//         return voices.find(voice => voice.lang === (lang === 'mr' ? 'mr-IN' : 'en-US'));
//     };

//     const handleStep = (event) => {
//         const userResponse = event.results[0][0].transcript;
//         console.log(userResponse);
//         if (currentStep === 0) {
//             document.getElementById('nameInp').value = userResponse;
//         } else if (currentStep === 1) {
//             document.getElementById('emailInp').value = userResponse;
//         } else if (currentStep === 2) {
//             document.getElementById('userInp').value = userResponse;
//         } else if (currentStep === 3) {
//             document.getElementById('phoneInp').value = userResponse;
//         }

//         currentStep++;
//         if (currentStep < prompts[langSwitch].length) {
//             askQuestion();
//         } else {
//             // Automatically invoke the register button after the final step
//             setTimeout(() => {
//                 document.getElementById('sub_btn').click();
//             }, 2000);
//         }
//     };

//     const askQuestion = () => {
//         if (currentStep < prompts[langSwitch].length) {
//             const utterance = new SpeechSynthesisUtterance(prompts[langSwitch][currentStep]);
//             utterance.voice = getVoice(langSwitch);
//             utterance.lang = langSwitch === 'mr' ? 'mr-IN' : 'en-US';
//             utterance.onend = () => {
//                 setTimeout(() => recognition.start(), 500); // Give enough time for user to respond
//             };
//             synth.speak(utterance);
//         }
//     };

//     recognition.onresult = handleStep;
//     recognition.onspeechend = () => recognition.stop();
//     recognition.onerror = (event) => {
//         console.log('Error occurred in recognition: ' + event.error);
//         const errorMsg = langSwitch === 'mr' ? "Samajala nahi parat sanga." : "I didn't get that, please repeat.";
//         const utterance = new SpeechSynthesisUtterance(errorMsg);
//         utterance.voice = getVoice(langSwitch);
//         utterance.lang = langSwitch === 'mr' ? 'mr-IN' : 'en-US';
//         synth.speak(utterance);
//         setTimeout(() => recognition.start(), 500); // Give enough time for user to respond
//     };

//     askQuestion();
// });

// // Language Switch Functionality
// document.getElementById('languageSwitch').addEventListener('change', () => {
//     const isMarathi = document.getElementById('languageSwitch').checked;
//     const translations = {
//         en: {
//             welcomeText: 'Welcome to FacePay!',
//             namePlaceholder: 'Full Name',
//             emailPlaceholder: 'Email',
//             usernamePlaceholder: 'Username',
//             phonePlaceholder: 'Phone Number',
//             signupLink: 'Log In'
//         },
//         mr: {
//             welcomeText: 'FacePay मध्ये आपले स्वागत आहे!',
//             namePlaceholder: 'पूर्ण नाव',
//             emailPlaceholder: 'ईमेल',
//             usernamePlaceholder: 'वापरकर्तानाव',
//             phonePlaceholder: 'फोन नंबर',
//             signupLink: 'लॉग इन करा'
//         }
//     };

//     const lang = isMarathi ? 'mr' : 'en';
//     const trans = translations[lang];

//     document.getElementById('welcomeText').innerText = trans.welcomeText;
//     document.getElementById('nameInp').placeholder = trans.namePlaceholder;
//     document.getElementById('emailInp').placeholder = trans.emailPlaceholder;
//     document.getElementById('userInp').placeholder = trans.usernamePlaceholder;
//     document.getElementById('phoneInp').placeholder = trans.phonePlaceholder;
//     document.getElementById('signupLink').innerText = trans.signupLink;
// });


// Voice Interaction Button Functionality for Signup

document.getElementById('voice-interaction-btn').addEventListener('click', () => {
    const synth = window.speechSynthesis;
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    let currentStep = 0;

    const prompts = {
        en: [
            "Please say your full name.",
            "Please say your email address.",
            "Please say your aadhaar number.",
            "Please say your phone number."
        ],
        mr: [
            "Krupaya Tumcha Purna Naav Saanga.",
            "Krupaya Tumcha Email Saanga.",
            "Krupaya Tumcha aadhaar kramaank Saanga.",
            "Krupaya Tumcha Phone Number Saanga."
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
            document.getElementById('nameInp').value = userResponse;
        } else if (currentStep === 1) {
            document.getElementById('emailInp').value = userResponse;
        } else if (currentStep === 2) {
            document.getElementById('userInp').value = userResponse;
        } else if (currentStep === 3) {
            document.getElementById('phoneInp').value = userResponse;
        }

        currentStep++;
        if (currentStep < prompts[langSwitch].length) {
            askQuestion();
        } else {
            // Automatically invoke the register button after the final step
            setTimeout(() => {
                document.getElementById('sub_btn').click();
            }, 2000);
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
        const errorMsg = langSwitch === 'mr' ? "Samajala nahi parat sanga." : "I didn't get that, please repeat.";
        const utterance = new SpeechSynthesisUtterance(errorMsg);
        utterance.voice = getVoice(langSwitch);
        utterance.lang = langSwitch === 'mr' ? 'mr-IN' : 'en-US';
        synth.speak(utterance);
        setTimeout(() => recognition.start(), 500); // Give enough time for user to respond
    };

    askQuestion();
});

// Language Switch Functionality
const updateLanguage = () => {
    const isMarathi = document.getElementById('languageSwitch').checked;
    console.log('Language switch state:', isMarathi); // Debugging statement

    const translations = {
        en: {
            welcomeText: 'Welcome to FacePay!',
            namePlaceholder: 'Full Name',
            emailPlaceholder: 'Aadhaar No',
            phonePlaceholder: 'Phone Number',
            signupLink: 'Log In',
            sub_btn: 'Register',
            back_btn: 'Back',
            p: 'Already have an account!',
            languageLabel: 'English'
        },
        mr: {
            welcomeText: 'फेस-पे मध्ये आपले स्वागत आहे!',
            namePlaceholder: 'पूर्ण नाव',
            emailPlaceholder: 'आधार क्रमांक',
            phonePlaceholder: 'फोन नंबर',
            signupLink: 'लॉग इन करा',
            sub_btn: 'नोंद करा',
            back_btn: 'मागे जा ',
            p: 'आधीच खाते आहे!',
            languageLabel: 'मराठी'
        }
    };

    const lang = isMarathi ? 'mr' : 'en';
    const trans = translations[lang];

    document.getElementById('welcomeText').innerText = trans.welcomeText;
    document.getElementById('nameInp').placeholder = trans.namePlaceholder;
    document.getElementById('emailInp').placeholder = trans.emailPlaceholder;
    document.getElementById('phoneInp').placeholder = trans.phonePlaceholder;
    document.getElementById('signupLink').innerText = trans.signupLink;
    document.getElementById('sub_btn').innerText = trans.sub_btn;
    document.getElementById('back_btn').innerText = trans.back_btn;
    document.getElementById('p').innerText = trans.p;
    document.getElementById('languageLabel').innerText = trans.languageLabel;
};

// Initialize with the correct language
document.addEventListener('DOMContentLoaded', updateLanguage);

// Listen for language switch changes
document.getElementById('languageSwitch').addEventListener('change', updateLanguage);
document.getElementById('languageLabel').innerText = isMarathi ? 'मराठी' : 'English';
