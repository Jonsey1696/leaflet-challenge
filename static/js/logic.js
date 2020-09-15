var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
function displayMap(data){
// create each feature
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
          "</h3><hr><p>" + new Date(feature.properties.time) + 
          "</p><br><p>Magnitude: " + feature.properties.mag);
      }
    
// create Layer
    var earthquakes = L.geoJSON(data, {
        onEachFeature: onEachFeature
    });

// create map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    var myMap = L.map("map", {
        center: [
          0,0
        ],
        zoom: 1,
        layers: [lightmap, earthquakes]
      });
}

d3.json(url, function(response){
    displayMap(response.features)
})