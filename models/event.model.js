module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
      name: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      location: {
        type: Sequelize.STRING
      },
      cant_personas: {
        type: Sequelize.INTEGER
      },
      completado:{
        type: Sequelize.BOOLEAN
      }
    });
  
    return Event;
  };