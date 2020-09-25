$(document).ready(() => {
  const noteSubmit = $("#noteSubmit");
  const delClient = $("#delClient");
  // const noteDisplay = $("#notesDisplay");
  const url = window.location.search;
  let clientId;
  console.log(url);
  if (url.indexOf("?id=") !== -1) {
    clientId = url.split("=")[1];
  }
  console.log(clientId);

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

    noteSubmit.on("click", event => {
      event.preventDefault();
      $.post("/api/notes", {
        createdBy:
          specifiedClient[0].firstName + " " + specifiedClient[0].lastName,
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

 $("#contactBtn").on("click", event => {
    event.preventDefault();
    window.location = "/contactForm?id=" + clientId;
    console.log("clicked");
  });

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
