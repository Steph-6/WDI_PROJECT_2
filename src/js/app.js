const googleMap = googleMap || {};
const google    = google;

googleMap.mapSetup = function() {
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.50311,-0.110985),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(canvas, mapOptions);
};


// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     const pos = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     };
//     console.log(pos.lat);
//     googleMap.setCenter(pos);
//   });
// // } else {
// //   alert('please allow location.');
// }
  //   }, function() {
  //     handleLocationError(true, infoWindow, map.getCenter());
  //   });
  // } else {
  //   // Browser doesn't support Geolocation
  //   handleLocationError(false, infoWindow, map.getCenter());
  // }


// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//     'Error: The Geolocation service failed.' :
//     'Error: Your browser doesn\'t support geolocation.');
// }

$(googleMap.mapSetup.bind(googleMap));
