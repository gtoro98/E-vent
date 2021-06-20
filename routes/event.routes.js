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

  app.get(
    "/api/events/user/:id",
    controller.findEventsbyUser
  )
  app.post(
    "/api/event/:event_id/add/:service_id",
    //[authJwt.verifyToken, authJwt.isUser],
    controller.addService,
  );

};