


// // Voice Interaction Button Functionality
// document.getElementById('voice-interaction-btn').addEventListener('click', () => {
//     const synth = window.speechSynthesis;
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     let currentStep = 0;

//     const prompts = {
//         en: [
//             "Please say your mobile number.",
//             "Please say your PIN."
//         ],
//         mr: [
//             "कृपया आपला मोबाइल नंबर सांगा.",
//             "कृपया आपला पिन सांगा."
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
//             // Set the mobile number input value
//             document.getElementById('mobileInp').value = userResponse;
//             // Automatically invoke the next step after a 2-second delay
//             setTimeout(() => {
//                 document.getElementById('submitBtn').click(); // Simulate the Face Login Button click
//             }, 2000);
//         } else if (currentStep === 1) {
//             // Set the PIN input value
//             document.getElementById('pinInp').value = userResponse;
//             // Automatically invoke the PIN login button click
//             setTimeout(() => {
//                 document.getElementById('submitPIN').click(); // Simulate the PIN Login Button click
//             }, 2000);
//         }

//         currentStep++;
//         if (currentStep < prompts[langSwitch].length) {
//             askQuestion();
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
//         const errorMsg = langSwitch === 'mr' ? "समझा नाही, कृपया पुन्हा सांगा." : "I didn't get that, please repeat.";
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
//             welcomeText: 'Pay using smile!',
//             mobilePlaceholder: 'Mobile Number',
//             pinInp: 'PIN',
//             keepLoggedInLabel: 'Keep me Logged In',
//             noAccountText: 'Don\'t have an account?',
//             customersignup: 'Customer-Sign Up',
//             login: 'Customer-Sign Up'
//         },
//         mr: {
//             welcomeText: 'स्मित वापरुन पैसे द्या !',
//             mobilePlaceholder: 'मोबाइल नंबर',
//             pinInp: 'पिन',
//             keepLoggedInLabel: 'लॉगिन राहू द्या',
//             noAccountText: 'खाते नाही?',
//             customersignup: 'ग्राहक नोंदणी'
//         }
//     };

//     const lang = isMarathi ? 'mr' : 'en';
//     const trans = translations[lang];

//     document.getElementById('languageLabel').innerText = isMarathi ? 'Marathi' : 'English';
//     document.getElementById('welcomeText').innerText = trans.welcomeText;
//     document.getElementById('mobileInp').placeholder = trans.mobilePlaceholder;
//     document.getElementById('pinInp').placeholder = trans.pinInp;
//     document.getElementById('keepLoggedInLabel').innerText = trans.keepLoggedInLabel;
//     document.getElementById('noAccountText').innerText = trans.noAccountText;
//     document.getElementById('customersignup').innerText = trans.customersignup;
//     document.getElementById('login').innerText = trans.login;
// });



// // Voice Interaction Button Functionality
// document.getElementById('voice-interaction-btn').addEventListener('click', () => {
//     const synth = window.speechSynthesis;
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     let currentStep = 0;

//     const prompts = {
//         en: [
//             "Please say your mobile number.",
//         ],
//         mr: [
//             "Krupaya apla mobile numbar saanga.",
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
//             // Set the mobile number input value
//             document.getElementById('mobileInp').value = userResponse;
//             // Automatically invoke the next step after a 2-second delay
//             setTimeout(() => {
//                 document.getElementById('submitBtn').click(); // Simulate the Face Login Button click
//             }, 2000);
//         } else if (currentStep === 1) {
//             // Set the PIN input value
//             document.getElementById('pinInp').value = userResponse;
//             // Automatically invoke the PIN login button click
//             setTimeout(() => {
//                 document.getElementById('submitPIN').click(); // Simulate the PIN Login Button click
//             }, 2000);
//         }

//         currentStep++;
//         if (currentStep < prompts[langSwitch].length) {
//             askQuestion();
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
//         const errorMsg = langSwitch === 'mr' ? "Samjhal nahi, krupayaa punha saangaa." : "I didn't get that, please repeat.";
//         const utterance = new SpeechSynthesisUtterance(errorMsg);
//         utterance.voice = getVoice(langSwitch);
//         utterance.lang = langSwitch === 'mr' ? 'mr-IN' : 'en-US';
//         synth.speak(utterance);
//         setTimeout(() => recognition.start(), 500); // Give enough time for user to respond
//     };

