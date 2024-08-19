// Initialize Speech Recognition and Speech Synthesis
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;
let isListening = false;
let currentFieldId = "";
let currentPromptText = "";
let responseTimeout;

// Function to speak text
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

// Function to convert numbers to digit-by-digit format
function formatNumber(text) {
    return text.split('').map(char => {
        if (char.match(/[0-9]/)) return char;
        return ''; // Remove any non-numeric characters
    }).join(' ');
}

// Function to listen for speech input with timeout and retry mechanism
function listen(callback) {
    if (isListening) return;
    isListening = true;
    recognition.start();
    responseTimeout = setTimeout(() => {
        recognition.stop();
        isListening = false;
        speak("I didn't get that, please repeat.");
        setTimeout(() => askForInput(currentFieldId, currentPromptText, callback), 5000); // Retry after 5 seconds
    }, 15000); // Timeout after 15 seconds of no response

    recognition.onresult = (event) => {
        clearTimeout(responseTimeout);
        isListening = false;
        const transcript = event.results[0][0].transcript.trim();
        if (transcript) {
            callback(transcript);
        } else {
            speak("I didn't catch that, please try again.");
            setTimeout(() => askForInput(currentFieldId, currentPromptText, callback), 5000); // Retry after 5 seconds
        }
    };

    recognition.onerror = (event) => {
        clearTimeout(responseTimeout);
        isListening = false;
        console.error(event.error);
        speak("An error occurred, please try again.");
        setTimeout(() => askForInput(currentFieldId, currentPromptText, callback), 5000); // Retry after 5 seconds
    };

    recognition.onend = () => {
        isListening = false;
    };
}

// Function to ask for input
function askForInput(fieldId, promptText, callback) {
    currentFieldId = fieldId;
    currentPromptText = promptText;
    speak(promptText);
    setTimeout(() => listen((transcript) => {
        if (transcript) {
            const formattedResponse = fieldId === 'wallet-mobile-number' || fieldId === 'wallet-amount' ? formatNumber(transcript) : transcript;
            document.getElementById(fieldId).value = formattedResponse;
            speak(`You said ${formattedResponse}`);
            setTimeout(callback, 3000); // Wait 3 seconds before moving to the next input
        } else {
            speak("I didn't catch that, please try again.");
            setTimeout(() => askForInput(fieldId, currentPromptText, callback), 5000); // Retry after 5 seconds
        }
    }), 3000); // Give a 3-second gap for the user to start speaking
}

// Add event listener to the voice interaction button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('voice-interaction-btn').addEventListener('click', () => {
        askForInput('wallet-mobile-number', 'Please say the mobile number', () => {
            askForInput('wallet-facepay-id', 'Please say the FacePay ID', () => {
                askForInput('wallet-amount', 'Please say the amount', () => {
                    speak("Thank you! All inputs are recorded.");
                });
            });
        });
    });
});
