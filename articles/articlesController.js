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
    }).then(()=>res.redirect('/admin/articles'));

});

router.get('/articles/:slug', (req,res)=>{
    let slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(a=>{
        Category.findAll().then(c=>{
            res.render('publics/articles/article.ejs',{
                categories:c,
                article:a
            });
        });
    });
});

router.get('/articles-list/:categorySlug', (req,res)=>{
    let categorySlug = req.params.categorySlug;

    Category.findOne({
        where:{
            slug:categorySlug
        },
        include:[{model:Article}]
    }).then(c=>{
        Category.findAll().then(categories=>{
            res.render('publics/articles/articlesByCategory.ejs',{
                articles:c.articles,
                categories:categories
            })
        })
    })

});

module.exports = router;
