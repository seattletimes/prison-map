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

 var prisons = L.esri.clusteredFeatureLayer('http://services1.arcgis.com/6blDduqElOPdymTF/arcgis/rest/services/st-pris/FeatureServer/0', {
   pointToLayer: function (geojson, latlng) {
      return L.marker(latlng, {
        icon: icons
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

    prisons.bindPopup(function (feature) {
    return L.Util.template('<div class="bigheader">{Prison_name}</div><div style="padding:5px;"><strong>{City}, {state}</strong></div><div class="lilheader">Industries</div><div>{industry_1}, {industry_2}, {industry_3}, {industry_4}, {industry_5}, {industry_6}, {industry_7}, {industry_8}</div>', feature.properties);
  });

    var industry = document.getElementById('industry');

  industry.addEventListener('change', function(){
    prisons.setWhere('industry_1 LIKE "%'+industry.value+'%" OR industry_2 LIKE "%'+industry.value+'%" OR industry_3 LIKE "%'+industry.value+'%" OR industry_4 LIKE "%'+industry.value+'%" OR industry_5 LIKE "%'+industry.value+'%" OR industry_6 LIKE "%'+industry.value+'%" OR industry_7 LIKE "%'+industry.value+'%" OR industry_8 LIKE "%'+industry.value+'%" OR industry_9 LIKE "%'+industry.value+'%"');
    console.log('industry_1="'+industry.value+'"')
  });






