const Sequilize = require('sequelize');

const connection = new Sequilize('guiapress', 'root', '12345678',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = {connection, Sequilize};