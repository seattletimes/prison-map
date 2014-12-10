/*global L*/

require([
  "esri-leaflet",
  "text!_popup.html",
  "leaflet",
  "lib/component-responsive-frame/build/responsive-child"
], function(ClusterLayer, popupTemplate) {

  var isMobile = window.matchMedia && window.matchMedia("(max-width: 480px)").matches;

  var map = L.map('map', {
    scrollWheelZoom: false
  }).setView([39.8282, -98.5795], isMobile ? 3 : 5);
  L.esri.basemapLayer('Gray').addTo(map);
  L.esri.basemapLayer('GrayLabels').addTo(map);

  var icon = L.divIcon({
    className: 'count-icon',
    iconSize: [15, 15]
  });

  var icons = {
    small: L.divIcon({
      className: 'count-icon1',
      iconSize: [15, 15]
    }),
    medium: L.divIcon({
      className: 'count-icon2',
      iconSize: [16, 16]
    }),
    large: L.divIcon({
      className: 'count-icon3',
      iconSize: [17, 17]
    })
  };

  var icons2 = {
    State: L.divIcon({
      className: 'state',
      iconSize: [15, 15]
    }),
    Federal: L.divIcon({
      className: 'federal',
      iconSize: [15, 15]
    })
  };


  var prisons = L.esri.featureLayer('http://services1.arcgis.com/6blDduqElOPdymTF/arcgis/rest/services/US-prisons/FeatureServer/0', {
    pointToLayer: function (geojson, latlng) {
      return L.marker(latlng, {
        icon: icons2[geojson.properties.type]
      });
    }
  }).addTo(map);


  prisons.bindPopup(function (feature) {
    return L.Util.template(popupTemplate, feature.properties);
  });

  var queryBox = document.querySelector("#query");
  queryBox.querySelector("input").checked = true;

  queryBox.addEventListener('change', function(){
    queryBox.className += " wait";
    var radios = [].slice.call(queryBox.querySelectorAll("input"));
    radios.forEach(function(r) { r.disabled = true });
    var query = [];
    var industry = queryBox.querySelector("input:checked").value;
    for (var i = 1; i <= 5; i++) {
      query.push("industry_tag" + i + " LIKE \"%" + industry + "%\"");
    }
    query = query.join(" OR ");
    setTimeout(function() {
      prisons.setWhere(query, function() {
        radios.forEach(function(r) { r.disabled = false });
        queryBox.className = queryBox.className.replace(/\s?wait\s?/g, "");
      });
    });
  });
  
});





