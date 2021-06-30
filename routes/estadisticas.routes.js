const controller = require("../controllers/estadisticas.controller");

module.exports = function(app) {
    

    app.get(
        "/eventosPorAnio",
        controller.eventosPorAnio
      )
      app.get(
        "/serviciosMasContratados",
        controller.serviciosMasContratados
      )   
      app.get(
        "/serviciosMenosContratados",
        controller.serviciosMenosContratados
      )   
      app.get(
        "/cantidadDeEventosPorMes",
        controller.cantidadDeEventosPorMes
      )   
      app.get(
        "/clientesQueHanGastadoMas",
        controller.clientesQueHanGastadoMas
      )   
}