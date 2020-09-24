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
    $(".contact-info").text(data.firstName + " " + data.lastName);
  });
});
