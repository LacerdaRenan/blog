const {Router} = require('express');
const User = require('./user');

let router=Router();

router.get('/admin/users', (req,res)=>{
    res.send('Creating a router, so a user can login');
})
