const db = require("../models");
const Event = db.event

checkDate = (req, res, next) => {
    // Email
    console.log("Fecha: " + req.body.date)
    const today = new Date()
    console.log("Today: " + today)
    console.log(today - req.body.date)

    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();

    var fecha =year+"-"+month+"-"+day;

    if (req.body.date < fecha){
        console.log("Probando")
        console.log(req.body.date,fecha)
        return res.status(400).send({
            message: "Failed! Date already passed!"
        });
        
        
    }
    next();
};
const verifyEvent = {
    checkDate: checkDate,
  };
  module.exports = verifyEvent;