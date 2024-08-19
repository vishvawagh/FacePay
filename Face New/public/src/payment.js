// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, update, get, child } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
const amountInput = document.getElementById('money'); // Amount input field ID
const transactionButton = document.getElementById('submitPIN'); // Transaction button ID

// Validation function
function isEmptyOrSpaces(str) {
    return str == null || str.match(/^ *$/) != null;
}

// Process the transaction for the current user
function processTransactionForCurrentUser() {
    if (isEmptyOrSpaces(amountInput.value)) {
        swal("", "You cannot leave the amount field empty!/कोणत्याही चौकटीस रिकामं सोडू नका!", "warning");
        return;
    }

    let currentUser = JSON.parse(sessionStorage.getItem('user')) || JSON.parse(localStorage.getItem('user'));
    let currentShopkeeper = JSON.parse(sessionStorage.getItem('shopkeeper')) || JSON.parse(localStorage.getItem('shopkeeper'));

    if (!currentUser || !currentShopkeeper) {
        swal("Error", "User or shopkeeper not logged in. Please log in to proceed.", "error");
        return;
    }

    // Debugging logs
    console.log("Current user:", currentUser);
    console.log("Current shopkeeper:", currentShopkeeper);

    processTransaction(currentUser, currentShopkeeper);
}

// Process the transaction after successful face verification
function processTransaction(user, shopkeeper) {
    console.log("Processing transaction for user:", user);
    console.log("Processing transaction for shopkeeper:", shopkeeper);
    console.log("Current balance before transaction (user):", user.balance);
    console.log("Current balance before transaction (shopkeeper):", shopkeeper.balance);

    let amount = parseFloat(amountInput.value);
    let userBalance = parseFloat(user.balance);
    let shopkeeperBalance = parseFloat(shopkeeper.balance);

    console.log("Amount to deduct:", amount);
    console.log("Parsed user balance:", userBalance);
    console.log("Parsed shopkeeper balance:", shopkeeperBalance);

    if (amount <= 0) {
        swal("Invalid Amount", "The amount must be greater than zero./अवैध रक्कम! रक्कम शून्य पेक्षा जास्त असावी", "warning");
        return;
    }

    if (amount > userBalance) {
        swal("Insufficient Balance / असुविधाजनक शिल्लक", "error");
        return;
    }

    // Deduct the amount from the user balance
    userBalance -= amount;
    // Add the amount to the shopkeeper balance
    shopkeeperBalance += amount;

    console.log("New user balance after deduction:", userBalance);
    console.log("New shopkeeper balance after addition:", shopkeeperBalance);

    // Prepare the updates for Firebase
    const userRef = ref(db, "Customers/" + user.phone); // User path
    const shopkeeperRef = ref(db, "UsersList/" + shopkeeper.phone); // Shopkeeper path

    // Update user and shopkeeper balances
    const updateUserPromise = update(userRef, { balance: userBalance });
    const updateShopkeeperPromise = update(shopkeeperRef, { balance: shopkeeperBalance });

    const transactionData = {
        mobile: user.phone,
        amount: amount,
        timestamp: Date.now()
    };

    const transactionRef = ref(db, `Transaction/${shopkeeper.phone}/${user.phone}/${transactionData.timestamp}`);

    // Execute both updates and store the transaction data
    Promise.all([updateUserPromise, updateShopkeeperPromise, update(transactionRef, transactionData)])
        .then(() => {
            console.log("Balances updated successfully in Firebase.");

                        // Update the shopkeeper data in session/local storage
shopkeeper.balance = shopkeeperBalance;
sessionStorage.setItem('shopkeeper', JSON.stringify(shopkeeper));
localStorage.setItem('shopkeeper', JSON.stringify(shopkeeper));

            swal({
                title: "Transaction Successful / लेन-देन यशस्वी",
                text: ` shopkeeper's your new balance is / तुमचा नवीन शिल्लक  Rs. ${userBalance}.`,
                icon: "success",
                timer: 3000, // Display for 3 seconds
                buttons: false, // No buttons, auto-close after timer
            }).then(() => {
                setTimeout(() => {
                    window.location.href = "/src/home.html"; // Redirect after 5 seconds
                }, 200); // 5 seconds delay before redirect
            });
        })
        .catch((error) => {
            console.error("Error updating balances:", error);
            swal("Transaction Failed/ लेन-देन अयशस्वी!", "error");
        });
}

// Assign the event to the transaction button
transactionButton.addEventListener('click', processTransactionForCurrentUser);
