
// document.addEventListener("DOMContentLoaded", function() {
//   const customersignupElement = document.getElementById("customersignup");
//   const loginElement = document.getElementById("login");
// loginElement.addEventListener("click", () => {
  //     // console.log("Navigating to login.html");
  //     window.location.href = "./checkbalance.html";
  //   });
  //   customersignupElement.addEventListener("click", () => {
//     window.location.href = "/src/customer-signup.html";
//   });

//   const profileElement = document.getElementById("profile");

//   const homeNextBtn = document.getElementById("home-next-btn");

//   const walletSwitch = document.getElementById("wallet-switch");
//   const bankSwitch = document.getElementById("bank-switch");

//   const walletTransferContainer = document.getElementById("wallet-transfer-container");
//   const bankTransferContainer = document.getElementById("bank-transfer-container");

//   signupElement.addEventListener("click", () => {
//     window.location.href = "./history.html";
//   });

//  

//   profileElement.addEventListener("click", () => {
//     window.location.href = "/src/profile.html";
//   });



//   // homeNextBtn.addEventListener("click", () => {
//   //   const selectedTransferType = walletTransferContainer.classList.contains("unhide") ? "wallet" : "bank";
//   //   console.log("Selected Transfer Type:", selectedTransferType);
//   // });

//   document.getElementById("home-next-btn").addEventListener("click", () => {
//     const selectedTransferType = walletTransferContainer.classList.contains("unhide") ? "wallet" : "bank";
//     console.log("Selected Transfer Type:", selectedTransferType);
    
//     // Redirect to smile-verification.html
//     window.location.href = "/src/smile-verification.html";
// });


//   walletSwitch.addEventListener("click", () => {
//     walletTransferContainer.classList.remove("hide");
//     walletTransferContainer.classList.add("unhide");
//     bankTransferContainer.classList.remove("unhide");
//     bankTransferContainer.classList.add("hide");
//   });

//   bankSwitch.addEventListener("click", () => {
//     bankTransferContainer.classList.remove("hide");
//     bankTransferContainer.classList.add("unhide");
//     walletTransferContainer.classList.remove("unhide");
//     walletTransferContainer.classList.add("hide");
//   });

//   function clickLogoImg() {
//     window.location.href = "/src/home.html";
//   }

//   window.clickLogoImg = clickLogoImg;
// });

/////////////////////////2 codeeeee ///// working amount deductioon

// // Firebase configuration
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
// import { getDatabase, ref, get, child, update } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

// // Updated Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBvah3Csk8LeBwAboyUDk9s1JllRFb5nqE",
//     authDomain: "facepay-5d2e9.firebaseapp.com",
//     databaseURL: "https://facepay-5d2e9-default-rtdb.firebaseio.com",
//     projectId: "facepay-5d2e9",
//     storageBucket: "facepay-5d2e9.appspot.com",
//     messagingSenderId: "765952634620",
//     appId: "1:765952634620:web:01ae22721833bce7633179",
//     measurementId: "G-K46HXB8DXN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase();

// // References
// const mobileInput = document.getElementById('mobileInp'); // Mobile number input field ID
// const amountInput = document.getElementById('money'); // Amount input field ID
//   const profileElement = document.getElementById("profile");
//   const customersignupElement = document.getElementById("customersignup");
//   const loginElement = document.getElementById("login");
//   const transaction_history = document.getElementById("historyLink");



// const pinInput = document.getElementById('pinInp'); // PIN input field ID
// const submitFace = document.getElementById('submitBtn'); // Face login button ID
// const submitPIN = document.getElementById('submitPIN'); // PIN login button ID

// // Validation function
// function isEmptyOrSpaces(str) {
//     return str == null || str.match(/^ *$/) != null;
// }

// function Validation() {
//     if (isEmptyOrSpaces(mobileInput.value)) {
//         swal("", "You cannot leave any field empty!", "warning");
//         return false;
//     }
//     return true; 
// }

