document.querySelector('#deleteCategory').addEventListener('submit', (e)=>{
    e.preventDefault();
    let msg = confirm('Deseja remover categoria?');

    if(msg){
        document.getElementById('deleteCategory').submit();
    }
})