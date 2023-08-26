
let btn_visualizar =  document.querySelector('.visualizar')

let btn_cadastrar =  document.querySelector('.cadastrar')

btn_visualizar.addEventListener('click', () =>{
    window.location.href = '../../visualizar_coletas/index.html'
})

btn_cadastrar.addEventListener('click', () =>{
    window.location.href = '../../cadastro_coletas/index.html'
})

let btn_menu = document.querySelectorAll('.menu div')



btn_menu.forEach(item =>{
    let value_item = item.children[1].textContent
    switch (value_item) {
        case "Cadastro Morador":
            item.addEventListener('click', () =>{ document.location.href = '../../form_morador/index.html'})    
            break;
        case "Cadastro Parceiro":
            item.addEventListener('click', () =>{ document.location.href = '../../form_reciclador/'}) 
   
            break;
        case "Status do Pedido":
            item.addEventListener('click', () =>{ document.location.href = '../../acompanhar_pedido/index.html'}) 
            break;
        case "Cadastro Coletas":
            item.addEventListener('click', () =>{ document.location.href = '../../cadastro_coletas/index.html'}) 
            break;
        case "Realizar Coletas":
            item.addEventListener('click', () =>{ document.location.href = '../../visualizar_coletas/index.html'}) 
            break;
        case "Membros do Grupo":
                item.addEventListener('click', () =>{ document.location.href = '../../membros/index.html'}) 
            break;
    }
})

