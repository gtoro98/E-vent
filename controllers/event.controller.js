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

};