// // Authentication process for Face Login
// function AuthenticateFaceUser() {
//     if (!Validation()) return;

//     const dbref = ref(db);
//     let mobileString = mobileInput.value;
    
//     console.log("Fetching data for mobile number:", mobileString);
    
//     get(child(dbref, "Customers/" + mobileString))
//         .then((user) => {
//             if (user.exists()) {
//                 console.log("User data:", user.val());
//                 login(user.val());
//             } else {
//                 console.log("No user found at path:", "Customers/" + mobileString);
//                 swal("User does not exist!", "To get started, please create an account!", "warning");
//             }
//         })
//         .catch((error) => {
//             console.error("Error fetching user data:", error);
//             swal("Error", "An error occurred while fetching user data. Please try again later.", "error");
//         });
// }

// // Authentication process for PIN Login
// function AuthenticatePIN() {
//     if (!Validation()) return;

//     const dbref = ref(db);
//     let mobileString = mobileInput.value; // Mobile number

//     get(child(dbref, "Customers/" + mobileString)).then((user) => {
//         if (user.exists()) {
//             verifyPIN(user.val());
//         } else {
//             swal("User does not exist!", "To get started, please create an account!", "warning");
//         }
//     }).catch(error => {
//         console.error("Error fetching user data:", error);
//         swal("Error", "An error occurred while fetching user data. Please try again later.", "error");
//     });
// }

// // Verify PIN
// function verifyPIN(user) {
//     let enteredPIN = pinInput.value;
//     let correctPIN = user.phone.substring(0, 4); // Assuming user.phone is stored in the format with at least 4 digits

//     if (enteredPIN === correctPIN) {
//         let keepLoggedIn = document.getElementById('customSwitch1').checked;

//         if (!keepLoggedIn) {
//             sessionStorage.setItem('user', JSON.stringify(user));
//         } else {
//             localStorage.setItem('keepLoggedIn', 'yes');
//             localStorage.setItem('user', JSON.stringify(user));
//         }
        
//         processTransaction(user); // Call the transaction processing after PIN verification
//     } else {
//         swal("Incorrect PIN!", "The PIN you entered is incorrect. Please try again.", "warning");
//     }
// }

// // Login function for face authentication
// function login(user) {
//     let keepLoggedIn = document.getElementById('customSwitch1').checked;
    
//     if (!keepLoggedIn) {
//         sessionStorage.setItem('user', JSON.stringify(user));
//     } else {
//         localStorage.setItem('keepLoggedIn', 'yes');
//         localStorage.setItem('user', JSON.stringify(user));
//     }
//     window.location.replace("/src/smile-verification.html"); // Redirect to face verification page
// }

// // Process the transaction after successful face verification
// // Process the transaction after successful face verification
// function processTransaction(user) {
//     console.log("Processing transaction for user:", user);
//     console.log("Current balance before transaction (user):", user.balance);

//     let amount = parseFloat(amountInput.value);
//     let currentBalance = parseFloat(user.balance);

//     console.log("Amount to deduct:", amount);
//     console.log("Parsed current balance:", currentBalance);

//     if (amount <= 0) {
//         swal("Invalid Amount", "The amount must be greater than zero.", "warning");
//         return;
//     }

//     if (amount > currentBalance) {
//         swal("Insufficient Balance", "You do not have enough balance to complete this transaction.", "error");
//         return;
//     }

//     // Deduct the amount from the current balance
//     currentBalance -= amount;
//     console.log("New balance after deduction:", currentBalance);

//     // Retrieve shopkeeper data
//     const shopkeeper = JSON.parse(sessionStorage.getItem('shopkeeper')) || JSON.parse(localStorage.getItem('shopkeeper'));

//     if (!shopkeeper) {
//         swal("Error", "Shopkeeper data not found. Please try again.", "error");
//         return;
//     }

//     console.log("Processing transaction for shopkeeper:", shopkeeper);
//     let shopkeeperBalance = parseFloat(shopkeeper.balance);

