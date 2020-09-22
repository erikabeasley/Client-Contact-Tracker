$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  const addClient = $("#addClient");
  const allClientsBox = $("#allClientsInfo");

  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.firstName + " " + data.lastName);
  });
  $.get("/api/allClients").then(data =>{
    console.log(data);
    displayAllClients(data);
  });
  addClient.on("click", event => {
    event.preventDefault();
    window.location = "/newClient";
    console.log("clicked");
  });

  const displayAllClients = clients => {
    console.log(clients);
    clients.forEach(client => {
      allClientsBox.append(`
      <button class="contact-btn">
          <h3 class="text-center"><a>${client.firstName} ${client.lastName}</a> | ${client.title} | ${client.company} | ${client.email} </h3>
      </button>
      `);
    });
  };
});
