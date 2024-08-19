// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

// Firebase Configuration
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
const db = getDatabase(app);





// // Reference to the transaction history container
// const userListContainer = document.getElementById('user-list');

// function fetchTransactionHistory() {
//     const userRef = ref(db, "Transaction/");
//     get(userRef)
//         .then((snapshot) => {
//             if (snapshot.exists()) {
//                 const transactions = snapshot.val();
//                 displayTransactions(transactions);
//             } else {
//                 userListContainer.innerHTML = "<p>No transactions found.</p>";
//             }
//         })
//         .catch((error) => {
//             console.error("Error fetching transaction history:", error);
//             userListContainer.innerHTML = "<p>Error fetching transaction history.</p>";
//         });
// }

// function displayTransactions(transactions) {
//     let content = '';
//     for (const user in transactions) {
//         for (const timestamp in transactions[user]) {
//             const transaction = transactions[user][timestamp];
//             content += `
//                 <div class="transaction-item">
//                     <p><strong>Mobile:</strong> ${transaction.mobile}</p>
//                     <p><strong>Amount:</strong> Rs. ${transaction.amount}</p>
//                     <p><strong>Date:</strong> ${new Date(transaction.timestamp).toLocaleString()}</p>
//                 </div>
//                 <hr/>
//             `;
//         }
//     }
//     userListContainer.innerHTML = content;
// }

// // Fetch and display the transaction history when the page loads
// fetchTransactionHistory();

// document.getElementById("back_btn").addEventListener("click", function() {
//     window.location.href = '/src/home.html';
// });



const userListContainer = document.getElementById('user-list');

// Retrieve shopkeeper's phone number from session storage
const shopkeeperPhone = JSON.parse(sessionStorage.getItem('shopkeeper'))?.phone;

function fetchTransactionHistory() {
    if (!shopkeeperPhone) {
        userListContainer.innerHTML = "<p>Error: Shopkeeper data not found.</p>";
        return;
    }

    const transactionsRef = ref(db, `Transaction/${shopkeeperPhone}/`);
    get(transactionsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const transactions = snapshot.val();
                displayTransactions(transactions);
            } else {
                userListContainer.innerHTML = "<p>No transactions found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error fetching transaction history:", error);
            userListContainer.innerHTML = "<p>Error fetching transaction history.</p>";
        });
}

function displayTransactions(transactions) {
    let content = '';
    let totalAmount = 0;
    for (const customerPhone in transactions) {
        for (const timestamp in transactions[customerPhone]) {
            const transaction = transactions[customerPhone][timestamp];
            totalAmount += transaction.amount;
            content += `
                <div class="transaction-item">
                    <p><strong>Name/नाव :</strong> ${transaction.Name}</p>
                    <p><strong>From Mobile/सदर मोबाईल खात्यातून :</strong> ${transaction.mobile}</p>
                    <p><strong>Amount/रक्कम :</strong> Rs. ${transaction.amount}</p>
                    <p><strong>Date/तारीख :</strong> ${new Date(transaction.timestamp).toLocaleString()}</p>
                </div>
                <hr/>
            `;
        }
    }
    content += `
    <div class="total-amount">
        <p><strong>Total Amount Received:</strong> Rs. ${totalAmount}</p>
    </div>
`;

    userListContainer.innerHTML = content;
}

// Fetch and display the transaction history when the page loads
fetchTransactionHistory();

document.getElementById("back_btn").addEventListener("click", function() {
    window.location.href = '/src/home.html';
});
