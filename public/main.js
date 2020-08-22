function gifLoader() {
    // this method loads the portfolio gifs in the background and when the gifs are finished loading replaces the placeholder images with the gifs
    // Note: the method assumes the placeholder image and the GIf are name the same just the extension is different
    var imgTags = document.querySelectorAll('.project-img-gif');

    imgTags.forEach((el, ) => {

        var imgSource = el.getAttribute('src');
        imgSource = imgSource.replace(/\.[^/.]+$/, ".gif"); // removes placeholder extension and replaces it with 'gif' extension

        var newImg = new Image();

        newImg.addEventListener('load', () => {
            el.src = newImg.src
        })
        newImg.src = imgSource;
    })
}
// todo: call gifLoader();


// #region Dom-Elements
const navbarOverlay = document.querySelector('.nav-screen-overlay');
const navbarLst = document.querySelector('.nav-list');
const formSubmitBtn = document.querySelector('#form-submit');
const formErrorLabel = document.querySelector('#form-error-label');
const nameInput = document.querySelector('#name-input');
const numberInput = document.querySelector('#number-input');
const emailInput = document.querySelector('#email-input');
const messageInput = document.querySelector('#message-input');
const loader = document.querySelector('.loader-container');
const formFieldset = document.querySelector('.contact-form fieldset');
// #endregion

// #region Site-Global-Variables
let navMenuOpen = false;
// #endregion

// #region Event-Listeners
document.querySelector('.nav-drawer-btn').addEventListener('click', navMenuToggler, false);
document.querySelector('.nav-screen-overlay').addEventListener('click', navMenuToggler, false);
document.querySelectorAll('.nav-link').forEach((el) => {
    el.addEventListener('click', navMenuToggler, false)
})
formSubmitBtn.addEventListener('click', e => {
    e.preventDefault();
    if (validateForm()) submitMessage();
})
// #endregion

// #region functions
function navMenuToggler() {

    if (navMenuOpen) {
        navbarOverlay.classList.add('hidden');
        navbarLst.classList.add('nav-list-hidden');
        navMenuOpen = false;
    } else if (!navMenuOpen) {
        navbarOverlay.classList.remove('hidden');
        navbarLst.classList.remove('nav-list-hidden');
        navMenuOpen = true;
    }
}
function validateForm() {
    let hasNoErrors = true;

    // Name Validation
    if (nameInput.value === '') {
        nameInput.style.borderColor = 'rgb(240, 171, 168)';
        formErrorLabel.style.display = 'block';
        hasNoErrors = false;
    } else {
        nameInput.style.borderColor = 'initial';
    }

    // Email Validation
    if (emailInput.value === '') {
        emailInput.style.borderColor = 'rgb(240, 171, 168)';
        formErrorLabel.style.display = 'block';
        hasNoErrors = false;
    } else {
        emailInput.style.borderColor = 'initial';
    }
    
    // Message Validation
    if (messageInput.value === '') {
        messageInput.style.borderColor = 'rgb(240, 171, 168)';
        formErrorLabel.style.display = 'block';
        hasNoErrors = false;
    } else {
        messageInput.style.borderColor = 'initial';
    }

    return hasNoErrors;
}
function submitMessage(params) {
    toggleLoader();
    loaderLog('Submitting Message');

    let db = firebase.firestore();

    db.collection("emails").add({
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        })
        .then(function (docRef) {
            loaderLog('Message Sent');
            document.querySelector('.contact-form').reset();
            toggleLoader();
            alert('Message Sent.')
        })
        .catch(function (error) {
            toggleLoader();
            alert("Could Not Send Message. Try Again.");
        });
}
function toggleLoader() {
    if (loader.style.display === 'block') {
        loader.style.display = 'none';
        formFieldset.style.display = 'block';
    } else {
        loader.style.display = 'block';
        formFieldset.style.display = 'none';
    }
}
function loaderLog(message) {
    document.querySelector('.loader-log').innerHTML = message;
}
// #endregion