import buscarCep from "./cep.js";


let btn_buscar = document.querySelector('#btn_buscar')
let btn_cadastrar = document.querySelector('#btn_cadastrar')
let form = document.querySelector('form')





btn_buscar.addEventListener('click', buscarCep)

btn_cadastrar.addEventListener('click', cadastrar)


function cadastrar(event){
    event.preventDefault()
    
    let parceiro = {
        nomeInstiuicao: form.instituicao.value,
        responsavel: form.responsavel.value,
        cep: form.cep.value,
        logradouro: form.logradouro.value,
        numero: form.numero.value,
        complemento: form.comp.value, 
        bairro: form.bairro.value,
        ddd: form.ddd.value,
        email: form.email.value
    }    
    form.reset()
    console.log(parceiro)
}

 
function inserirCadastro(parceiro){
    let url = ""
    fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parceiro)
    })
    .then(function (response) {
        return response.json()
    })
    .then(function (response) {
        console.log(response)
    })
}