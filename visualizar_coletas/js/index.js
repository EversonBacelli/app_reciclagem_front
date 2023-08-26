let directionsService, directionsRenderer, userLocation;

function getColorByType(tipo_lixo) {
  const typeColorMap = {
      'Papel': 'blue',
      'Plastico': 'red',
      'Metal': 'yellow',
      'Vidro': 'green'
  };
  return typeColorMap[tipo_lixo] || 'black';
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, origin, destination) {
  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

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

      directionsService = new google.maps.DirectionsService();
      directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      $.ajax({
        url: 'http://localhost:8080/coletas/locais',
        type: 'GET',
        success: function(response) {
          const coletas = response;
          for (const coleta of coletas) {
            const location = { lat: parseFloat(coleta.latitude), lng: parseFloat(coleta.longitude) };
            const color = getColorByType(coleta.tipo_lixo);
            
            const marker = new google.maps.Marker({
              position: location,
              map: map,
              title: 'Coleta para ser retirada',
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png",
              }
            });

            const infowindow = new google.maps.InfoWindow({
              content: `<p>Coleta para ser retirada aqui. Data: ${coleta.data}, Turno: ${coleta.turno}, Quantidade: ${coleta.quantidade}</p>
                        <button onclick="calculateAndDisplayRoute(directionsService, directionsRenderer, userLocation, new google.maps.LatLng(${location.lat}, ${location.lng}))">Traçar Rota</button>`
            });

            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });
          }
        },
        error: function(error) {
          console.log('Erro ao obter locais de coleta:', error);
        }
      });
    });
  } else {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.749933, lng: -73.98633 },
      zoom: 13
    });
  }
}

window.initMap = initMap;

let btn_voltar = document.querySelector('.btn')

btn_voltar.addEventListener('click', () => {
    window.location.href = '../../tela_principal/index.html'
});
