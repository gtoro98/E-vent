const { sequelize } = require("../models");
const db = require("../models");
const pool = require("../queries");
const Factura = db.factura;
const Events = db.event;
/*5 estadisticas*/

/*1. Monto total promedio de evento por año*/


exports.eventosPorAnio= async(req, res) => {
    try {
        let results = await pool.pool.query('select extract(year from date) as yyyy, avg(f."montoTotal") from facturas f left join events e on e.id = f.event_id group By(1)');
        res.status(200).json(results.rows)
     
    } catch (error) {
        console.error(error.message)
    }
    
}

/*2. Top 3 de los servicios más contratados*/
exports.serviciosMasContratados= async(req, res) => {
    try {
        let results = await pool.pool.query('select s.name, count(es.service_id) cant from event_services es left join services s on s.id = es.service_id group by (s.name) order by cant desc limit 3;');
        res.status(200).json(results.rows)
     
    } catch (error) {
        console.error(error.message)
    }
    
}
/*3. Top 3 de los servicios menos vendidos*/
exports.serviciosMenosContratados= async(req, res) => {
    try {
        let results = await pool.pool.query('select s.name, count(es.service_id) cant from event_services es left join services s on s.id = es.service_id group by (s.name) order by cant asc limit 3;');
        res.status(200).json(results.rows)
     
    } catch (error) {
        console.error(error.message)
    }
    
}


/*4. Cantidad de eventos por mes*/

exports.cantidadDeEventosPorMes= async(req, res) => {
    try {
        let results = await pool.pool.query('select extract(year from date) as yyyy, extract(month from date) as MM, count(*) from Events group by 1,2;');
        res.status(200).json(results.rows)
     
    } catch (error) {
        console.error(error.message)
    }
    
}


/*5. Top 3 de los clientes que han gastado más*/
exports.clientesQueHanGastadoMas= async(req, res) => {
    try {
        let results = await pool.pool.query('select u."name", u."lastName" , u."cedula", sum(f."montoTotal") as gasto from facturas f left join users u on u.id = f.user_id group by u."name", u."lastName", u."cedula" order by gasto desc limit 3');
        res.status(200).json(results.rows)
     
    } catch (error) {
        console.error(error.message)
    }
    
}

