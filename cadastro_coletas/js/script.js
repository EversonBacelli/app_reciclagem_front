let selectedLatLng = null;
let userLocation = null;

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      const map = new google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 13
      });

      setupSearchBox(map);
      setupClickListener(map);

    });
  } else {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.749933, lng: -73.98633 },
      zoom: 13
    });

    setupSearchBox(map);
    setupClickListener(map);
  }
}

function setupSearchBox(map) {
  const input = document.getElementById("searchInput");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        return;
      }

      bounds.extend(place.geometry.location);
    });

    map.fitBounds(bounds);
  });
}

function setupClickListener(map) {
  google.maps.event.addListener(map, 'click', function(event) {
    selectedLatLng = event.latLng;
    console.log("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
  });
}

function cadastrarColeta() {
  if (selectedLatLng === null) {
    alert("Por favor, selecione uma localização no mapa.");
    return;
  }

  const tipo_lixo = document.getElementById('tipo_lixo').value;
  const turno = document.getElementById('turno').value;
  const data = new Date().toISOString().split('T')[0];
  const quantidade = document.getElementById('quantidade').value;

  const payload = {
    latitude: selectedLatLng.lat(),
    longitude: selectedLatLng.lng(),
    tipo_lixo: tipo_lixo,
    turno: turno,
    data: data,
    quantidade: quantidade
  };

  $.ajax({
    url: 'http://localhost:8080/coletas/add',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    success: function(response) {
      alert("Coleta cadastrada com sucesso!");
    },
    error: function(error) {
      alert('Erro ao cadastrar coleta: ' + JSON.stringify(error));
    }
  });
}

window.initMap = initMap;

let btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  window.location.href = '../../tela_principal/index.html';
});