//     // Add the amount to the shopkeeper's balance
//     shopkeeperBalance += amount;
//     console.log("New shopkeeper balance after addition:", shopkeeperBalance);

//     // Prepare the updates for Firebase
//     const userRef = ref(db, "Customers/" + user.phone); // User path
//     const shopkeeperRef = ref(db, "UsersList/" + shopkeeper.phone); // Shopkeeper path

//     // Update user and shopkeeper balances
//     const updateUserPromise = update(userRef, { balance: currentBalance });
//     const updateShopkeeperPromise = update(shopkeeperRef, { balance: shopkeeperBalance });

//     // Execute both updates
//     Promise.all([updateUserPromise, updateShopkeeperPromise])
//         .then(() => {
//             console.log("Balances updated successfully in Firebase.");
//             swal({
//                 title: "Transaction Successful",
//                 text: `The amount has been deducted from your balance and added to the shopkeeper's balance. Your new balance is Rs. ${shopkeeperBalance}. `,
//                 icon: "success",
//                 timer: 3000, // Display for 3 seconds
//                 buttons: false, // No buttons, auto-close after timer
//             }).then(() => {
//                 setTimeout(() => {
//                     window.location.href = "/src/home.html"; // Redirect after 5 seconds
//                 }, 200); // 5 seconds delay before redirect
//             });
//         })
//         .catch((error) => {
//             console.error("Error updating balances:", error);
//             swal("Transaction Failed", "An error occurred while processing the transaction.", "error");
//         });
// }

// profileElement.addEventListener("click", () => {
//       window.location.href = "/src/profile.html";
//     });


// transaction_history.addEventListener("click", () => {
//        window.location.href = "./history/history.html";
//     });

// loginElement.addEventListener("click", () => {
//       // console.log("Navigating to login.html");
//       window.location.href = "./checkbalance.html";
//     });
// customersignupElement.addEventListener("click", () => {
//     window.location.href = "/src/customer-signup.html";
//   });


// // Assign the events
// submitFace.addEventListener('click', AuthenticateFaceUser);
// submitPIN.addEventListener('click', AuthenticatePIN);





///////////////////////////////////// code 333 // trying history feature


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, get, child, update } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
const amountInput = document.getElementById('money'); // Amount input field ID
  const profileElement = document.getElementById("profile");
  const customersignupElement = document.getElementById("customersignup");
  const loginElement = document.getElementById("login");
  const transaction_history = document.getElementById("historyLink");



const pinInput = document.getElementById('pinInp'); // PIN input field ID
const submitFace = document.getElementById('submitBtn'); // Face login button ID
const submitPIN = document.getElementById('submitPIN'); // PIN login button ID

    // Wait 5 seconds, then fade out and remove the floating message
    setTimeout(function() {
        const messageElement = document.querySelector('.floating-message');
        messageElement.style.transition = 'opacity 1s ease-in-out';
        messageElement.style.opacity = '0';
        
        setTimeout(function() {
            messageElement.remove();
        }, 1000); // Remove the element after the fade-out transition
    }, 5000); // 5000ms delay before starting the fade-out


// Validation function
function isEmptyOrSpaces(str) {
    return str == null || str.match(/^ *$/) != null;
}

