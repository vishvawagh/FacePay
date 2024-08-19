
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getStorage, ref as storeRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";


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
const storage = getStorage();

// DOM Elements
const nameInput = document.getElementById('nameInp');
const emailInput = document.getElementById('emailInp'); // Keeping emailInput as is, but using it for Aadhaar
const phoneInput = document.getElementById('phoneInp');
const fileInput = document.getElementById('profileImgInp');
const submitButton = document.getElementById('sub_btn');

// Helper Functions
const isEmptyOrSpaces = str => str == null || str.match(/^ *$/) != null;

const Validation = () => {
    const nameregex = /^[a-zA-Z\s]+$/;
    const aadhaarregex = /^\d{12}$/; // Aadhaar number should be 12 digits
    const phoneregex = /^(\+\d{1,3}[- ]?)?[0]?\d{10}$/;

    if (isEmptyOrSpaces(nameInput.value) || isEmptyOrSpaces(emailInput.value) || isEmptyOrSpaces(phoneInput.value)) {
        swal("", "You cannot leave any field empty!/कोणत्याही चौकटीस रिकामं सोडू नका!", "warning");
        return false;
    }

    if (!nameregex.test(nameInput.value)) {
        swal("", "The name should only contain alphabets!/नावात फक्त अक्षरेच असावीत!", "warning");
        return false;
    }

    if (!aadhaarregex.test(emailInput.value)) {
        swal("", "Enter a valid Aadhaar number!/वैध आधार क्रमांक प्रविष्ट करा!", "warning");
        return false;
    }

    if (!phoneregex.test(phoneInput.value)) {
        swal("", "Enter a valid phone number!/वैध फोन नंबर प्रविष्ट करा!", "warning");
        return false;
    }

    return true;
};

const uploadImage = async () => {
    if (!fileInput.files[0]) {
        return null;
    }

    const chosenImageToUpload = fileInput.files[0];
    const storageRef = storeRef(storage, `ProfileImages/${emailInput.value}`);
    const uploadTask = uploadBytesResumable(storageRef, chosenImageToUpload);

    return new Promise((resolve, reject) => {
        uploadTask.on('state-changed', 
            null,
            error => reject(error),
            () => getDownloadURL(uploadTask.snapshot.ref).then(resolve)
        );
    });
};

const RegisterCustomer = async () => {
    if (!Validation()) {
        return;
    }

    try {
        const dbRef = ref(db);

        const customerSnapshot = await get(child(dbRef, `UsersList/${phoneInput.value}`));
        if (customerSnapshot.exists()) {
            swal("", "Account already exists!/खाते आधीच अस्तित्वात आहे!", "warning");
        } else {
            const imgURL = await uploadImage();

            await set(ref(db, `UsersList/${phoneInput.value}`), {
                fullname: nameInput.value,
                aadhaar: emailInput.value, // Saving Aadhaar number in place of email
                phone: phoneInput.value,
                profileImgURL: imgURL || "null",  // Save image URL or "null" if no image
                balance: 1000  // Default balance
            });

            swal("Shopkeeper added successfully!", "Log In at next step./दुकानदार यशस्वीरित्या जोडला गेला! पुढच्या टप्प्यात लॉगिन करा.", "success").then(() => {
                window.location.replace("../index.html");
            });
        }
    } catch (error) {
        swal("Error!", "An error occurred during registration. / क्षमस्व .. ", "error");
    }
};

submitButton.addEventListener('click', RegisterCustomer);
document.getElementById("back_btn").addEventListener("click", function() {
    window.location.href = '../index.html';
});
