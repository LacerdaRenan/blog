const {Router} = require('express')
const router = Router();

router.get('/categories', (req, res)=>{
    res.send('ROTA CRIADA') 
});

router.get('/admin/categories/new', (req,res)=>{
    res.send('ROTA PARA NOVA CATEGORIA')
})

module.exports = router;