//     askQuestion();
// });


// Voice Interaction Button Functionality
document.getElementById('voice-interaction-btn').addEventListener('click', () => {
    const synth = window.speechSynthesis;
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    let currentStep = 0;

    const prompts = {
        en: [
            "Please say your mobile number.",
            // "Please say your PIN."
        ],
        mr: [
            "कृपया आपला मोबाइल नंबर सांगा.",
            // "कृपया आपला पिन सांगा."
        ]
    };

    const langSwitch = document.getElementById('languageSwitch').checked ? 'mr' : 'en';

    const getVoice = (lang) => {
        const voices = synth.getVoices();
        return voices.find(voice => voice.lang === (lang === 'mr' ? 'mr-IN' : 'en-US'));
    };

    const handleStep = (event) => {
        let userResponse = event.results[0][0].transcript;
        console.log(userResponse);
    
        if (currentStep === 0) {
            // Remove all non-digit characters (including spaces) from the recognized mobile number
            userResponse = userResponse.replace(/\D+/g, '');
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
        const errorMsg = langSwitch === 'mr' ? "समझाल नाही, कृपया पुन्हा सांगा." : "I didn't get that, please repeat.";
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
            welcomeText0: 'Welcome to FacePay!',
            welcomeText1: 'Forgot PIN, Password? Do Not Worry!',
            welcomeText2: 'Just smile and pay using face authentication. Yes! it\'s that simple.',
            welcomeText: 'Pay using smile!',
            welcomeText22: 'If not? Pay using PIN!',
            mobilePlaceholder: 'Customer - Mobile Number',
            pinInp: 'PIN',
            keepLoggedInLabel: 'Keep me Logged In',
            customersignup: 'Customer-Sign Up',
            historyLink: 'Transaction-History',
            login: 'Check Balance',
            profileAlt: 'Profile',
            money: 'Amount',
        },
        mr: {
            welcomeText0: 'फेसपे मध्ये आपले स्वागत आहे!',
            welcomeText1: 'पिन, पासवर्ड विसरलात? काळजी करू नका!',
            welcomeText2: 'फक्त हसा आणि चेहरा प्रमाणीकरण वापरून पैसे द्या. होय! ते खूप सोपे आहे.',
            welcomeText: 'स्मित वापरुन पैसे द्या!',
            welcomeText22: 'जर नाही? पिन वापरून पैसे द्या!',
            mobilePlaceholder: 'ग्राहक - मोबाइल नंबर',
            pinInp: 'पिन',
            keepLoggedInLabel: 'लॉगिन राहू द्या',
            customersignup: 'ग्राहक नोंदणी',
            historyLink: 'व्यवहार इतिहास',
            login: 'शिल्लक तपासा',
            profileAlt: 'प्रोफाइल',
            money: 'रक्कम ',
        }
    };
    
   

    const lang = isMarathi ? 'mr' : 'en';
    const trans = translations[lang];

    document.getElementById('languageLabel').innerText = isMarathi ? 'मराठी' : 'English';
    document.querySelector('.welcome-text0').innerText = trans.welcomeText0;
    document.querySelector('.welcome-text').innerText = trans.welcomeText1;
    document.querySelector('.welcome-text:nth-of-type(3)').innerText = trans.welcomeText2;
    document.getElementById('welcomeText').innerText = trans.welcomeText;
    document.getElementById('mobileInp').placeholder = trans.mobilePlaceholder;
    document.getElementById('pinInp').placeholder = trans.pinInp;
    document.getElementById('keepLoggedInLabel').innerText = trans.keepLoggedInLabel;
    document.getElementById('customersignup').innerText = trans.customersignup;
    document.getElementById('historyLink').innerText = trans.historyLink;
    document.getElementById('login').innerText = trans.login;
    document.getElementById('money').innerText = trans.money;
    document.getElementById('profileLogo').alt = trans.profileAlt;
});
