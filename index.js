const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

const form = document.querySelector("#form");

form.addEventListener("submit", function(e){
    e.preventDefault();

    let isUserNameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmedPasswordValid = checkConfirmedPassword();

    let isFormValid = isUserNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmedPasswordValid;

        if (isFormValid){

        }
});

const isRequired = input => input === "" ? false : true;
const isBetween = (lenght, min, max) => lenght < min || lenght > max ? false : true;

const isEmailCorrect = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordCorrect = (password) => {
    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(password);
};

const showError = (input, errorMessage) =>{
    const formField = input.parentElement;

    formField.classList.remove("success");
    formField.classList.add("error");

    const error = formField.querySelector(".errorMsg");
    error.innerHTML = errorMessage;

    formField.querySelector(".failure-icon").style.opacity = "1";
    formField.querySelector(".success-icon").style.opacity = "0";
}

const showSuccess = (input) =>{
    const formField = input.parentElement;

    formField.classList.remove("error");
    formField.classList.add("success");

    const error = formField.querySelector(".errorMsg");
    error.innerHTML = '';

    formField.querySelector(".failure-icon").style.opacity = "0";
    formField.querySelector(".success-icon").style.opacity = "1";
}

const checkUsername = () => {
    let valid = false;

    const min = 3;
    const max = 25;

    const username = userName.value.trim();

    if(!isRequired(username)){
        showError(userName, "Username can not be blank");
    }else if(!isBetween(username.length, min, max)){
         showError(userName, `Username should be between ${min} and ${max} symbols`); 
    }else{
        showSuccess(userName);
        valid = true;
    }
    return valid;
};


const checkEmail = () =>{
    let valid = false;
    const emailValue = email.value.trim();

    if (!isRequired(emailValue)){
        showError(email, "Email can not be blank");
    } else if (!isEmailCorrect(emailValue)){
        showError(email, "Email is not valid");
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false; 
    const passwordValue = password.value.trim();

    if (!isRequired(passwordValue)){
        showError(password, "Password can not be blank");
    } else if (!isPasswordCorrect(passwordValue)){
        showError(password, "Password is not correct");
    } else {
        showSuccess(password);
        valid = true;
    }
    return valid;
}

const checkConfirmedPassword = () => {
    let valid = false;
    const confirmedPasswordValue = confirmPassword.value.trim();
    const passwordValue = password.value.trim();

    if (!isRequired(confirmedPasswordValue)) {
        showError(confirmPassword, 'Please enter the password again');
    } else if (passwordValue !== confirmedPasswordValue) {
        showError(confirmPassword, 'Confirm password does not match');
    } else {
        showSuccess(confirmPassword);
        valid = true;
    }
    return valid;
};

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (e) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(e);
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));
