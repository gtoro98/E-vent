module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("services", {
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      description: {
        type: Sequelize.STRING
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
