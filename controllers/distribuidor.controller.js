const db = require("../models");
const Distribuidor = db.distribuidor;


const Op = db.Sequelize.Op;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createDistribuidor = (req, res) => {

    Distribuidor.create({
        nombre: req.body.nombre        
    }).then(dist =>{
        res.status(200).send(dist);
        return;
    })

    
};

exports.findAllDistribuidor = (req,res) => {
    Distribuidor.findAll().then(dist => {
        res.status(200).send(dist);
        return;
    })
};

exports.deleteDistribuidor = (req,res) =>{
    Distribuidor.update({activo : "false"}, {
        where:{ 
            id : req.params.id
        }
    }).then(respuesta =>{
        res.status(200).send(respuesta);
    });
}

exports.findDistribuidorById = (req,res) => {
    Distribuidor.findByPk(req.params.id)
    .then(respuesta=>{
        res.status(200).send(respuesta);
    })
}

exports.updateDistribuidor = (req,res) =>{
    Distribuidor.update({nombre : req.body.nombre}, {
        where:{ 
            id : req.params.id
        }
    }).then(respuesta =>{
        res.status(200).send(respuesta);
    });
}