function Validation() {
    if (isEmptyOrSpaces(mobileInput.value)) {
        swal("", "You cannot leave any field empty!/कोणत्याही चौकटीस रिकामं सोडू नका!", "warning");
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
            swal("Error", "An error occurred while fetching user data. Please try again later.", "error");
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
            swal("User does not exist!", "To get started, please create an account!/ वापरकर्ता अस्तित्वात नाही! सुरूवात करण्यासाठी कृपया एक खाते तयार करा!", "warning");
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
        
        processTransaction(user); // Call the transaction processing after PIN verification
    } else {
        swal("Incorrect PIN!", "The PIN you entered is incorrect./ अयोग्य पिन आपण दिलेल्या पिन चुकीचा आहे.", "warning");
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
    window.location.replace("/src/smile-verification.html"); // Redirect to face verification page
}


// Process the transaction after successful face verification


function processTransaction(user) {
    console.log("Processing transaction for user:", user);
    console.log("Current balance before transaction (user):", user.balance);

    let amount = parseFloat(amountInput.value);
    let currentBalance = parseFloat(user.balance);

    if (amount <= 0) {
        swal("Invalid Amount", "The amount must be greater than zero. / अवैध रक्कम! रक्कम शून्य पेक्षा जास्त असावी", "warning");
        return;
    }

    if (amount > currentBalance) {
        swal("Insufficient Balance", "Your balance is insufficient. / तुमचा शिल्लक कमी आहे.", "error");
        return;
    }

    // Deduct the amount from the current balance
    currentBalance -= amount;

    // Retrieve shopkeeper data
    const shopkeeper = JSON.parse(sessionStorage.getItem('shopkeeper')) || JSON.parse(localStorage.getItem('shopkeeper'));

    if (!shopkeeper) {
        swal("Error", "Shopkeeper data not found. / त्रुटी: दुकानदाराचे डेटा सापडले नाही.", "error");
        return;
    }

    let shopkeeperBalance = parseFloat(shopkeeper.balance);

    // Add the amount to the shopkeeper's balance
    shopkeeperBalance += amount;

    // Prepare the updates for Firebase
    const userRef = ref(db, `Customers/${user.phone}`); // User path
    const shopkeeperRef = ref(db, `UsersList/${shopkeeper.phone}`); // Shopkeeper path

    // Update user and shopkeeper balances
    const updateUserPromise = update(userRef, { balance: currentBalance });
    const updateShopkeeperPromise = update(shopkeeperRef, { balance: shopkeeperBalance });

    // Prepare the transaction data
    const transactionData = {
        Name: user.fullname,
        mobile: user.phone,
        amount: amount,
        timestamp: Date.now()
    };

    // Create transaction folder under shopkeeper's phone number
    const transactionRef = ref(db, `Transaction/${shopkeeper.phone}/${user.phone}/${transactionData.timestamp}`);

    // Execute both updates and store the transaction data
    Promise.all([updateUserPromise, updateShopkeeperPromise, update(transactionRef, transactionData)])
        .then(() => {
            console.log("Balances and transaction updated successfully in Firebase.");

            // Update the shopkeeper data in session/local storage
            shopkeeper.balance = shopkeeperBalance;
            sessionStorage.setItem('shopkeeper', JSON.stringify(shopkeeper));
            localStorage.setItem('shopkeeper', JSON.stringify(shopkeeper));

            swal({
                title: "Transaction Successful / लेन-देन यशस्वी",
                text: `Your new balance is / तुमचा नवीन शिल्लक Rs. ${currentBalance}.`,
                icon: "success",
                timer: 3000, // Display for 3 seconds
                buttons: false, // No buttons, auto-close after timer
            }).then(() => {
                setTimeout(() => {
                    window.location.href = "/src/home.html"; // Redirect after 5 seconds
                }, 200); // 200ms delay before redirect
            });
        })
        .catch((error) => {
            console.error("Error updating balances and transaction:", error);
            swal("Transaction Failed! / लेन-देन अयशस्वी!", "Error updating balances. / शिल्लक अपडेट करताना त्रुटी.", "error");
        });
}



profileElement.addEventListener("click", () => {
      window.location.href = "/src/profile.html";
    });


transaction_history.addEventListener("click", () => {
       window.location.href = "./history/history.html";
    });

loginElement.addEventListener("click", () => {
      // console.log("Navigating to login.html");
      window.location.href = "./checkbalance.html";
    });
customersignupElement.addEventListener("click", () => {
    window.location.href = "/src/customer-signup.html";
  });


// Assign the events
submitFace.addEventListener('click', AuthenticateFaceUser);
submitPIN.addEventListener('click', AuthenticatePIN);


