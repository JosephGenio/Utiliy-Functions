function elem(element) {
    return document.getElementById(element);
}


// DATE

function IsEmpty(elementId) {
    var input = elem(elementId).value;
    var isEmpty = false;
    if (input == "") {
        isEmpty = true;
    }
    return isEmpty;
}


function IsValidEmail(inputText) {
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isValid = false;
    if (inputText.match(mailformat)) {
        isValid = true;
    }
    return isValid;
}


function cleanAmount(amount) {
    return amount = amount.replace(/,/g, '');
}

var hardCodedMessages = {
    amount:"Invalid Input.Please check and try again",
    email:"Invalid Email. Please check and try again",
    number: "Invalid Input. Please check and try again",
    msgInteger :"Invalid Input. Please check and try again"
}


function CheckValidForm(classNameReference, errorAlertDiv, oErrorMessage) {
    var forElements = document.getElementsByClassName(classNameReference);
    var customErrorMessage;
    console.log(oErrorMessage)
    if(oErrorMessage!= undefined){
        customErrorMessage = {oErrorMessage};
        var {amount, email,msgInteger,number} = customErrorMessage.oErrorMessage;
    }else{
        var {amount, email,msgInteger,number} = hardCodedMessages;
    }

    var errorMessage = elem("errroMessage");
    var forAmountChecking = [];
    var forIntChecking = [];
    var forNumberChecking = [];
    var forEmailChecking = [];
    var forDateChecking = [];

    var intValidInputCounter = 0;
    var validAmountCounter = 0;
    var validIntCounter = 0;
    var validNumberCounter = 0;
    var validEmailCounter = 0;

    var failedAmounts = [];
    var failedEmails = [];
    var failedInts = [];
    var failedNumbers = [];
    var failedEmptyInputs = [];

    var masterFlag = 0;
    for (var i = 0; i < forElements.length; i++) {
        if (IsEmpty(`${forElements[i].getAttribute('id')}`)) {
            failedEmptyInputs.push(forElements[i]);
        } else {
            forElements[i].classList.remove('is-invalid');
            if (forElements[i].classList.contains("fc-amount")) {
                forAmountChecking.push(forElements[i]);
            }
            if (forElements[i].classList.contains("fc-int")) {
                forIntChecking.push(forElements[i]);
            }
            if (forElements[i].classList.contains("fc-number")) {
                forNumberChecking.push(forElements[i]);
            }
            if (forElements[i].classList.contains("fc-email")) {
                forEmailChecking.push(forElements[i]);
            }
            if (forElements[i].classList.contains("fc-date")) {
                forDateChecking.push(forElements[i]);
            }
            intValidInputCounter++;
        }
    }
    // AMOUNT CHECKING
    for (var i = 0; i < forAmountChecking.length; i++) {
        var cleanedAmount = cleanAmount(forAmountChecking[i].value);
        if (!isNaN(cleanedAmount)) {
            if (forAmountChecking[i].getAttribute("fc-mode") == 'positive-only') {
                if (!cleanedAmount.toString().includes("-")) {
                    validAmountCounter++;
                    forAmountChecking[i].classList.remove('is-invalid');
                } else {
                    failedAmounts.push(forAmountChecking[i]);
                }
            } else {
                validAmountCounter++;
            }


        } else {
            failedAmounts.push(forAmountChecking[i]);
        }
    }

    // INT CHEKING
    for (var i = 0; i < forIntChecking.length; i++) {
        var cleanInteger = cleanAmount(forIntChecking[i].value);
        console.log(cleanInteger)
        if (!isNaN(cleanInteger)) {
            if (!cleanInteger.includes(".")) {
                if (!cleanInteger.includes("-")) {
                    forIntChecking[i].classList.remove('is-invalid');
                    validIntCounter++;
                } else {
                    failedInts.push(forIntChecking[i]);
                }
            } else {
                failedInts.push(forIntChecking[i]);
            }
        } else {
            failedInts.push(forIntChecking[i]);
        }
    }

    // NUMBER CHECKING
    for (var i = 0; i < forNumberChecking.length; i++) {
        if (!isNaN(forNumberChecking[i].value)) {
            if (!forNumberChecking[i].value.includes(".")) {
                forNumberChecking[i].classList.remove('is-invalid');
                validNumberCounter++;
            } else {
                failedNumbers.push(forNumberChecking[i]);
            }

        } else {
            failedNumbers.push(forNumberChecking[i]);
        }
    }

    // EMAIL CHECKING
    for (var i = 0; i < forEmailChecking.length; i++) {
        if (IsValidEmail(forEmailChecking[i].value)) {
            forEmailChecking[i].classList.remove('is-invalid');
            validEmailCounter++;
        } else {
            failedEmails.push(forEmailChecking[i]);
        }
    }
    // DATE CHECKING
    var now = new Date();
    var currentDate = now.toISOString().split('T')[0];
    for (var i = 0; i < forDateChecking.length; i++) {

        if (forDateChecking[i].getAttribute("fc-mode") == 'future-only') {
            if (forDateChecking[i].value >= currentDate) {
                forDateChecking[i].classList.remove('is-invalid');
            } else {
                forDateChecking[i].classList.add('is-invalid');
            }

            console.log("Future")
        } else if (forDateChecking[i].getAttribute("fc-mode") == 'past-only') {
            if (forDateChecking[i].value <= currentDate) {
                forDateChecking[i].classList.remove('is-invalid');
            } else {
                forDateChecking[i].classList.add('is-invalid');
            }
        }
    }

    //COUNT VALID PARAMETERS

    if (validAmountCounter == forAmountChecking.length) {
        elem(errorAlertDiv).classList.remove('show');
        masterFlag++;
    } else {
        for (var i = 0; i < failedAmounts.length; i++) {
            failedAmounts[i].classList.add('is-invalid');
        }
        elem(errorAlertDiv).classList.add('show');
        errorMessage.innerText = amount;
        return false;
    }

    if (validIntCounter == forIntChecking.length) {
        elem(errorAlertDiv).classList.remove('show');
        masterFlag++;
    } else {
        for (var i = 0; i < failedInts.length; i++) {
            failedInts[i].classList.add('is-invalid');
        }
        elem(errorAlertDiv).classList.add('show');
        errorMessage.innerText =msgInteger;
        return false;
    }
    if (validNumberCounter == forNumberChecking.length) {
        elem(errorAlertDiv).classList.remove('show');
        masterFlag++;
    } else {
        for (var i = 0; i < failedNumbers.length; i++) {
            failedNumbers[i].classList.add('is-invalid');
        }
        elem(errorAlertDiv).classList.add('show');
        errorMessage.innerText =number;
        return false;
    }
    if (validEmailCounter == forEmailChecking.length) {
        elem(errorAlertDiv).classList.remove('show');
        masterFlag++;
    } else {
        for (var i = 0; i < failedEmails.length; i++) {
            failedEmails[i].classList.add('is-invalid');
        }
        elem(errorAlertDiv).classList.add('show');
        errorMessage.innerText = email;
        return false;
    }
    if (intValidInputCounter == forElements.length) {
        elem(errorAlertDiv).classList.remove('show');
        masterFlag++;
    } else {
        for (var i = 0; i < failedEmptyInputs.length; i++) {
            failedEmptyInputs[i].classList.add('is-invalid');
        }
        elem(errorAlertDiv).classList.add('show');
        errorMessage.innerText = "There are required fields empty. Please check and try again";
        return false;
    }

    if (masterFlag == 5) {
        elem(errorAlertDiv).classList.remove('show');
        return true;
    } else {
        elem(errorAlertDiv).classList.add('show');
        return false;
    }

}