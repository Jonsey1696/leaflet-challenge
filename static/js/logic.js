var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
function displayMap(data){
// create each feature
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
          "</h3><hr><p>" + new Date(feature.properties.time) + 
          "</p><br><p>Magnitude: " + feature.properties.mag+"</p>");
      }

    function createCircles(feature){
            var color= ""
            var mag=feature.properties.mag

            if (mag >5){
                color='#FF0000';
            }
            else if (mag > 4){
                color = '#FF6600';
            }
            else if (mag > 3){
                color= '#FF9900';
            }
            else if (mag > 2){
                color = '#FFCC00';
            }
            else if (mag >1){
                color = '#00FF00';
            }
            else {
                color = '#99CC00';
            }
        var geojsonMarkerOptions = {
            radius: mag * 3,
            fillColor: color,
            color: color,
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
        return L.circleMarker([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], geojsonMarkerOptions);
    }
    
// create Layer
    var earthquakes = L.geoJSON(data, {
        onEachFeature: onEachFeature,
        pointToLayer: createCircles
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