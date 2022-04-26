document.querySelectorAll('.deleteCategory').forEach(e=>{
    e.addEventListener('submit', (e)=>{
        e.preventDefault();
        let msg = confirm('Deseja remover categoria?');
        if(msg){
            document.getElementById('deleteCategory').submit();
        }
    })

})

