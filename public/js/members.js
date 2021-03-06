$(document).ready(() => {
  const addClient = $("#addClient");
  const clientTable = $("#clientTable");
  const searchSubmit = $("#searchSubmit");

  // API call for accesing user_data
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.firstName + " " + data.lastName);
    $(".member-title").text(data.title);
  });

  // API call for accesing all clients data
  $.get("/api/allClients").then(data => {
    console.log(data);
    displayAllClients(data);

    searchSubmit.on("click", event => {
      event.preventDefault();
      const searchQuery = $("#searchBox").val();
      console.log(typeof searchQuery);
      displaySearchResults(data, searchQuery.toLowerCase());
    });
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
      <tr class="clientInfo" href-data="/clientInfo/?id=${client.id}">
            <td><a href="/clientInfo?id=${client.id}"> ${client.firstName} ${client.lastName}</a></td>
            <td>${client.title}</td>
            <td>${client.company}</td>
            <td>${client.email}</td>
      </tr>     
      `);
    });
  };

  const displaySearchResults = (clients, searchQuery) => {
    clientTable.empty();
    // eslint-disable-next-line array-callback-return
    console.log(clients, searchQuery);
    const relevantClients = clients.filter(client => {
      return (
        client.firstName.toLowerCase().includes(searchQuery) ||
        client.lastName.toLowerCase().includes(searchQuery) ||
        client.title.toLowerCase().includes(searchQuery) ||
        client.company.toLowerCase().includes(searchQuery) ||
        client.email.toLowerCase().includes(searchQuery)
      );
    });
    console.log(relevantClients);

    relevantClients.forEach(client => {
      clientTable.append(`
      <tr class="clientInfo" href-data="/client/info/?id=${client.id}">
            <td><a href="/client/info?id=${client.id}">${client.firstName} ${client.lastName}</a></td>
            <td>${client.title}</td>
            <td>${client.company}</td>
            <td>${client.email}</td>
      </tr>     
      `);
    });
  };

  $(window).on("load", () => {
    console.log("page loaded");
    $(".clientInfo").on("click", event => {
      console.log("clicked");
      event.preventDefault();
      console.log($(this));
    });
  });
});
