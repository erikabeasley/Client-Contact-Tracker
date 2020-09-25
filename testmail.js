// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "klee138@gmail.com",
  from: "klee138@gmail.com",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>"
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
