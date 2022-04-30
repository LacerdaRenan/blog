const {connection, Sequilize} = require('../database/database');

//Criando uma tabela, se não existir
const User = connection.define('users',{
    email:{
        type: Sequilize.STRING,
        allowNull: false
    },
    password:{
        type:Sequilize.STRING,
        allowNull:false
    }
});

//Sincronizando com banco de dados
User.sync({force:false}).then(()=>{});

module.exports = Category;
