const {connection, Sequilize} = require('../database/database');
const Categories = require('../categories/category');

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

//pertence a
Categories.hasMany(Article);
Article.belongsTo(Categories)
//Article.belongsTo(Category);

//Sincronizando com banco de dados
Article.sync({force:false}).then(()=>{});

module.exports = Article;
