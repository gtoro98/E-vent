const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./models');
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



const Role = db.role;
const User = db.user;
const Event = db.event;
const Op = db.Sequelize.Op;

db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('Server is ready');

});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/event.routes')(app);
require('./routes/service.routes')(app);


const port = process.env.port || 5000
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);   
})
