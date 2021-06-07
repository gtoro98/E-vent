const Pool = require('pg').Pool;



const pool = new Pool({
  user: 'pnmlayhc',
  host: 'queenie.db.elephantsql.com',
  database: 'pnmlayhc',
  password: 'W8VLXuxZse6X_Coh9zfx41Z3PBqT0y-0',
  port: 5432,
})



pool.on('connect', () => {
  console.log('connected to the db');
});


const getUsers = (request, response) => {
    pool.query('SELECT * FROM doctor ORDER BY doctor_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM doctor WHERE doctor_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const getUserByEmail = (request, response) => {
    const email = request.email;
  
    return pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      }
    })
  }

  const signUp = (request, response) => {

    const email= request.body.email;
    const password = request.body.password;
    const user = getUserByEmail(email).json;

    console.log(user);
    if(user){
      console.log("El email ya esta en uso")
    }
    //const email = parseInt(request.params.email)
   // const password = parseInt(request.params.email)

    pool.query("INSERT INTO users(email, password) VALUES ($1, $2)", [email, password], (error, results) => {
      if (error) {
        res.status(500).send("Error registering new user please try again.");
      }
    })
  }

  //fernando*************************
  app.post("/distribuidores", async(req,res) => {
    try {
        const { nombre } = req.body;
        const newDistribuidor = await pool.query(
            "INSERT INTO distribuidores (nombre) VALUES($1) RETURNING *",
            [nombre]
        );
        res.json(newDistribuidor.rows[0]);


    } catch (error) {
        console.error(error.message)
    }

})



//GET ALL

app.get("/distribuidores", async(req,res) => {
    try {
        const allDis = await pool.query("SELECT * FROM distribuidores");
        res.json(allDis.rows)
        
    } catch (error) {
        console.error(error.message)
    }


})


//GET
app.get("/distribuidores/:id", async (req,res) => {

try {
    const {id} = req.params;
    const distribuidor = await pool.query("SELECT * FROM distribuidores WHERE distribuidores_id = $1", [id])
    res.json(distribuidor.rows[0])
} catch (error) {
    console.error(error.message)
}})


//UPDATE

app.put("/distribuidores/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {nombre} = req.body;
        const updateDistribuidor = await pool.query("UPDATE distribuidores SET nombre = $1 WHERE distribuidores_id = $2",
        [nombre, id]);
        res.json("El nombre del distribuidor ha sido actualizado!")
        
    } catch (error) {
        console.error(error.message)
    }
})

//DELETE

app.delete("/distribuidores/:id", async (req, res) => {
try {
    const {id} = req.params;
    const deleteDistribuidor = await pool.query("UPDATE distribuidores SET activo = false WHERE distribuidores_id = $1", 
    [id]);
    res.json("El distribuidor ha sido eliminado exitosamente")
} catch (error) {
    console.error(error.message)
}
})

///fernando*******************





  module.exports = {
    getUsers,
    getUserById,
  }
  