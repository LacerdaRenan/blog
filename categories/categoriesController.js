const {Router} = require('express')
const Category = require('./category');
const slugify = require('slugify');
const router = Router();

router.get('/admin/categories', (req,res)=>{

    Category.findAll()
        .then((data)=>{
            res.render('admin/categories/index.ejs', {
                data:data
            });
        })

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

router.post('/admin/categories/delete',(req,res)=>{
    let id = req.body.id;
    Category.destroy({
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect('/admin/categories');
    })
})

/*
router.get("/admin/categories/edit/:id", (req,res)=>{
    let id = req.params.id;
    Category.findByPk(id)
        .then(data=>{
            if(!data){
                res.redirect('/admin/categories');
            }
            res.render('admin/categories/edit.ejs')
        })
})
*/

module.exports = router;
