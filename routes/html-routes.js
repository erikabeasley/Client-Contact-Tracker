// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/signUp", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/newClient", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/newClient.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // After selecting client on members page, you are then taken to client page where you can get contact info
  app.get("/clientInfo", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/clientInfo.html"));
  });

  //Contact Form route for sending messages to clients
  app.get("/contactForm", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/contactForm.html"));
  });
};
