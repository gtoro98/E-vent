module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define("facturas", {
      montoTotal: {
        type: Sequelize.INTEGER,
      }
    });
    return Factura;
  };