require([
  //load root dependencies from here

    "leaflet",
   "lib/esri-leaflet/dist/esri-leaflet",
   "lib/leaflet.markercluster/dist/leaflet.markercluster",
    "lib/esri-leaflet-clustered-feature-layer/src/ClusteredFeatureLayer",

], function() {
  
  // Code kicks off here
  
});


var map = L.map('map').setView([39.8282, -98.5795], 5);
    L.esri.basemapLayer('Gray').addTo(map);
    L.esri.basemapLayer('GrayLabels').addTo(map);

 L.esri.clusteredFeatureLayer('http://services1.arcgis.com/6blDduqElOPdymTF/arcgis/rest/services/st-pris/FeatureServer/0', {
   pointToLayer: function (geojson, latlng) {
      return L.marker(latlng, {
        icon: icons
      });
    },
  }).addTo(map);




  // var prisons = L.esri.featureLayer('http://services1.arcgis.com/6blDduqElOPdymTF/arcgis/rest/services/st-pris/FeatureServer/0', {
  //  pointToLayer: function (geojson, latlng) {
  //     return L.marker(latlng, {
  //       icon: icons
  //     });
  //   },
  // }).addTo(map);

 


  icons = L.divIcon({
  	 className: 'count-icon',
  	 iconSize: [15, 15]
  });

  //   prisons.bindPopup(function (feature) {
  //   return L.Util.template('<div class="bigheader">{Prison_name}</div><div style="padding:5px;"><strong>{City}, {state}</strong></div><div class="lilheader">Industries</div><div>{industry_1}<br>{industry_2}<br>{industry_3}<br>{industry_4}<br>{industry_5}<br>{industry_6}<br>{industry_7}<br>{industry_8}</div>', feature.properties);
  // });

  //   var industry = document.getElementById('industry');

  // industry.addEventListener('change', function(){
  //   prisons.setWhere('industry_1="'+industry.value+'"');
  // });
