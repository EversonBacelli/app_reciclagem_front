import buscarDados from './buscarDados.js';
//import initMap from './maps.js';

let url = 'http://127.0.0.1:5500/front/visualizar_pedidos/lista_coleta.json'
buscarDados(url)

let map;

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

initMap();

