const  {authJwt}  = require("../middleware");
const controller = require("../controllers/service.controller");

/*module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/service/create", 
    [authJwt.verifyToken, authJwt.isProveedor],
    controller.createService,
  );*/


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/services",
    controller.createService
  );

  app.get(
    "/services",
    controller.findAllService
  )

  app.delete(
    "/services/:id",
    controller.deleteService
  )

  app.get(
    "/services/:id",
    controller.findServiceById
  )
 
  app.put(
    "/services/:id",
    controller.updateService
  )

};