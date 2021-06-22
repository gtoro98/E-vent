const  {authJwt, verifyEvent}  = require("../middleware");
const controller = require("../controllers/event.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/event/create",
    [authJwt.verifyToken, authJwt.isUser],
    controller.createEvent,
  );

  app.post(
    "/api/event/:event_id/add/:service_id",
    //[authJwt.verifyToken, authJwt.isUser],
    controller.addService,
  );

  
  app.get(
    "/api/event/full/:event_id",
    //[authJwt.verifyToken, authJwt.isUser],
    controller.getFullEvent
  )

  app.delete(
    "/api/event/:event_id/delete/:service_id",
    //[authJwt.verifyToken, authJwt.isUser],
    controller.deleteService
  )
  app.get(
    "/api/event/active/:user_id",
    //[authJwt.verifyToken, authJwt.isUser],
    controller.getEventActive
  )

  app.put(
    "/api/event/completar/:event_id",
    //[authJwt.verifyToken, authJwt.isUser],
    controller.completarEvent
  )

};