document.addEventListener("DOMContentLoaded", (e) => {
    const map = L.map('map').setView([51.505, -0.09], 15);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoia2xhdWRpYTk1MTciLCJhIjoiY2p1dmR4cWI0MDBuZzQ1cXA3bXc4bDNieSJ9.wcN0dGelYy4-QQ9aIiBpTQ'
    }).addTo(map);

    let markers = new Array();
    let counter = 0;
    let tbody = document.querySelector('tbody');

    map.addEventListener('click', (e) => {
        counter++;
        let marker = new L.Marker(e.latlng, {
            draggable: true
        });
        map.addLayer(marker);
        markers[marker._leaflet_id] = marker;

        let tr = document.createElement('tr');
        tr.dataset.leaflet_id = marker._leaflet_id;
        tr.innerHTML = '<th scope="row">' + counter + '</th>' + '<td class="latitude">' + marker._latlng.lat + '</td>' + '<td class="longitude">' + marker._latlng.lng + '</td>';
        tbody.appendChild(tr);

        marker.addEventListener('dragend', function(e) {
            let tr = document.querySelector("tr[data-leaflet_id='" + this._leaflet_id + "']");
            tr.querySelector('.latitude').innerHTML = markers[marker._leaflet_id].getLatLng().lat;
            tr.querySelector('.longitude').innerHTML = markers[marker._leaflet_id].getLatLng().lng;
        });
    });

});
