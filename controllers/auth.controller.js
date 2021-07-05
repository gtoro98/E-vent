const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user } = require("../models");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    image: req.body.imageURL,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    cedula: req.body.cedula
  })
    .then(user => {

      if (req.body.roles) {
        console.log("PORFAVORRRR")
        console.log(req.body.roles)
        Role.findAll({
          where: {
            name: req.body.roles[0], 
          }
        }).then(roles => {

          user.setRoles(roles).then(() => {

            return res.status(200).send({ message: "User was registered successfully!" });
          });
        }).catch((err) => {
          console.log("No se consiguio el role")
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          return res.status(200).send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.logIn = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        return res.status(200).send({
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.changePassword = (req,res) => {
  console.log("Upating user password : " + typeof(req.body.password))
  if(req.body.password != ''){
    User.update({ 
        password: bcrypt.hashSync(req.body.password, 8),
        
       }, {
        where:{ 
            id : req.body.id
        }
    }).then(respuesta =>{
        console.log("User Password Updated Sucsessfully!!")
        res.status(200).send({ message: "User Password Updated Sucsessfully!!" });
        return;
    }).catch(err => {
      console.log(err)
      res.status(400).send({ message: "Error cambiando contrasena." })
    });
  }
  else{
    res.status(400).send({ message: "Error cambiando contrasena." })
  }
}

exports.resetPassword = (req,res) => {
  console.log("Upating user password : " + req.body.email)
    User.findOne({where:{
      email: req.body.email
    }
    }).then(user =>{
      console.log("Conseguimos el user")
      console.log(JSON.stringify(user))
        user.update(
          {
            password: bcrypt.hashSync(user.telefono, 8)
          }
        ).then((respuesta) => {
          console.log("User Password Updated Sucsessfully!!")
          res.status(200).send({ message: "User Password Updated Sucsessfully!! Password is now User's telefono" });
          return;
        })
        
    }).catch(err => {
      res.status(400).send({ message: "Error cambiando contrasena. Porfavor ingrese un correo valido" })
    });
}