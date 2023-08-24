
var opc = {
    id: null,
    qtd: 0.0,
    periodo: '',
    data: '', 
    logradouro:'',
    numero: '',
    nome:''
};

let btn_coleta = document.querySelector('#coleta')

btn_coleta.addEventListener('click', function(){
    let inputs_qtd = document.getElementsByName('qtd')
    let inputs_periodo = document.getElementsByName('periodo')
    let input_date = document.querySelector('#date_coleta')

    opc.data = input_date.value

    inputs_qtd.forEach(i_qtd=>{
        if(i_qtd.checked){
            opc.qtd = i_qtd.value
        }
    })

    inputs_periodo.forEach(i_periodo=>{
        if(i_periodo.checked){
            opc.periodo = i_periodo.value
        }
    })

    console.log(opc)
})

function requisitarColeta(opc){
    let url = ""
    fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(opc)
    })
    .then(function (response) {
        return response.json()
    })
    .then(function (response) {
        console.log(response)
    })
}