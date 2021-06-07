module.exports = (sequelize, Sequelize) => {
    const Distribuidor = sequelize.define("distribuidores", {
      nombre: {
        type: Sequelize.STRING
      },
      activo: {
        type: Sequelize.BOOLEAN
      },
    });
  
    return Distribuidor;
  };