const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  console.log("SENT TOKEN: " + req.body.token)
  let token = req.body.token;
  
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.user_id = decoded.id;
    next();
  });
};

isUser = (req, res, next) => {
  console.log("BUSCANDO EL USER: " + req.body.user_id)
  User.findByPk(req.user_id).then(user => {
    console.log("consegui el user")
    user.getRoles().then(roles => {
      console.log("Consegui los roles")
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Necesitas ser usuario para crear un evento!",
      });
      
      return;
    });
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isProveedor = (req, res, next) => {
  User.findByPk(req.user_id).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "proveedor") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Proveedor Role!"
      });
    });
  });
};

isProveedorOrAdmin = (req, res, next) => {
  User.findByPk(req.user_id).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "proveedor") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isUser: isUser,
  isAdmin: isAdmin,
  isProveedor: isProveedor,
  isProveedorOrAdmin: isProveedorOrAdmin
};
module.exports = authJwt;