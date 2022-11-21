var oErrorMessages = {
    "amount":"custom error amount",
    "email":"custom email error",
    "number": "custom number error",
    "msgInteger" :"msgItegerError"
}

// var strErrorMessage = JSON.stringify(oErrorMessages);

elem("submit").onclick = ()=>{
    var test = CheckValidForm("sign-up-form","errorDiv",oErrorMessages);
    console.log(test)
}
elem("clearForm").onclick = ()=>{
    ClearForm("sign-up-form","errorDiv");
}