// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      title: req.body.title,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.post("/api/notes", req => {
    console.log(req);
    db.Notes.create({
      createdBy: req.body.createdBy,
      body: req.body.noteBody,
      ClientId: req.body.clientId
    });
  });

  app.post("/api/createNew", req => {
    console.log(req);
    db.Client.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      title: req.body.title,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      company: req.body.company
    });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      console.log("user not logged in");
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        title: req.user.title
      });
    }
  });

  //Route for all Clients
  app.get("/api/allClients", (_req, res) => {
    // sequelize code to find all clients, and return them to the user with res.json
    db.Client.findAll({
      include: [db.Notes]
    }).then(client => {
      const resObj = client.map(client => {
        return Object.assign(
          {},
          {
            id: client.id,
            firstName: client.firstName,
            lastName: client.lastName,
            title: client.title,
            email: client.email,
            phoneNumber: client.phoneNumber,
            company: client.company,
            notes: client.Notes.map(note => {
              return Object.assign(
                {},
                {
                  createdBy: note.createdBy,
                  body: note.body,
                  clientId: note.ClientId,
                  createdAt: note.createdAt
                }
              );
            })
          }
        );
      });
      res.json(resObj);
    });
  });

  // Route for getting client info
  app.get("/api/client/info/:id", (req, res) => {
    db.Client.findOne({
      where: {
        id: req.params.id
      }
    }).then(results => {
      res.json(results);
    });
  });

  //DELETE route for deleting clients
  app.delete("/api/client/:id", (req, res) => {
    db.Client.destroy({
      where: {
        id: req.params.id
      }
    }).then(results => {
      res.json(results);
    });
  });
};
