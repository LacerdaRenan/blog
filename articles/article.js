const {connection, Sequilize} = require('../database/database');

//Criando uma tabela, se não existir
const Article = connection.define('articles',{
    title:{
        type: Sequilize.STRING,
        allowNull: false
    },
    slug:{
        type:Sequilize.STRING,
        allowNull:false
    },
    body:{
        type: Sequilize.TEXT,
        allowNull:false
    }
});

//Sincronizando com banco de dados
Article.sync({force:false}).then(()=>{});

module.exports = Article;
