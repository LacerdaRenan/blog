const {Router} = require('express')
const Category = require('./category');
const slugify = require('slugify');
const router = Router();

router.get('/admin/categories', (req,res)=>{
    res.render('admin/categories/index.ejs');
});

router.get('/admin/categories/new', (req,res)=>{
    res.render('admin/categories/new.ejs');
});

router.post('/admin/categories/save', (req,res)=>{
    let title = req.body.title;

    if(!title){
        res.redirect('/admin/categories/new')
    }

    Category.create({
        title:title,
        slug: slugify(title)
    }).then(()=>res.redirect('/'))

});


module.exports = router;
