const db = require("../models");
const Event = db.event;
const Factura = db.factura;
const Service = db.service;
const User = db.user;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.createEvent = (req, res) => {
    console.log("hasta aqui funciona")
    console.log("Name: " + req.body.name)
    console.log("Date: " + req.body.date)
    console.log("Location: " + req.body.location)
    console.log("cant_personas: " + req.body.cant_personas)
    console.log("User_id: " + req.body.user_id)
    Event.create({
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        cant_personas: req.body.cant_personas,
        user_id: req.body.user_id,
        completado: false
      }).then(()=> {
         
        res.status(200).send({ message: "User was registered successfully!" });
        return
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

    Service.findByPk(req.params.service_id).then(service => {
      event.addService(service)
      return res.status(200).send({ message: "Event added successfully!" });
    }).catch(err => {
      return res.status(400).send({ message: "Problem finding service!" });
    })
    
  }).catch(err => {
    return res.status(400).send({ message: "Problem finding event!" });
  })
};
  
  exports.getFullEvent = (req,res) =>{
  Event.findByPk(req.params.event_id,{include:Service}).then(evento =>{
    return res.status(200).send(evento);
  }).catch(err => {
    return res.status(400).send({err});
  })
} 
exports.deleteService = (req, res) => {
  console.log("Eliminando Servicio")
  Event.findByPk(req.params.event_id).then(evento =>{
    Service.findByPk(req.params.service_id).then(servicio => {
      console.log("Evento: " + evento);

      evento.removeService([servicio.id]).then(respuesta => {
        console.log("PORQUE CONO NO SE BORRAAA")
        console.log("Respuesta: " + respuesta)
        res.status(200).send({message : "Service deleted successfully!"});
        return
      }).catch(err =>{
        return res.status(400).send({error: err})
      }) ;
      servicio.removeEvent(evento);

      console.log("Servicio: " + servicio);
       
    }).catch(err => {
      return res.status(400).send({error: err})
    })
  })
}

  exports.getEventActive = (req, res) => {
  Event.findOne({where: { user_id: req.params.user_id,completado:false}}).then(
    evento => {
      return res.status(200).send(evento);
    }).catch(err => {
      return res.status(400).send({error: err})
    })
  }
  exports.completarEvent = (req,res) =>{
    Event.update({
      completado: true
    },{ where: {
      id: req.params.event_id
    }
    }).then(evento=>{

      Factura.create({
        montoTotal: req.body.montoTotal,
        user_id: req.body.user_id,
        event_id: req.params.event_id,
        metodo_pago: req.body.metodo_pago,
      })
      return res.status(200).send(evento);
    }).catch(err => {
      return res.status(400).send({error: err})
    })
  }

  exports.getFacturas = (req,res) => {
    Factura.findAll({include: [Event, User]}).then((facturas => {
      return res.status(200).send(facturas)
    })).catch(err => {
      return res.status(400).send({error: err})
    })
  }



