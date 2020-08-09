const express = require('express');
var cors = require('cors');
const Sequelize = require('sequelize');

global.db = new Sequelize('tecso', 'postgres', '37815875', {
    host: 'localhost',
    dialect: 'postgres'
});


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
// Routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Server on port', 3000);