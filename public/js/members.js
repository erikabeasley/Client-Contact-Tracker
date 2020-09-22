$(document).ready(() => {
  const addClient = $("#addClient");
  const clientTable = $("#clientTable");

  // API call for accesing user_data
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.firstName + " " + data.lastName);
  });

  // API call for accesing all clients data
  $.get("/api/allClients").then(data =>{
    console.log(data);
    displayAllClients(data);
  });

  // add new client click event
  addClient.on("click", event => {
    event.preventDefault();
    window.location = "/newClient";
    console.log("clicked");
  });

  // Funtion for displaying our clients
  const displayAllClients = clients => {
    console.log(clients);
    clients.forEach(client => {
      clientTable.append(`
      <tr class="clientInfo" data-id="${client.id}">
            <td>${client.firstName} ${client.lastName}</td>
            <td>${client.title}</td>
            <td>${client.company}</td>
            <td>${client.email}</td>
      </tr>     
      `);
    });
  };
  $(window).on("load", () => {
    $(".clientInfo").on("click", event => {
      event.preventDefault();
      console.log(this);
    });
  });
});
