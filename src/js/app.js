const googleMap = googleMap || {};
const google    = google;
let directionsDisplay;
const directionsService = new google.maps.DirectionsService();
const App = App || {};

googleMap.mapSetup  = function() {
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
  const zoom        = 15;
  const canvas      = document.getElementById('map-canvas');
  const center      = new google.maps.LatLng(52.956163, -1.159425);
  const mapTypeId   = google.maps.MapTypeId.ROADMAP;

  this.map = new google.maps.Map(canvas, {
    zoom,
    center,
    mapTypeId,
    zoomControl: true,
    scaleControl: true,
    disableDefaultUI: true,
    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":14}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":27},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":14}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
  });

  directionsDisplay.setMap(this.map);

  this.getCrimes();
  this.getLights();

  autocomplete(document.getElementById('origin-input'));
  autocomplete(document.getElementById('destination-input'));

  startTime();

  App.init();

  // $('.glyphicon-user').toggle(usersNavShow,usersNavHide);
  // $('.road').on('click', showDirections);


  //if there is a token go into the logged in state else go into the logged out state

  // $('body').on('click', '.usersDelete', usersDelete);
  // $('body').on('click', '.usersEdit', usersEdit);
  // $('body').on('submit', '.usersUpdate', usersUpdate);

};

App.init = function(){
  App.url = 'http://localhost:7000/';

  $('.directions').on('click', calcRoute);
  $('.navbar-brand').on('click', showInfoModal);
  $('.home').on('click', locate);

  $('.usersNew').on('click', App.register);
  $('.usersLogin').on('click', App.login);
  $('.usersLogout').on('click', App.logout);
  $('body').on('submit', '.usersNew', App.handleRegisterForm);
  $('body').on('submit', '.usersLogin', App.handleLoginForm);
  $('body').on('submit', '.usersLocate', calcRouteHome);

  if (App.getToken()) {
    App.loggedIn();
  } else {
    App.loggedOut();
  }
};

App.register = function(e){
  if (e) e.preventDefault();
  console.log('new');
  $('.modal-content').html(`
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Register</h4>
      </div>
      <div class="modal-body">
      <form method="post" action="/register" class="usersNew">
        <div class="form-group">
          <label for="user_name">First Name</label>
          <input class="form-control" type="text" name="user[firstName]" id="user_firstName" placeholder="First Name">
        </div>
        <div class="form-group">
          <label for="user_lastName">Last Name</label>
          <input class="form-control" type="text" name="user[lastName]" id="user_lastName" placeholder="Last Name">
        </div>
        <div class="form-group">
          <label for="user_email">Email</label>
          <input class="form-control" type="text" name="user[email]" id="user_email" placeholder="Email Address">
        </div>
        <div class="form-group">
          <label for="user_home">Home</label>
          <input class="form-control" type="text" name="user[home]" id="user_home" placeholder="Home Address">
        </div>
        <div class="form-group">
          <label for="user_password">Password</label>
          <input class="form-control" type="password" name="user[password]" id="user_password" placeholder="Password">
        </div>
        <div class="form-group">
          <label for="user_passwordConfirmation">Password Confirmation</label>
          <input class="form-control" type="password" name="user[passwordConfirmation]" id="user_passwordConfirmation" placeholder="Password Confirmation">
        </div>
          <button type="submit" class="btn btn-primary btn-modal" value="register">Register</button>
        </form>
      </div>
    `);
  $('.modal').modal('show');
  autocomplete(document.getElementById('user_home'));
};

App.handleRegisterForm = function(e){
  console.log('submitted');
  if (e) e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    url: '/register',
    method: 'post',
    data,
    beforeSend: App.setRequestHeader
  }).done((data) => {
    if (data.token) App.setToken(data.token);
    App.loggedIn();
    $('.modal').modal('hide');
  });
};

App.setRequestHeader = function(xhr) {
  return xhr.setRequestHeader('Authorization', `Bearer ${App.getToken()}`);
};

App.setToken         = function(token){
  return window.localStorage.setItem('token', token);
};

App.getToken         = function(){
  return window.localStorage.getItem('token');
};

App.removeToken      = function(){
  return window.localStorage.clear();
};

