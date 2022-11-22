var loginPage = "admin-login.html";

// Use this function if error is driven by a page load
function ShowErrorModalOnLoad(message, errorCode) {
    elem('btnFailedModal').classList.add('show');
    elem('btnFailedModal').style.display = "block";
    elem('failedMessage').innerHTML = message;
    elem("btnCloseFailedAlert").onclick = () => {
        if (errorCode == 401) {
            location.href = loginPage;
        } else {
            elem('btnFailedModal').classList.remove('show');
            elem('btnFailedModal').style.display = "none";
        }
    };

}

// Use this function if error is driven by a button click
function ShowErrorModal(dataToggle, errorMessage, errorCode) {
    var triggerAlert = elem("failedMessage");
    var toggle = elem(dataToggle);
    toggle.dataset.toggle = "modal";
    toggle.dataset.target = "#btnFailedModal";
    triggerAlert.innerHTML = errorMessage;
    elem("btnCloseFailedAlert").onclick = () => {
        if (errorCode == 401) {
            location.href = loginPage;
        } else {
            elem('btnCloseConfimrTwo').click();
        }
    };
}

// Use this function on Success Modal pop up
function ShowSuccessModal(dataToggle, successMessage) {
    var triggerAlert = elem("successMessage");
    var toggle = elem(dataToggle);
    toggle.dataset.toggle = "modal";
    toggle.dataset.target = "#btnSuccessEntryModal";

    triggerAlert.innerHTML = successMessage;
}