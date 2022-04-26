document.querySelectorAll('.deleteCategory').forEach(e=>{
    e.addEventListener('submit', (event)=>{
        event.preventDefault();
        if(confirm('Deseja remover categoria?')){
            e.submit();
        }
    })
})

