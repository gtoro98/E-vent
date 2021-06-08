const db = require("../models");
const Service = db.service;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createService = (req, res) => {

    Service.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        promotion: req.body.promotion,
        available: req.body.available,
        user_id: req.body.user_id
      })
  
};