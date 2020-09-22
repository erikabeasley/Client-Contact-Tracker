$(document).ready(() => {
// This file just does a GET request to figure out which client info to get and updates the HTML on the page
  $.get("/api/client/:info").then(data => {
    // Not sure what to put where it says 'data.email'
    $(".contact-info").text(data.email);
  });
});