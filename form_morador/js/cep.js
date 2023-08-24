



export default function buscarCep(){
    let input_cep = document.querySelector('.input_cep')
    let input_logradouro = document.querySelector('.input_logradouro')
    let input_bairro = document.querySelector('.input_bairro')
    let input_ddd = document.querySelector('.ddd')
    let cep = input_cep.value

    let end = `https://viacep.com.br/ws/${cep}/json/`
    fetch(end)
        .then(function(response){
            return response.json()
        })
        .then(function(response){
            input_logradouro.value = response.logradouro
            input_bairro.value = response.bairro
            input_ddd.value = response.ddd 
            console.log(response)
        })
}