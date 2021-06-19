
const config = require("../config/db.config.js");


const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};



console.log("EMpezo sequelize")

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.event = require("../models/event.model.js")(sequelize, Sequelize);
db.service = require("../models/service.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


db.event.belongsToMany(db.service, {
  through: "event_service",
  foreignKey: "event_id",
  otherKey: "service_id",

  
});
db.service.belongsToMany(db.event, {
  through: "event_services",
  foreignKey: "service_id",
  otherKey: "event_id",
 
});


db.event.belongsTo(db.user, {foreignKey: 'user_id', targetKey: 'id'});
db.service.belongsTo(db.user, {foreignKey: 'user_id', targetKey: 'id'});

db.ROLES = ["user", "admin", "proveedor"];

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;