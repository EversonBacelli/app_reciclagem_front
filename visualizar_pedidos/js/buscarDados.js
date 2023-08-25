
export default function buscarDados(url){

    fetch(url)
        .then(response =>{
            return response.json()
        })
        .then(response =>{
            incluirNaTela(response)
        })


        function incluirNaTela(response){
            let tags = []

            const tagsACriar = ['tr', 'td','td','td','td','td', 'td']
            
            response.forEach(rep =>{
                tagsACriar.forEach(tag => {
                    tags = criarTag(tag, tags)
                }) 
                tags = editarTags(tags, rep)
                inserirNaTabela(tags)
                tags = []
            })    
        } 
}

function criarTag(tag, tags){
    let newTag = document.createElement(tag)
    tags.push(newTag);
    return tags;
}

function inserirNaTabela(tags){
    let corpo_tabela = document.querySelector('.corpo_tabela')
    corpo_tabela.appendChild(tags[0])
    
    for (let index = 1; index < tags.length; index++) {
        const element = tags[index];
        tags[0].appendChild(element)
    }
}

function editarTags(tags, rep){       
    tags[1].textContent = rep.id_coleta  
    tags[2].textContent = rep.nome_morador
    tags[3].textContent = rep.endereco
    tags[4].textContent = rep.periodo
    tags[5].textContent = rep.qtd_a_retirar
    tags[6].textContent = 'COLETAR'
    tags[6].classList.add('btn_coletar')
    
    return tags
 }