const {Router} = require('express');
const User = require('./user');

let router = Router();

router.get('/admin/users', (req,res)=>{
    res.send('Creating a router, so a user can login');
})

router.get('/admin/user/create', (req,res)=>{
    res.render('admin/users/new.ejs');
})

router.post('/admin/user/new', (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    
    res.json({email, password});
    
    User.create({
        email:email,
        password:password
    }).then(()=>{
        res.redirect('/');
    })

})

module.exports = router;
