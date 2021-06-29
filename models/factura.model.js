module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define("facturas", {
      montoTotal: {
        type: Sequelize.INTEGER,
      },
      metodo_pago:{
        type: Sequelize.STRING,
      }
    });
    return Factura;
  };