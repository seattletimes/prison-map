/*global L*/

require([
  "lib/esri-leaflet-clustered-feature-layer/src/ClusteredFeatureLayer",
  "text!_popup.html",
  "lib/leaflet.markercluster/dist/leaflet.markercluster",
  "lib/component-responsive-frame/build/responsive-child"
], function(ClusterLayer, popupTemplate) {

  var map = L.map('map').setView([39.8282, -98.5795], 5);
  L.esri.basemapLayer('Gray').addTo(map);
  L.esri.basemapLayer('GrayLabels').addTo(map);

  var icon = L.divIcon({
    className: 'count-icon',
    iconSize: [15, 15]
  });

  var prisons = new ClusterLayer(
    'http://services1.arcgis.com/6blDduqElOPdymTF/arcgis/rest/services/prisons-updated2/FeatureServer/0', {
    pointToLayer: function (geojson, latlng) {
      return L.marker(latlng, {
        icon: icon
      });
    },
    // disableClusteringAtZoom: 8,
    polygonOptions: {
      color: '#ffffff',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.5
    },
    maxClusterRadius:50
  }).addTo(map);

  prisons.bindPopup(function (feature) {
    return L.Util.template(popupTemplate, feature.properties);
  });

  var queryBox = document.querySelector("#query");
  var industry = document.getElementById('industry');
  industry.value = "";

  industry.addEventListener('change', function(){
    queryBox.className += " wait";
    industry.disabled = true;
    var query = [];
    for (var i = 1; i <= 5; i++) {
      query.push("industry_tag" + i + " LIKE \"%" + industry.value + "%\"");
    }
    query = query.join(" OR ");
    setTimeout(function() {
      prisons.setWhere(query, function() {
        industry.disabled = false;
        queryBox.className = queryBox.className.replace(/\s?wait\s?/g, "");
      });
    });
  });
  
});





