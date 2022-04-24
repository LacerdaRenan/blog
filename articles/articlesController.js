const {Router} = require('express')
const router = Router();

router.get('/articles', (req, res)=>{
    res.send('ROTA CRIADA PARA ARTIGOS') 
});

router.get('/admin/articles/new', (req,res)=>{
    res.send('ROTA PARA NOVO ARTIGO')
})

module.exports = router;
