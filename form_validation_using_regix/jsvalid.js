function validation(){
    let username=document.getElementById("username").value;
    let password=document.getElementById("password").value;
    let confirmPassword=document.getElementById("confirm_password").value;
    let email=document.getElementById("email").value;
    let phone=document.getElementById("phone").value;

    let usercheck=/^[A-za-z ]{3,30}$/;
    // (?=.*) means atleat one element mentioned 
    let passwordCheck=/^(?=.*[0-9])(?=.*[!@#$^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    let emailCheck=/^[A-Za-z_0-9]{3,}@[A-za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    let mobileCheck=/^[789][0-9]{9}$/;

    if(usercheck.test(username)){
        document.getElementById("usererror").innerHTML="";
    }else{
        document.getElementById("usererror").innerHTML="** Username is invalid";
        return false;
    }
    if(passwordCheck.test(password)){
        document.getElementById("passworderror").innerHTML="";
    }else{
        document.getElementById("passworderror").innerHTML="** password is invalid";
        return false;
    }
    if(password.match(confirmPassword)){
        document.getElementById("confirmpassworderror").innerHTML="";
    }else{
        document.getElementById("confirmpassworderror").innerHTML="** password is not matching";
        return false;
    }

    if(emailCheck.test(email)){
        document.getElementById("emailerror").innerHTML="";
    }else{
        document.getElementById("emailerror").innerHTML="** email is invalid";
        return false;
    }
    if(mobileCheck.test(phone)){
        document.getElementById("phoneerror").innerHTML="";
    }else{
        document.getElementById("phoneerror").innerHTML="** phone number is invalid";
        return false;
    }

}