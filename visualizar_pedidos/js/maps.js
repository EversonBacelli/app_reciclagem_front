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
let key = 'AIzaSyB6OQ3E6cipbLpesyxRa7AoZTIu3gIL2wA'
let id_projeto = 'appreciclagem-397022'