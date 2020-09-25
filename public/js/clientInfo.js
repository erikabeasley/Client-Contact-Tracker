$(document).ready(() => {
  const noteSubmit = $("#noteSubmit");
  // const noteDisplay = $("#notesDisplay");
  const url = window.location.search;
  const delClient = $("#delClient");
  let clientId;
  console.log(url);
  if (url.indexOf("?id=") !== -1) {
    clientId = url.split("=")[1];
  }
  console.log(clientId);

  $.get("/api/allClients").then(clients => {
    console.log(clients);
    const specifiedClient = clients.filter(client => {
      return client.id === clientId;
    });
    console.log("specified Clients:  " + specifiedClient);
    $("#name").text(specifiedClient.firstName + " " + specifiedClient.lastName);
    $("#title").text(specifiedClient.title);
    $("#company").text(specifiedClient.company);
    $("#email").text(specifiedClient.email);
    $("#phoneNumber").text(specifiedClient.phoneNumber);

    noteSubmit.on("click", event => {
      event.preventDefault();
      $.post("/api/notes", {
        createdBy: specifiedClient.firstName + " " + specifiedClient.lastName,
        noteBody: $("#noteBody").val(),
        clientId: clientId
      });
    });
  });
  // This file just does a GET request to figure out which client info to get and updates the HTML on the page
  // $.get(`/api/client/info/${clientId}`).then(data => {
  //   $("#name").text(data.firstName + " " + data.lastName);
  //   $("#title").text(data.title);
  //   $("#company").text(data.company);
  //   $("#email").text(data.email);
  //   $("#phoneNumber").text(data.phoneNumber);

  delClient.on("click", event => {
    event.preventDefault();
    handleDeleteButtonPress();
    console.log("clicked");
  });
  function handleDeleteButtonPress() {
    $.ajax({
      method: "DELETE",
      url: "/api/client/" + clientId
    }).then((window.location = "/members"));
  }
});
