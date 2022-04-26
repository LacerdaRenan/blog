const {Router} = require('express')
const Category = require('../categories/category');

const router = Router();

router.get('/articles', (req, res)=>{
    res.send('ROTA CRIADA PARA ARTIGOS') 
});

router.get('/admin/articles/new', (req,res)=>{

    Category.findAll()
        .then(categories=>{
            res.render('admin/articles/new.ejs',{
                categories:categories
        })

    });
})

module.exports = router;
