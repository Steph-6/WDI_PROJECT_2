const googleMap = googleMap || {};
const google    = google;

googleMap.mapSetup = function() {
  const zoom       = 14;
  const canvas     = document.getElementById('map-canvas');
  const center     = new google.maps.LatLng(52.956163, -1.159425);
  const mapTypeId  = google.maps.MapTypeId.ROADMAP;

  this.map = new google.maps.Map(canvas, {
    zoom,
    center,
    mapTypeId,
    zoomControl: true,
    scaleControl: true,
    minZoom: 13,
    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
  });

  $.get('http://localhost:3000/lights').done(data => {
    data.forEach(light => {
      return new google.maps.Marker({
        position: { lat: Number(light.lat), lng: Number(light.lng) },
        map: this.map,
        icon: {
          url: '/images/Glow1.png',
          scaledSize: new google.maps.Size(5,5),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0,0)
        }
      });
    });
  });

  $.get('http://localhost:3000/crimes').done(data => {
    data.forEach(crime => {
      return new google.maps.Marker({
        position: { lat: Number(crime.lat), lng: Number(crime.lng) },
        map: this.map,
        icon: {
          url: 'images/red2.png',
          scaledSize: new google.maps.Size(10,10),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0,0)
        }
      });
    });

    const defaultBounds     = new google.maps.LatLngBounds(
      new google.maps.LatLng(52.957699,-1.265336),
      new google.maps.LatLng(52.954106,-1.096938)
    );

    const originInput       = document.getElementById('origin-input');
    const destInput         = document.getElementById('destination-input');
    const options           = { bounds: defaultBounds };

    const originAutocomplete = new google.maps.places.Autocomplete(originInput, options);
    const destAutocomplete   = new google.maps.places.Autocomplete(destInput, options);


    // const heatmapData = [new google.maps.LatLng(crime.lat, crime.lng)]
    // const heatmap = new google.maps.visualization.HeatmapLayer({
    //   data: heatmapData
    // });
    // heatmap.setMap(this.map);

  });
};

// function AutocompleteDirectionsHandler(map) {
//   this.map = map;
//   this.originPlaceId = null;
//   this.destinationPlaceId = null;
//   this.travelMode = 'WALKING';
//   var originInput = document.getElementById('origin-input');
//   var destinationInput = document.getElementById('destination-input');
//   var modeSelector = document.getElementById('mode-selector');
//   this.directionsService = new google.maps.DirectionsService;
//   this.directionsDisplay = new google.maps.DirectionsRenderer;
//   this.directionsDisplay.setMap(map);
//
//   var originAutocomplete = new google.maps.places.Autocomplete(
//       originInput, {placeIdOnly: true});
//   var destinationAutocomplete = new google.maps.places.Autocomplete(
//       destinationInput, {placeIdOnly: true}
//   this.setupClickListener('changemode-walking', 'WALKING');
//   this.setupClickListener('changemode-transit', 'TRANSIT');
//   this.setupClickListener('changemode-driving', 'DRIVING'
//   this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
//   this.setupPlaceChangedListener(destinationAutocomplete, 'DEST'
//   this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originIn);
//   this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinatInput);
//   this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSeler);
//
// // Sets a listener on a radio button to change the filter type on Places
// // Autocomplete.
// AutocompleteDirectionsHandler.prototype.setupClickListener = function(imode) {
//   var radioButton = document.getElementById(id);
//   var me = this;
//   radioButton.addEventListener('click', function() {
//     me.travelMode = mode;
//     me.route();
//   });
//
// AutocompleteDirectionsHandler.prototype.setupPlaceChangedListenerfunction(autocomplete, mode) {
//   var me = this;
//   autocomplete.bindTo('bounds', this.map);
//   autocomplete.addListener('place_changed', function() {
//     var place = autocomplete.getPlace();
//     if (!place.place_id) {
//       window.alert("Please select an option from the dropdown list.");
//       return;
//     }
//     if (mode === 'ORIG') {
//       me.originPlaceId = place.place_id;
//     } else {
//       me.destinationPlaceId = place.place_id;
//     }
//     me.route();
//   }
// };
//
// AutocompleteDirectionsHandler.prototype.route = function() {
//   if (!this.originPlaceId || !this.destinationPlaceId) {
//     return;
//   }
//   var me = thi
//   this.directionsService.route({
//     origin: {'placeId': this.originPlaceId},
//     destination: {'placeId': this.destinationPlaceId},
//     travelMode: this.travelMode
//   }, function(response, status) {
//     if (status === 'OK') {
//       me.directionsDisplay.setDirections(response);
//     } else {
//       window.alert('Directions request failed due to ' + status);
//     }
//   });

//bounds is a google.maps.LatLngBounds object specifying the area in which to search for places. The results are biased towards, but not restricted to, places contained within these bounds.
//

$(googleMap.mapSetup.bind(googleMap));
