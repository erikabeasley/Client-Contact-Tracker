$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const firstNameInput = $("input#firstName-input");
  const lastNameInput = $("input#lastName-input");
  const titleSelect = $("select#title-select");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      title: titleSelect.val().trim(), //probably don't need this
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.title ||
      !userData.email ||
      !userData.password
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.firstName,
      userData.lastName,
      userData.title,
      userData.email,
      userData.password
    );
    firstNameInput.val("");
    lastNameInput.val("");
    titleSelect.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, title, email, password) {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      title: title,
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
