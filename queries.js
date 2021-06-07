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

  module.exports = {
    getUsers,
    getUserById,
  }
  