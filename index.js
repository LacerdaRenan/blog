const express = require('express');
const bodyParser = require('body-parser');
const {connection} = require('./database/database');
const routesConnections = require('./categories/categoriesController');
const routesArticles = require('./articles/articlesController');
const app = express();

//Definindo view engine
app.set('view engine', 'ejs');

//Arquivos estáticos
app.use(express.static('public'));

//configurações body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//conexão com banco de dados
connection.authenticate()
.then(()=>console.log('database connected'))
.catch((e)=>console.log(e));

//Rotas secundárias
app.use('/', routesConnections);
app.use('/', routesArticles);

//Rota principal
app.get('/', (req,res)=>{
    res.render('index');
});

app.listen(8080, ()=>console.log('running...'));