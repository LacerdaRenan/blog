const {connection, Sequilize} = require('../database/database');

//Criando uma tabela, se não existir
const Category = connection.define('categories',{
    title:{
        type: Sequilize.STRING,
        allowNull: false
    },
    slug:{
        type:Sequilize.STRING,
        allowNull:false
    }
});

//Sincronizando com banco de dados
Category.sync({force:false}).then(()=>{});

module.exports = Category;

