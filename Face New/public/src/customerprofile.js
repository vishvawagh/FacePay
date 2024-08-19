// Reseting the browser storage value
let proceedFromHomeButtonOnly = false;
sessionStorage.setItem('proceedFromHomeButtonOnly', proceedFromHomeButtonOnly);

let faceVerified = false;
sessionStorage.setItem('faceVerified', faceVerified);

let payFromFacePageOnly = false;
sessionStorage.setItem('payFromFacePageOnly', payFromFacePageOnly);

// Helper functions for html
const clickSaveBtn = () => {
    window.location.href = './home.html';
};

const clickLogoImg = () => {
    window.location.href = '../home.html';
};

document.getElementById('logo').addEventListener('click', clickLogoImg);
document.getElementById('save-btn').addEventListener('click', clickSaveBtn);

// Logout button functionality
const clickLogoutBtn = () => {
    // Clear user data from storage
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    // Redirect to home.html
    window.location.href = './home.html';
};

document.getElementById('logout-btn').addEventListener('click', clickLogoutBtn);

// Existing code for profile page functionality...

const imgContainer = document.querySelector('.photo-container');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

// If user hover on imgContainer 
imgContainer.addEventListener('mouseenter', function() {
    uploadBtn.style.display = "block";
});

// If we hover out from imgContainer
imgContainer.addEventListener('mouseleave', function() {
    uploadBtn.style.display = "none";
});

let currentUser = null;
let keepLoggedIn = localStorage.getItem("keepLoggedIn");

// Fetching data from localStorage to show on profile
function getUserName() {
    if (keepLoggedIn == "yes") {
        currentUser = JSON.parse(localStorage.getItem('user'));
    } else {
        currentUser = JSON.parse(sessionStorage.getItem('user'));
    }
}

getUserName();

if (currentUser) {
    let name = currentUser.fullname;
    let email = currentUser.aadhaar;
    // let username = currentUser.username;
    let phone = currentUser.phone;
    let payid ="Rs." + currentUser.balance;  //balance
    
    document.getElementById('name').innerText = name;
    document.getElementById('email').innerText = email;
    // document.getElementById('username').innerText = username;
    document.getElementById('phone').innerText = phone;
    document.getElementById('payid').innerText = payid;
}

else {
    swal("Login First!", "To view profile, Please Log In!\n\nPressing 'OK' will redirect you to log in.", "warning").then(function(reply) {
        if (reply) window.location.href = "./login.html"
        else window.location.href = "../index.html"
    })
}

// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyC_xmkI67ZokC5S3bs_I4Wn1ZHL9qbsy6E",
//     authDomain: "facepay-b93d2.firebaseapp.com",
//     databaseURL: "https://facepay-b93d2-default-rtdb.firebaseio.com",
//     projectId: "facepay-b93d2",
//     storageBucket: "facepay-b93d2.appspot.com",
//     messagingSenderId: "894989632635",
//     appId: "1:894989632635:web:a14b1f884f00e60bd20ede",
//     measurementId: "G-GPV0QHPX2T"
// };
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

// Storage Database
import { getStorage, ref as storeRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";

// Realtime Database
import { getDatabase, ref, get, child, set, update } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const realdb = getDatabase();

// Selection of img from pc
let chosenImageToUpload = null;

file.addEventListener('change', function() {
    const imageChosen = this.files[0];
    chosenImageToUpload = imageChosen;
    if (imageChosen) {
        const reader = new FileReader(); // FileReader is a predefined function of JS
        reader.addEventListener('load', function() {
            img.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(imageChosen);
        uploadProcess();
    }
});

// // Uploading Files (Image) to Firebase Storage Database
// let emailString = currentUser.email;
// emailString = emailString.replaceAll('.', '');
// emailString = emailString.replaceAll('#', '');
// emailString = emailString.replaceAll('$', '');
// emailString = emailString.replaceAll('[', '');
// emailString = emailString.replaceAll(']', '');

let URL = currentUser.profileImgURL;

const uploadProcess = async () => {
    const storage = getStorage();
    const storageRef = storeRef(storage, "Profile Images" + emailString);
    const uploadTask = uploadBytesResumable(storageRef, chosenImageToUpload);
    const uploadMessage = document.getElementById('upload-text');
    
    uploadTask.on('state-changed', (snapshot) => {
        const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes).toFixed(4) * 100;
        uploadMessage.classList.replace('hide', 'unhide');
        uploadMessage.innerHTML = "* * Uploading " + uploadProgress + "% * *";
        document.getElementById('save-btn').classList.replace('unhide', 'hide');
    }, (error) => {
        swal("Error!", "Upload was unsuccessful, Please try again later.", "error");
        document.getElementById('save-btn').classList.replace('hide', 'unhide');
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            URL = downloadURL;
            updateProfileImgURL(URL);
        });
    });
};

const updateProfileImgURL = (URL) => {
    update(ref(realdb, "Customers/" + emailString), {
        profileImgURL: URL,
    }).then(() => {
        swal("Success!", "Upload was successful.\nPress 'OK' to continue.", "success");
        document.getElementById('save-btn').classList.replace('hide', 'unhide');
        uploadMessage.classList.replace('unhide', 'hide');
    }).catch((error) => {
        swal("Error!", "Update was unsuccessful, Please try again later.", "error");
        document.getElementById('save-btn').classList.replace('hide', 'unhide');
    });
};

if (currentUser.profileImgURL == "NA") {
    img.src = "../images/profileM.jpg";
} else {
    img.src = currentUser.profileImgURL;
}
