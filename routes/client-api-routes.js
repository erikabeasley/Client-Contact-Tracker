const db = require("../models");

module.exports = function(app) {
  app.post("/api/createNew", (req, res) => {
    console.log(req.body);
    /*db.Client.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          title: req.body.title,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          company: req.body.company
        })*/
    db.Client.create(req.body)
      .then(dbClient => {
        res.json(dbClient);
        // res.redirect(307, "/members");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  //Route for all Clients
  app.get("/api/allClients", (_req, res) => {
    // sequelize code to find all clients, and return them to the user with res.json
    db.Client.findAll({}).then(result => res.json(result));
  });

  // Route for getting client info
  //when js send this request, go to db and find entry where id is = to # 
  app.get("/api/client/:id", (req, res) => {
    db.Client.findOne({
      where: {
        id: req.params.id
      }
    }).then(results => {
      res.json(results);
    });
  });
}