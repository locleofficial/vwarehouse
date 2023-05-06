function validateEmail(emailInput) {
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailInput.value.match(mailFormat)) {
    return true;
  } else {
    document.form.email.focus();
    alert("You have entered an invalid email address!");
    event.preventDefault();
    return false;
  }
}
