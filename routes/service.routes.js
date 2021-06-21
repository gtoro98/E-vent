const  {authJwt}  = require("../middleware");
const controller = require("../controllers/service.controller");

  
  
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

  app.post(
    "/api/service/create", 
    [authJwt.verifyToken, authJwt.isProveedor],
    controller.createService,
  );

  app.get(
    "/api/services/",
    controller.findAllService
  )
  app.get(
    "/api/services/:name",
    controller.getServicebyName
  )
  app.get(
    "/api/services/proveedores/:id",
    controller.findServicebyProveedor
  )

  app.delete(
    "/api/services/:id",
    controller.deleteService
  )

  app.get(
    "/api/servicesById/:id",
    controller.findServiceById
  )
 
  app.put(
    "/api/services/:id",
    controller.updateService
  );

  
}