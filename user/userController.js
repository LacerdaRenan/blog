const {Router} = require('express');
const User = require('./user');
const bcrypt = require('bcryptjs');

let router = Router();

router.get('/admin/users', (req,res)=>{
    User.findAll().then(users=>{
        res.render('admin/users/index.ejs',{
            users:users
        })
    })
})

router.get('/admin/user/create', (req,res)=>{
    res.render('admin/users/new.ejs');
})

router.post('/admin/user/new', (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    
    User.findOne({
        where:{
            email:email
        }
    }).then(u=>{
        if(u==undefined){
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt)
        
            User.create({
                email:email,
                password:hash
            }).then(()=>{
                res.redirect('/');
            })
        }else{
            res.send('nn')
        }
    })
    

})

module.exports = router;
