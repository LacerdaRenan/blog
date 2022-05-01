const {Router} = require('express')
const Category = require('./category');
const slugify = require('slugify');
const router = Router();
const adminAuth = require('../middlewares/adminAuth')

router.get('/admin/categories',adminAuth, (req,res)=>{

    Category.findAll()
        .then((data)=>{
            res.render('admin/categories/index.ejs', {
                data:data
            });
        })

});

router.get('/admin/categories/new', adminAuth, (req,res)=>{
    res.render('admin/categories/new.ejs');
});

router.post('/admin/categories/save', adminAuth, (req,res)=>{
    let title = req.body.title;

    if(!title){
        res.redirect('/admin/categories/new')
    }

    Category.create({
        title:title,
        slug: slugify(title)
    }).then(()=>res.redirect('/admin/categories'))

});

router.post('/admin/categories/delete', adminAuth, (req,res)=>{
    let id = req.body.id;
    Category.destroy({
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect('/admin/categories');
    })
})

router.get("/admin/categories/edit/:id", adminAuth, (req,res)=>{
    let id = req.params.id;
    Category.findByPk(id)
        .then(data=>{
            if(!data){
                res.redirect('/admin/categories');
            }
            res.render('admin/categories/edit.ejs',{
                category:data
            })
        })
})

router.post('/admin/categories/update', adminAuth, (req,res)=>{
    let id = req.body.id;
    let title = req.body.title;
    let slug = slugify(title);

    Category.update(
        {
            title: title,
            slug:slug
        },
        {
            where:{
                id:id
            }
        }
    ).then(()=>res.redirect('/admin/categories'));
})


module.exports = router;
