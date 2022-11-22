



// var oErrorMessages = {
//     "amount":"custom error amount",
//     "email":"custom email error",
//     "number": "custom number error",
//     "msgInteger" :"msgItegerError"
// }

data={
    code : 200,
    message:"Successfully added",
    data: []
}

window.onload = ()=>{
    if(data.code == 200){
        //display data here

    }else{
        ShowErrorModalOnLoad(data.message, data.code);
    }
   
}

// var strErrorMessage = JSON.stringify(oErrorMessages);

elem("submit").onclick = ()=>{
    // var test = CheckValidForm("sign-up-form","errorDiv",oErrorMessages);
   
    if(data.code == 200){
        ShowSuccessModal("submit", data.message);
    }else{
        ShowErrorModal("submit", data.message, data.code);
    }
// elem("clearForm").onclick = ()=>{
//     ClearForm("sign-up-form","errorDiv");
}