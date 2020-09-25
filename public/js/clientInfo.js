$(document).ready(() => {
  const url = window.location.search;
  const delClient = $("#delClient");
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
