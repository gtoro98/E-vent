const db = require("../models");
const Service = db.service;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { service } = require("../models");


exports.createService = (req, res) => {

    Service.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        promotion : req.body.promotion,
        available: req.body.available,
        user_id: req.body.user_id,
        image: req.body.image,
         
    }).then(dist =>{
        res.status(200).send(dist);
        return;
    })

    
};

exports.findAllService = (req,res) => {
    Service.findAll().then(dist => {
        res.status(200).send(dist);
        return;
    })
};


exports.deleteService = (req,res) =>{

    Service.destroy({
      where: { id: req.params.id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Service was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Service with id=" + id
        });
      });
  };

exports.findServiceById = (req,res) => {
    Service.findByPk(req.params.id)
    .then(respuesta=>{
        res.status(200).send(respuesta);
        return;
    })
}
exports.getServicebyName = (req, res) =>{

  Service.findAll({
    where:{
      name: {
        [Op.like]: '%' + req.params.name + '%'
      }
    }
  }).then(services => {
    res.status(200).send(services);
    return;
  }).catch(err => {
    res.status(400).send(err)
  })
  
  return;
};


exports.findServicebyProveedor = (req,res) => {
  Service.findAll({
    where:{
      user_id: req.params.id
    }
  }).then(services => {
    res.status(200).send(services)
  }).catch(err => {
    res.status(400).send(err)
  })
}

exports.updateService = (req,res) =>{
    Service.update({ name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        available: req.body.available,
       }, {
        where:{ 
            id : req.params.id
        }
    }).then(respuesta =>{
        res.status(200).send(respuesta);
    });
}

