const express = require('express');
const bodyParser = require('body-parser');
const {connection} = require('./database/database');
const routesConnections = require('./categories/categoriesController');
const routesArticles = require('./articles/articlesController');
const routesUser = require('./user/userController');
const Article = require('./articles/article');
const Category = require('./categories/category');
const User = require('./user/user');
const session = require('express-session');

const app = express();

app.use(session({
    secret:"qualquercoisa",
    cookie:{maxAge:60000}
}))

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
app.use('/', routesUser);

app.get('/session', (req,res)=>{
    req.session.treinamento = 'formação nodeJs'
    req.session.ano = 2022
    req.session.user={
        usarname: 'Renan',
        id:1
    }

    res.send('Sessão gerada!');
})

app.get('/leitura', (req,res)=>{
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        user: req.session.user
    })
})

//Rota principal
app.get('/', (req,res)=>{

    Article.findAll({
        order:[['id', 'DESC']]
    }).then(a=>{
        Category.findAll().then(c=>{
            res.render('index.ejs',{
                articles:a,
                categories:c
            });
        });
    });
});

app.listen(8080, ()=>console.log('running...'));