App.login = function(e){
  if (e) e.preventDefault();
  $('.modal-content').html(`
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Login</h4>
      </div>
      <div class="modal-body">
      <form method="post" action="/login" class="usersLogin">
      <div class="form-group">
        <label for="user_email">Email</label>
        <input class="form-control" type="text" name="user[email]" id="user_email" placeholder="Email Address">
      </div>
      <div class="form-group">
        <label for="user_password">Password</label>
        <input class="form-control" type="password" name="user[password]" id="user_password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary btn-modal">Login</button>
      </form>
    `);
  $('.modal').modal('show');
};

App.handleLoginForm = function(e){
  if (e) e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    url: '/login',
    method: 'post',
    data,
    beforeSend: App.setRequestHeader
  }).done((data) => {
    if (data.token) App.setToken(data.token);
    App.loggedIn();
    $('.modal').modal('hide');
  });
};

App.logout = function(e){
  if (e) e.preventDefault();
  App.removeToken();
  App.loggedOut();
};

App.loggedOut = function(){
  $('#message').hide();
  $('.usersLogin').show();
  $('.usersNew').show();
  $('.usersLogout').hide();
  $('.home').hide();
  showInfoModal();
};

App.loggedIn = function(){
  //change glyphicon-user to username and 'it's'...
  // $('#message').html(`Welcome ${firstName}, it's`);
  $('.usersLogin').hide();
  $('.usersNew').hide();
  $('.usersLogout').show();
  $('.home').show();
};

googleMap.getLights   = function() {
  $.get('http://localhost:3000/lights').done(data => {
    data.forEach(light => {
      googleMap.createMarkers(light);
      //this.addHover(light, lightMarker);
    });
  });
};

googleMap.createMarkers = function(light, icon) {
  new google.maps.Marker({
    position: { lat: Number(light.lat), lng: Number(light.lng) },
    map: this.map,
    icon: {
      url: icon ? icon : '/images/Glow8.png',
      scaledSize: icon ? new google.maps.Size(60,40) : new google.maps.Size(5,5),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0,0)
    }
  });
};

googleMap.getCrimes = function() {
  $.get('http://localhost:3000/crimes').done(data => {
    data.forEach(crime => {
      const crimeMarker = new google.maps.Marker({
        position: { lat: Number(crime.lat), lng: Number(crime.lng) },
        map: this.map,
        icon: {
          url: 'images/red2.png',
          scaledSize: new google.maps.Size(10,10),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0,0)
        }
      });
      this.addInfoWindowForCrime(crime, crimeMarker);
    });
  });
};

googleMap.addInfoWindowForCrime = function(crime, crimeMarker) {
  google.maps.event.addListener(crimeMarker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content: getCrimeInfo(crime)
    });

    this.infoWindow.open(this.map, crimeMarker);
    this.map.setCenter(crimeMarker.getPosition());
    this.map.setZoom(16);
  });
};

