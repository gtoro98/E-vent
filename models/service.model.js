module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("services", {
      name: {
        type: Sequelize.STRING
      },
      activo: {
        type: Sequelize.BOOLEAN
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      promotion: {
        type: Sequelize.BOOLEAN
      },
      available: {
        type: Sequelize.BOOLEAN

      },
      image:{
        type: Sequelize.STRING
      }
    });
  
    return Service;
  };