$(document).ready(() => {
  const noteSubmit = $("#noteSubmit");
  const noteDisplay = $("#notesDisplay");
  const url = window.location.search;
  let clientId;
  console.log(url);
  if (url.indexOf("?id=") !== -1) {
    clientId = url.split("=")[1];
  }
  console.log(clientId);

  // This file just does a GET request to figure out which client info to get and updates the HTML on the page
  $.get(`/api/client/info/${clientId}`).then(data => {
    $("#name").text(data.firstName + " " + data.lastName);
    $("#title").text(data.title);
    $("#company").text(data.company);
    $("#email").text(data.email);
    $("#phoneNumber").text(data.phoneNumber);

    $.get(`/api/notes/${clientId}`).then(data => {

      noteSubmit.on("click", event => {
        event.preventDefault();
        $.post("/api/notes", {
          createdBy: data.firstName + " " + data.lastName,
          noteBody: $("#noteBody").val(),
          clientId: clientId
        });
      });
    });
  });
  const displayNotes = (client, notes) => {
    notes.forEach(note => {
      noteDisplay.append(`
      <hr>
        <span class="row text-center"><p id="createdBy">${client}:   </p><h5 id="note">${note}</h5></span>
        <hr>
      `);
    });
  }
});
