document.querySelectorAll('.deleteAny').forEach(e=>{
    e.addEventListener('submit', (event)=>{
        event.preventDefault();
        if(confirm('Deseja excluir elemento?')){
            e.submit();
        }
    })
})

