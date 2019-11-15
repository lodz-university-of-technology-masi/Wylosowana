"use strict"

let register = function () {
    let inputUsername = document.getElementById("exampleInputUsername1");
    let inputEmail = document.getElementById("exampleInputEmail1");
    let inputPassword = document.getElementById("inputPassword5");
    let inputConfirmPassword = document.getElementById("inputConfirmPassword5");

    let newUsername = inputUsername.value;
    let newEmail = inputEmail.value;
    let newPassword = inputPassword.value;
    let newConfirmPassword = inputConfirmPassword.value;

    console.log(newUsername, newEmail, newPassword, newConfirmPassword);
}
