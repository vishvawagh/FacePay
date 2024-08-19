// profilelanguage.js

// Language Switch Functionality
document.getElementById('languageSwitch').addEventListener('change', () => {
    const isMarathi = document.getElementById('languageSwitch').checked;
    const translations = {
        en: {
            uploadText: 'Upload Status',
            name: 'Name',
            email: 'Aadhaar No',
            username: 'Username',
            mobile: 'Mobile',
            balance: 'Balance',
            saveBtn: 'Save',
            logoutBtn: 'Logout'
        },
        mr: {
            uploadText: 'अपलोड स्थिती',
            name: 'नाव',
            email: 'आधार क्रमांक',
            username: 'वापरकर्तानाव',
            mobile: 'मोबाइल',
            balance: 'बॅलन्स',
            saveBtn: 'जतन करा',
            logoutBtn: 'लॉगआउट'
        }
    };

    const lang = isMarathi ? 'mr' : 'en';
    const trans = translations[lang];

    // Update text fields
    document.getElementById('upload-text').innerText = trans.uploadText;
    
    // Update profile details labels
    document.querySelector('#profile-details .profile-text-title:nth-child(1)').firstChild.nodeValue = `${trans.name}: `;
    document.querySelector('#profile-details .profile-text-title:nth-child(2)').firstChild.nodeValue = `${trans.email}: `;
    document.querySelector('#profile-details .profile-text-title:nth-child(3)').firstChild.nodeValue = `${trans.username}: `;
    document.querySelector('#profile-details .profile-text-title:nth-child(4)').firstChild.nodeValue = `${trans.mobile}: `;
    document.querySelector('#profile-details .profile-text-title:nth-child(5)').firstChild.nodeValue = `${trans.balance}: `;

    // Update buttons
    document.getElementById('save-btn').innerText = trans.saveBtn;
    document.getElementById('logout-btn').innerText = trans.logoutBtn;

    // Update language label
    document.getElementById('languageLabel').innerText = isMarathi ? 'मराठी' : 'English';
});
