/*global L*/

require([
  "lib/esri-leaflet-clustered-feature-layer/dist/esri-leaflet-clustered-feature-layer-src",
  "lib/leaflet.markercluster/dist/leaflet.markercluster",
  "lib/component-responsive-frame/build/responsive-child"
], function(ClusterLayer) {

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

  // var prisons = L.esri.featureLayer(
  //   'http://services1.arcgis.com/6blDduqElOPdymTF/arcgis/rest/services/st-pris/FeatureServer/0', {
  //   pointToLayer: function (geojson, latlng) {
  //     return L.marker(latlng, {
  //       icon: icons
  //     });
  //   },
  // }).addTo(map);

  prisons.bindPopup(function (feature) {
    return L.Util.template('<div class="bigheader">{Prison_name}</div><div style="padding:5px;"><strong>{City}, {state}</strong></div><div class="lilheader">Industries</div><div>{Industries}</div>', feature.properties);
  });

  var industry = document.getElementById('industry');

  industry.addEventListener('change', function(){
    prisons.setWhere('industry_tag1 LIKE "%'+industry.value+'%" OR industry_tag2 LIKE "%'+industry.value+'%" OR industry_tag3 LIKE "%'+industry.value+'%" OR industry_tag4 LIKE "%'+industry.value+'%" OR industry_tag5 LIKE "%'+industry.value+'%"');
  });

  // industry.addEventListener('change', function(){
  //   prisons.setWhere( 'Industries LIKE "%'+industry.value+'%"');
  //   console.log('industry_1="'+industry.value+'"')
  // });
  
});





