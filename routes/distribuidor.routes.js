const  {authJwt}  = require("../middleware");
const controller = require("../controllers/distribuidor.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/distribuidores",
    controller.createDistribuidor
  );

  app.get(
    "/distribuidores",
    controller.findAllDistribuidor
  )

  app.delete(
    "/distribuidores/:id",
    controller.deleteDistribuidor
  )

  app.get(
    "/distribuidores/:id",
    controller.findDistribuidorById
  )

  app.put(
    "/distribuidores/:id",
    controller.updateDistribuidor
  )

};