// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

// Updated Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvah3Csk8LeBwAboyUDk9s1JllRFb5nqE",
    authDomain: "facepay-5d2e9.firebaseapp.com",
    databaseURL: "https://facepay-5d2e9-default-rtdb.firebaseio.com",
    projectId: "facepay-5d2e9",
    storageBucket: "facepay-5d2e9.appspot.com",
    messagingSenderId: "765952634620",
    appId: "1:765952634620:web:01ae22721833bce7633179",
    measurementId: "G-K46HXB8DXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// References
const mobileInput = document.getElementById('mobileInp'); // Mobile number input field ID
const pinInput = document.getElementById('pinInp'); // PIN input field ID
const submitFace = document.getElementById('submitBtn'); // Face login button ID
const submitPIN = document.getElementById('submitPIN'); // PIN login button ID

// Validation function
function isEmptyOrSpaces(str) {
    return str == null || str.match(/^ *$/) != null;
}

function Validation() {
    if (isEmptyOrSpaces(mobileInput.value)) {
        swal("", "You cannot leave any field empty! /कोणत्याही चौकटीस रिकामं सोडू नका!", "warning");
        return false;
    }
    return true; 
}

// Authentication process for Face Login
function AuthenticateFaceUser() {
    if (!Validation()) return;

    const dbref = ref(db);
    let mobileString = mobileInput.value;
    
    console.log("Fetching data for mobile number:", mobileString);
    
    get(child(dbref, "Customers/" + mobileString))
        .then((user) => {
            if (user.exists()) {
                console.log("User data:", user.val());
                login(user.val());
            } else {
                console.log("No user found at path:", "Customers/" + mobileString);
                swal("User does not exist!", "To get started, please create an account!/ वापरकर्ता अस्तित्वात नाही! सुरूवात करण्यासाठी कृपया एक खाते तयार करा!", "warning");
            }
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
            swal("Error", "An error occurred while fetching user data./ क्षमस्व !!", "error");
        });
    
}

// Authentication process for PIN Login
function AuthenticatePIN() {
    if (!Validation()) return;

    const dbref = ref(db);
    let mobileString = mobileInput.value; // Mobile number

    get(child(dbref, "Customers/" + mobileString)).then((user) => {
        if (user.exists()) {
            verifyPIN(user.val());
        } else {
            swal("User does not exist!", "To get started, please create an account! / वापरकर्ता अस्तित्वात नाही! सुरूवात करण्यासाठी कृपया एक खाते तयार करा!", "warning");
        }
    }).catch(error => {
        console.error("Error fetching user data:", error);
        swal("Error", "An error occurred while fetching user data. Please try again later.", "error");
    });
}

// Verify PIN
function verifyPIN(user) {
    let enteredPIN = pinInput.value;
    let correctPIN = user.phone.substring(0, 4); // Assuming user.phone is stored in the format with at least 4 digits

    if (enteredPIN === correctPIN) {
        let keepLoggedIn = document.getElementById('customSwitch1').checked;

        if (!keepLoggedIn) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.setItem('keepLoggedIn', 'yes');
            localStorage.setItem('user', JSON.stringify(user));
        }
        
        window.location.replace("/src/customerprofile.html"); // Redirect to home page
    } else {
        swal("Incorrect PIN!", "The PIN you entered is incorrect./ अयोग्य पिन!! आपण दिलेल्या पिन चुकीचा आहे.", "warning");
    }
}

// Login function for face authentication
function login(user) {
    let keepLoggedIn = document.getElementById('customSwitch1').checked;
    
    if (!keepLoggedIn) {
        sessionStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.setItem('keepLoggedIn', 'yes');
        localStorage.setItem('user', JSON.stringify(user));
    }
    window.location.replace("/src/balance-face-verification.html"); // Redirect to face verification page
}

document.getElementById("back_btn").addEventListener("click", function() {
    window.location.href = '/src/home.html';
});

// Assign the events
submitFace.addEventListener('click', AuthenticateFaceUser);
submitPIN.addEventListener('click', AuthenticatePIN);