function calcRoute(e) {
  if (e) e.preventDefault();
  const start = document.getElementById('origin-input').value;
  const end = document.getElementById('destination-input').value;
  const request = {
    origin: start,
    destination: end,
    travelMode: 'WALKING',
    provideRouteAlternatives: true
  };
  directionsService.route(request, function(result, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(result);
      const leg = result.routes[0].legs[0];
      googleMap.createMarkers({
        lat: leg.start_location.lat(),
        lng: leg.start_location.lng()
      }, './images/person2.png');
      googleMap.createMarkers({
        lat: leg.end_location.lat(),
        lng: leg.end_location.lng()
      }, './images/home.png');
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function calcRouteHome(e) {
  if (e) e.preventDefault();
  const start = $('#user_location').val();
  const end = 'Arboretum Street, Nottingham, United Kingdom';
  console.log();
  const request = {
    origin: start,
    destination: end,
    travelMode: 'WALKING',
    provideRouteAlternatives: true
  };
  directionsService.route(request, function(result, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(result);
      const leg = result.routes[0].legs[0];
      googleMap.createMarkers({
        lat: leg.start_location.lat(),
        lng: leg.start_location.lng()
      }, './images/person2.png');
      googleMap.createMarkers({
        lat: leg.end_location.lat(),
        lng: leg.end_location.lng()
      }, './images/home.png');
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
  $('.modal').modal('hide');
}

function showInfoModal() {
  $('.modal-content').html(`
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h3 class="modal-title">Info</h4>
      </div>
      <div class="modal-body">
        <h4>Welcome to NightMapper</h4>
        <p>The app designed to make sure you get home safe.</p>
        <p>Register your home address and get a route home from your location by clicking "Get Home".
        Each yellow glow shows a streetlamp, stick to these roads, but try and avoid the red areas. This is where a crime has taken place in the past month.</p>
      </div>
      <div class="modal-footer">
        <p>Made with ♥ by Steph Robinson.</p>
      </div>
    `);
  $('.modal').modal('show');
}

function autocomplete(input){
  const defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(52.957699,-1.265336));
  const options       = { bounds: defaultBounds };
  new google.maps.places.Autocomplete(input, options);
}

$(googleMap.mapSetup.bind(googleMap));

function startTime() {
  const today = new Date();
  const h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  $('#txt').html(h + ':' + m + ':' + s);
  setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

const getCrimeInfo = function(crime) {
  let cat   = crime.category.replace(/-/g,' ');
  cat = cat.charAt(0).toUpperCase() + cat.slice(1);
  let month = crime.month.charAt(5) + crime.month.charAt(6);
  //neaten in an array
  if (month === '01') {
    month = 'January';
  } else if (month === '02') {
    month = 'Febuary';
  } else if (month === '03') {
    month = 'March';
  } else if (month === '04') {
    month = 'April';
  } else if (month === '05') {
    month = 'May';
  } else if (month === '06') {
    month = 'June';
  } else if (month === '07') {
    month = 'July';
  } else if (month === '08') {
    month = 'August';
  } else if (month === '09') {
    month = 'September';
  } else if (month === '10') {
    month = 'October';
  } else if (month === '11') {
    month = 'November';
  } else if (month === '12') {
    month = 'December';
  }
  month = 'in ' + month + ' ' + crime.month.charAt(0) + crime.month.charAt(1) + crime.month.charAt(2) + crime.month.charAt(3) + '.';
  return `<div id='info'>${cat}, ${month}</div>`;
};

function locate(e) {
  if (e) e.preventDefault();
  $('.modal-content').html(`
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Where are you at the moment?</h4>
      </div>
      <div class="modal-body">
      <form method="post" action="/register" class="usersLocate">
      <div class="form-group">
        <input class="form-control" type="text" name="user[location]" id="user_location" placeholder="Current Location">
      </div>
      <button type="submit" class="btn btn-primary btn-modal">Submit</button>
      </form>
    `);
  $('.modal').modal('show');
  autocomplete(document.getElementById('user_location'));
  // const GeoMarker = new GeolocationMarker(googleMap);
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     const latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //     googleMap.setZoom(19);
  //     // googleMap.setCenter(latlng);
  //   });
  // } else {
  //   // Browser doesn't support Geolocation
  //   console.log('failed to get location');
  // }

}

// App.ajaxRequest = function(url, method, data, callback){
//   return $.ajax({
//     url,
//     method,
//     data,
//     beforeSend: App.setRequestHeader
//   })
//   .done(callback);
// };

// draw my route
// googleMap.addHover = function(light, lightMarker) {
//   google.maps.event.addListener(lightMarker, 'mouseover', () => {
//     lightMarker = new google.maps.Marker({
//       position: { lat: Number(light.lat), lng: Number(light.lng) },
//       map: this.map,
//       icon: {
//         url: '/images/Glow8.png',
//         scaledSize: new google.maps.Size(7,7),
//         origin: new google.maps.Point(0,0),
//         anchor: new google.maps.Point(0,0)
//       }
//     });
//   });
// };

  // setTimeout(function() {
  //   lightMarker = new google.maps.Marker({
  //     position: { lat: Number(light.lat), lng: Number(light.lng) },
  //     map: this.map,
  //     icon: {
  //       url: '/images/Glow10.png',
  //       scaledSize: new google.maps.Size(5,5),
  //       origin: new google.maps.Point(0,0),
  //       anchor: new google.maps.Point(0,0)
  //     }
  //   });
  // }, 200);

  // google.maps.event.addListener(lightMarker, 'mouseleave', () => {
  //   lightMarker = new google.maps.Marker({
  //     position: { lat: Number(light.lat), lng: Number(light.lng) },
  //     map: this.map,
  //     icon: {
  //       url: '/images/Glow2.png',
  //       scaledSize: new google.maps.Size(5,5),
  //       origin: new google.maps.Point(0,0),
  //       anchor: new google.maps.Point(0,0)
  //     }
  //   });
  // });
