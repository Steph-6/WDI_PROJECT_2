const googleMap = googleMap || {};
const google    = google;

googleMap.mapSetup = function() {
  const zoom       = 12;
  const canvas     = document.getElementById('map-canvas');
  const center     = new google.maps.LatLng(52.960413, -1.159421);
  const mapTypeId  = google.maps.MapTypeId.ROADMAP;

  this.map = new google.maps.Map(canvas, {
    zoom,
    center,
    mapTypeId,
    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
  });

  $.get('http://localhost:3000/lights').done(data => {
    data.forEach(light => {
      return new google.maps.Marker({
        position: { lat: Number(light.lat), lng: Number(light.lng) },
        map: this.map,
        icon: {
          url: '/images/light.png',
          scaledSize: new google.maps.Size(5,5), // scaled size
          origin: new google.maps.Point(0,0),       // origin
          anchor: new google.maps.Point(0,0)       // anchor
        }
      });
    });
  });

  $.get('http://localhost:3000/crimes').done(data => {
    data.forEach(crime => {
      return new google.maps.Marker({
        position: { lat: Number(crime.lat), lng: Number(crime.lng) },
        map: this.map,
        // icon: {
        //   url: '/images/light.png',
        //   scaledSize: new google.maps.Size(5,5), // scaled size
        //   origin: new google.maps.Point(0,0),       // origin
        //   anchor: new google.maps.Point(0,0)       // anchor
        // }
      });
    });
  });
};

$(googleMap.mapSetup.bind(googleMap));
