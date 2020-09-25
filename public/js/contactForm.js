$(document).ready(() => {
  const sendMsg = $("#sendMsg");
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
      $("#company").text(specifiedClient[0].company);
      $("#email").text(specifiedClient[0].email);

      sendMsg.on("click", event => {
        event.preventDefault();
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: specifiedClient[0].email,
          from: user.email,
          subject: $("#subject").val(),
          text: $("message").val()
        };
        //sgMail.send(msg);
        sgMail
          .send(msg)
          .then(() => {
            console.log("Message sent");
          })
          .catch(error => {
            console.log(error.response.body);
            // console.log(error.response.body.errors[0].message)
          });
      });
    });
  });
});
