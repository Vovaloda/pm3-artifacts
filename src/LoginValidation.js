function Validation(values) {

    let error = {}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;


    if(values.email === ""){
        error.email = "Email should not be empty";
    }     
    else if(!email_pattern.test(values.email)){
        error.email = "Email Didn't match. The string does not have the format of an email address, which consists of a sequence of one or more characters that do not contain spaces, followed by the character '@', followed by another sequence of one or more characters that do not contain spaces, followed by the character '.' and ends with another sequence of one or more characters that do not contain spaces.";
    }    
    else {
        error.email = "";
    }
    if(values.password === ""){
        error.password = "Password should not be empty"
    }     
    else if(!password_pattern.test(values.password)){
        error.password = "Password didn't match. The string does not contain at least one digit, one lowercase letter and one uppercase letter, and is at least 8 characters long and does not contain any special characters or spaces."
    }
    else{
        error.password = ""
    }    

    return error;
}

export default Validation;