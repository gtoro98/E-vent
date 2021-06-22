const db = require("../models");
const Event = db.event;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { service } = require("../models");

exports.createEvent = (req, res) => {

    Event.create({
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        cant_personas: req.body.cant_personas,
        user_id: req.body.user_id,
      }).then(()=> {
        return res.status(200).send({ message: "User was registered successfully!" });
      })
  
};

exports.findEventsbyUser = (req,res) => {
  Event.findAll({
    where:{
      user_id: req.params.id
    }
  }).then(events => {
    res.status(200).send(events)
  }).catch(err => {
    res.status(400).send(err)
  })
}

exports.findEventbyId = (req,res) => {
  Event.findByPk({
    where:{
      id: req.params.id
    }
  }).then(event => {
    res.status(200).send(event)
  }).catch(err => {
    res.status(400).send(err)
  })
}

exports.addService = (req, res) => {


  Event.findByPk(req.params.event_id).then( event => {

    service.findByPk(req.params.service_id).then(service => {
      event.addService(service)
      return res.status(200).send({ message: "Event added successfully!" });
    }).catch(err => {
      return res.status(400).send({ message: "Problem finding service!" });
    })
    
  }).catch(err => {
    return res.status(400).send({ message: "Problem finding event!" });
  })
} 
  
exports.getFullEvent = (req,res) =>
  Event.findByPk(req.params.event_id,{include:service}).then(evento =>{
    return res.status(200).send(evento);
  }).catch(err => {
    return res.status(400).send({err});
  })
  
exports.deleteService = (req, res) =>
  Event.findByPk(req.params.event_id).then(evento =>{
    service.findByPk(req.params.service_id).then(servicio => {
      console.log(evento);
    evento.removeService(servicio);
    console.log(evento);
    return res.status(200).send({message : "Service deleted successfully!"});
    }).catch(err => {
      return res.status(400).send({error: err})
    })
  })
;

