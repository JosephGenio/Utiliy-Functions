function elem(element) {
    return document.getElementById(element);
}


//EMAIL
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
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var isValid = false;
    if (inputText.value.match(mailformat)) {
        isValid = true;
    }
    return isValid;
}


function cleanAmount(amount) {
    return amount = amount.replace(/,/g, '');
}


function CheckValidForm(classNameReference) {
    var forElements = document.getElementsByClassName(classNameReference);
    var forAmountChecking = [];
    var forIntChecking = [];
    var forNumberChecking = [];
    var forEmailChecking = [];
    var intValidInputCounter = 0;
    var validAmountCounter = 0;
    var validIntCounter = 0;
    for (var i = 0; i < forElements.length; i++) {
        if (IsEmpty(`${forElements[i].getAttribute('id')}`)) {
            forElements[i].classList.add('is-invalid');
        } else {
            forElements[i].classList.remove('is-invalid');
            if (forElements[i].classList.contains("fc-amount")) {
                forAmountChecking.push(forElements[i]);
            }
            if (forElements[i].classList.contains("fc-int")) {
                forIntChecking.push(forElements[i]);
            }
            if(forElements[i].classList.contains("fc-number")){
                forNumberChecking.push(forElements[i]);
            }
            if (forElements[i].classList.contains("fc-email")){
                forEmailChecking.push(forElements[i]);
            }
            intValidInputCounter++;
        }
    }
    // AMOUNT CHECKING
    for (var i = 0; i < forAmountChecking.length; i++) {
        console.log(forAmountChecking[i].getAttribute("fc-mode"));
        var cleanedAmount = cleanAmount(forAmountChecking[i].value);
        if (!isNaN(cleanedAmount)) {
            if(forAmountChecking[i].getAttribute("fc-mode") == 'positive-only'){
                if(cleanAmount.includes("-")){
                    forAmountChecking[i].classList.add('is-invalid');
                }
            }
            
            forAmountChecking[i].classList.remove('is-invalid');
            validAmountCounter++;
        } else {
            forAmountChecking[i].classList.add('is-invalid');
            console.log("INVALID");
        }
    }

    // INT CHEKING
    for (var i = 0; i < forIntChecking.length; i++) {
        var cleanInteger = cleanAmount(forIntChecking[i].value);
        console.log(cleanInteger)
        if (!isNaN(cleanInteger)) {
           if(!cleanInteger.includes(".")){
            forIntChecking[i].classList.remove('is-invalid');
            validIntCounter ++;
           }else{
            forIntChecking[i].classList.add('is-invalid');
           }
        }else{
            forIntChecking[i].classList.add('is-invalid');
        }
    }

    // NUMBER CHECKING
    for (var i = 0; i < forNumberChecking.length; i++) {
        if(!isNaN(forNumberChecking[i].value)){
            if(!forNumberChecking[i].value.includes(".")){
                forNumberChecking[i].classList.remove('is-invalid');
            }else{
                forNumberChecking[i].classList.add('is-invalid');
            }
           
        }else{
            forNumberChecking[i].classList.add('is-invalid');
        }
    }

    // EMAIL CHECKING
    for (var i = 0; i < forEmailChecking.length; i++) {
        if(IsValidEmail(forEmailChecking[i].value)){
            console.log("VALID")
        }else{
            console.log("INVALID")
        }
    }

    if (intValidInputCounter == forElements.length) {
        // GetDomElement(errorAlertDiv).classList.add('d-none');
        return true;
    } else {
        // GetDomElement(errorAlertDiv).classList.remove('d-none');
        return false;
    }
}