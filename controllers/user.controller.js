const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.getProveedores = (req, res) =>{

    Role.findByPk(3).then(role => {
      role.getUsers().then(users => {
        res.status(200).send(users);
        return;
      })
    })
    
    return;
  };

  exports.getUsers = (req, res) =>{

    Role.findByPk(1).then(role => {
      role.getUsers().then(users => {
        res.status(200).send(users);
        return;
      })
    })
    
    return;
  };
  exports.getProveedorbyName = (req, res) =>{

    Role.findByPk(3).then(role => {
      role.getUsers(
        {where: {
          name: {
            [Op.like]: '%' + req.params.name + '%'
          } 
        }}
      ).then(proveedores => {
        res.status(200).send(proveedores);
        return;
      })
    }).catch(err => {
      res.status(400).send(err)
    })
    
    return;
  };

  exports.getUsersbyName = (req, res) =>{
    Role.findByPk(1).then(role => {
      role.getUsers(
        {where: {
          name: {
            [Op.like]: '%' + req.params.name + '%'
          } 
        }}
      ).then(proveedores => {
        res.status(200).send(proveedores);
        return;
      })
    }).catch(err => {
      res.status(400).send(err)
    })
    
    return;
  };
  
  exports.getUserById = (req, res) =>{

    User.findByPk(req.params.id).then(user => {
      res.status(200).send(user);
      return;
      
    }).catch(err => {
      res.status(400).send(err)
    })
    
    return;
  };

  exports.getUserPasswordById = (req, res) =>{

    User.findByPk(req.params.id).then(user => {
      user.data
      res.status(200).send(user);
      return;
      
    }).catch(err => {
      res.status(400).send(err)
    })
    
    return;
  };
  exports.getUserbyName = (req, res) =>{

    Role.findByPk(1).then(role => {
      role.getUsers(
        {where: {
          name: {
            [Op.like]: '%' + req.params.name + '%'
          } 
        }}
      ).then(proveedores => {
        res.status(200).send(proveedores);
        return;
      })
    }).catch(err => {
      res.status(400).send(err)
    })
    
    return;
  };

  exports.deleteUser = (req,res) =>{

    User.destroy({
      where: { id: req.params.id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };
  exports.updateUser = (req,res) =>{
    console.log("Upating user last name: " + req.body.lastName)
    User.update({ 
        name: req.body.name,
        lastName: req.body.lastName || null,
        email: req.body.email,
        image: req.body.image || null,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        cedula: req.body.cedula,
        
       }, {
        where:{ 
            id : req.params.id
        }
    }).then(respuesta =>{
        console.log("User Updated Sucsessfully!!")
        res.status(200).send(respuesta);
        return;
    });
}

  