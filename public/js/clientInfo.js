$(document).ready(() => {
  const url = window.location.search;
  let clientId;
  console.log(url);
  if (url.indexOf("?id=") !== -1) {
    clientId = url.split("=")[1];
  }
  console.log(clientId);

  // This file just does a GET request to figure out which client info to get and updates the HTML on the page
  $.get(`/api/client/info/${clientId}`).then(data => {
    // Not sure what to put where it says 'data.email'
    $("#name").text(data.firstName + " " + data.lastName);
    $("#title").text(data.title);
    $("#company").text(data.company);
    $("#email").text(data.email);
    $("#phoneNumber").text(data.phoneNumber);

    $("#noteSubmit").on("click", event => {
      event.preventDefault();
      $.post("/api/notes", {
        createdBy: data.firstName + " " + data.lastName,
        noteBody: $("#noteBody").val(),
        clientId: clientId
      });
    });
  });

});
