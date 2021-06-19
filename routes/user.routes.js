const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isProveedor],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/proveedores/",
    //[authJwt.verifyToken, authJwt.isAdmin],
    controller.getProveedores
  );

  app.get(
    "/api/users",
    //[authJwt.verifyToken, authJwt.isAdmin],
    controller.getUsers
  );

  app.get(
    "/api/users/:name",
    //[authJwt.verifyToken, authJwt.isAdmin],
    controller.getUsersbyName
  );

  app.get(
    "/api/user/:id",
    //[authJwt.verifyToken, authJwt.isAdmin],
    controller.getUserById
  );
  app.get(
    "/api/proveedores/:name",
    //[authJwt.verifyToken, authJwt.isAdmin],
    controller.getProveedorbyName
  );

  app.delete("/api/proveedor/:id", controller.deleteUser);

  app.put(
    "/api/proveedor/:id",
    //[authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  )
  app.put(
    "/api/user/edit/:user_id",
    //[authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  )
};