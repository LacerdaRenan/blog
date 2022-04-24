const Sequilize = require('sequelize');

const connection = new Sequilize('guiapress', 'root', '12345678',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {connection, Sequilize};