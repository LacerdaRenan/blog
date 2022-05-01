const {Router} = require('express');
const User = require('./user');
const bcrypt = require('bcryptjs');
const adminAuth = require('../middlewares/adminAuth');

let router = Router();

router.get('/admin/users', adminAuth, (req,res)=>{
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
                res.redirect('/login');
            })
        }else{
            res.send('nn')
        }
    })
})

router.get('/login', (req,res)=>{
    res.render('admin/users/login.ejs')
})

router.post('/authenticate', (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where:{
            email:email
        }
    }).then(u=>{
        if(u){
            let correct = bcrypt.compareSync(password,u.password)
            if(correct){
                req.session.user = {
                    id:u.id,
                    email:u.email
                }
                res.redirect('/admin/categories');
            }else{
                res.redirect('/login')
            }
        }else{
            res.redirect('/login');
        }
    })
})

router.get('/logout', (req, res)=>{
    req.session.user=undefined;
    res.redirect('/');
})

module.exports = router;
