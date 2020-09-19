$(document).ready(() => {
  // Getting references to our form and input
  const createNewForm = $("form.createNew");
  const firstNameInput = $("input#firstName-input");
  const lastNameInput = $("input#lastName-input");
  const titleSelect = $("select#title-select");
  const emailInput = $("input#email-input");
  const phoneNumberInput = $("input#phoneNumber-input");
  const companyInput = $("input#company-input");

  // When the createNew button is clicked, we validate the email and password are not blank
  createNewForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      title: titleSelect.val().trim(), //probably don't need this
      email: emailInput.val().trim(),
      phoneNumber: phoneNumberInput.val().trim(),
      company: companyInput.val().trim()
    };

    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.title ||
      !userData.email ||
      !userData.phoneNumber ||
      !userData.company
    ) {
      return;
    }
    // If we have an email and password, run the createNewUser function
    createNewClient(
      userData.firstName,
      userData.lastName,
      userData.title,
      userData.email,
      userData.phoneNumber,
      userData.company
    );
    firstNameInput.val("");
    lastNameInput.val("");
    titleSelect.val("");
    emailInput.val("");
    companyInput.val("");
    phoneNumberInput.val("");
  });

  // Does a post to the createNew route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function createNewClient(
    firstName,
    lastName,
    title,
    email,
    phoneNumber,
    company
  ) {
    $.post("/api/createNew", {
      firstName: firstName,
      lastName: lastName,
      title: title,
      email: email,
      phoneNumber: phoneNumber,
      company: company
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(JSON.stringify(err.responseJSON));
    $("#alert").fadeIn(500);
  }
});
