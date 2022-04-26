const {Router} = require('express');
const slugify = require('slugify');
const Category = require('../categories/category');
const Article = require('./article');

const router = Router();

router.get('/admin/articles', (req, res)=>{
    Article.findAll({
        include: [{model: Category}]
    }).then(articles=>{
            res.render('admin/articles/index.ejs',{
                articles:articles
            });
        });
    //res.render('admin/articles/index.ejs');
});

router.get('/admin/articles/new', (req,res)=>{

    Category.findAll()
        .then(categories=>{
            res.render('admin/articles/new.ejs',{
                categories:categories
        })

    });
});

router.post('/admin/articles/save', (req,res)=>{
    let title = req.body.title;
    let contents = req.body.contents;
    let categorie = req.body.category;

    Article.create({
        title:title,
        slug:slugify(title),
        body:contents,
        categoryId:categorie
    }).then(()=>res.redirect('/admin/articles'))

});

router.post('/admin/articles/delete', (req,res)=>{
    let id = req.body.id;

    Article.destroy({
        where: {
            id:id
        }
    }).then(()=>res.redirect('/admin/articles'))

})

module.exports = router;
