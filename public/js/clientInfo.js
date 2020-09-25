$(document).ready(() => {
  const noteSubmit = $("#noteSubmit");
  const delClient = $("#delClient");
  const noteDisplay = $("#notesDisplay");
  const url = window.location.search;
  let clientId;
  console.log(url);
  if (url.indexOf("?id=") !== -1) {
    clientId = url.split("=")[1];
  }
  console.log(clientId);
  $.get("/api/user_data").then(user => {
    $.get("/api/allClients").then(clients => {
      console.log(clients);
      console.log("client id:" + clientId);
      const specifiedClient = clients.filter(client => {
        return client.id === parseInt(clientId);
      });
      console.log(specifiedClient);
      $("#name").text(
        specifiedClient[0].firstName + " " + specifiedClient[0].lastName
      );
      $("#title").text(specifiedClient[0].title);
      $("#company").text(specifiedClient[0].company);
      $("#email").text(specifiedClient[0].email);
      $("#phoneNumber").text(specifiedClient[0].phoneNumber);
      displayNotes(specifiedClient[0].notes);
      noteSubmit.on("click", event => {
        event.preventDefault();

        $.post("/api/notes", {
          createdBy: `${user.firstName}  ${user.lastName}`,
          noteBody: $("#noteBody").val(),
          clientId: clientId
        }).then(displayNotes(specifiedClient[0].notes));
      });
    });
  });

  $("#contactBtn").on("click", event => {
    event.preventDefault();
    window.location = "/contactForm?id=" + clientId;
    console.log("clicked");
  });

  const displayNotes = notes => {
    noteDisplay.empty();
    notes.forEach(note => {
      noteDisplay.append(`
      <span class="row text-center"><p id="createdBy">${note.createdBy}:  </p><h5 id="note">${note.body}</h5></span>
      `);
    });
  };
  delClient.on("click", event => {
    event.preventDefault();
    handleDeleteButtonPress();
    console.log("clicked");
  });
  const handleDeleteButtonPress = () => {
    $.ajax({
      method: "DELETE",
      url: "/api/client/" + clientId
    }).then((window.location = "/members"));
  };
});
