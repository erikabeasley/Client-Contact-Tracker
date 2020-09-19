$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const fnameInput = $("input#fname-input");
  const lnameInput = $("input#lname-input");
  const jobSelect = $("select#job-select");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      fname: fnameInput.val().trim(),
      lname: lnameInput.val().trim(),
      job: jobSelect.val().trim(), //probably don't need this
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.fname || !userData.lname || !userData.job || !userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.fname, userData.lname, userData.job, userData.email, userData.password);
    fnameInput.val("");
    lnameInput.val("");
    jobSelect.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(fname, lname, job, email, password) {
    $.post("/api/signup", {
      fname: fname,
      lname: lname,
      job: job,
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
