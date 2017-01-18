"use strict";function checkToken(){App.getToken()?App.loggedIn():App.loggedOut()}function welcomeMessage(){$("#message").html("Hey "+App.currentUser.firstName+" it's")}function showCrimeModal(e){$(".modal-content").html('\n      <div class="modal-body">\n        <button type="button" class="close close-info" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">'+getCrimeInfo(e)+"</h4>\n      </div>\n    ").addClass("info"),$(".modal").modal("show")}function calcRoute(e){e&&e.preventDefault(),clearMarkers();var o=document.getElementById("origin-input").value,t=document.getElementById("destination-input").value,n={origin:o,destination:t,travelMode:"WALKING",provideRouteAlternatives:!0};directionsService.route(n,function(e,o){if("OK"===o){directionsDisplay.setDirections(e);var t=e.routes[0].legs[0];showDirections(t),googleMap.createMarkers({lat:t.start_location.lat(),lng:t.start_location.lng()},"./images/marker.png",new google.maps.Point(22,16),new google.maps.Size(45,45)),googleMap.createMarkers({lat:t.end_location.lat(),lng:t.end_location.lng()},"./images/marker.png",new google.maps.Point(22,16),new google.maps.Size(45,45))}else window.alert("Directions request failed due to "+o)})}function showDirections(e){console.log(e.distance.text),$(".modal-content").html("\n    Distance: "+e.distance.text+"</br>\n    Time: "+e.duration.text+"\n  ").addClass("info").css("padding","20px"),$(".modal").modal("show")}function calcRouteHome(e){e&&e.preventDefault(),clearMarkers();var o=$("#user_location").val(),t=App.currentUser.home,n={origin:o,destination:t,travelMode:"WALKING",provideRouteAlternatives:!0};directionsService.route(n,function(e,o){if("OK"===o){directionsDisplay.setDirections(e);var t=e.routes[0].legs[0];showDirections(t),googleMap.createMarkers({lat:t.start_location.lat(),lng:t.start_location.lng()},"./images/marker.png",new google.maps.Point(22,16),new google.maps.Size(50,50)),googleMap.createMarkers({lat:t.end_location.lat(),lng:t.end_location.lng()},"./images/marker.png",new google.maps.Point(22,16),new google.maps.Size(50,50))}else window.alert("Directions request failed due to "+o)}),$(".modal").modal("hide")}function showInfoModal(){$(".modal-content").html('\n      <div class="modal-header">\n        <button type="button" class="close close-info" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h3 class="modal-title">Welcome to NightMapper</h4>\n      </div>\n      <div class="modal-body">\n        <p>The app designed to make sure you get home safe.</p>\n        <p>Register your home address and get a route home from your location by clicking "Get Home".\n        Each <font style="color:#c59d00"><b>yellow</b></font> glow shows a streetlamp, stick to these road. Try to avoid the <font style="color:#C30005"><b>red</b></font> areas, this is where a crime has taken place in the past month.</p>\n      </div>\n      <div class="modal-footer">\n        <p>Made with ♥ by Steph Robinson</p>\n      </div>\n    ').removeClass("info"),$(".modal").modal("show")}function autocomplete(e){var o=new google.maps.LatLngBounds(new google.maps.LatLng(52.957699,(-1.265336))),t={bounds:o};new google.maps.places.Autocomplete(e,t)}function locate(e){e&&e.preventDefault(),$(".modal-content").html('\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Where are you at the moment?</h4>\n      </div>\n      <div class="modal-body">\n      <form method="post" action="/register" class="usersLocate">\n      <div class="form-group">\n        <input class="form-control" type="text" name="user[location]" id="user_location" placeholder="Starting Point">\n      </div>\n      <button type="submit" class="btn btn-primary btn-modal">Submit</button>\n      <button type="submit" class="btn btn-primary btn-modal btn-locate">Use My Current Location</button>\n      </form>\n    '),$(".modal").modal("show"),autocomplete(document.getElementById("user_location"))}function getLocation(e){e&&e.preventDefault(),window.alert("Can't find your current location."),$(".modal").modal("hide")}function startTime(){var e=new Date,o=e.getHours(),t=e.getMinutes(),n=e.getSeconds();t=checkTime(t),n=checkTime(n),$("#txt").html(o+":"+t+":"+n),setTimeout(startTime,500)}function checkTime(e){return e<10&&(e="0"+e),e}function getCrimeInfo(e){var o=e.category.replace(/-/g," ");o=o.charAt(0).toUpperCase()+o.slice(1);var t=e.month.charAt(5)+e.month.charAt(6);return"01"===t?t="January":"02"===t?t="Febuary":"03"===t?t="March":"04"===t?t="April":"05"===t?t="May":"06"===t?t="June":"07"===t?t="July":"08"===t?t="August":"09"===t?t="September":"10"===t?t="October":"11"===t?t="November":"12"===t&&(t="December"),t="in "+t+" "+e.month.charAt(0)+e.month.charAt(1)+e.month.charAt(2)+e.month.charAt(3)+".",o+", "+t}function clearMarkers(){setMapOnAll(null)}function setMapOnAll(e){for(var o=0;o<markers.length;o++)markers[o].setMap(e)}var googleMap=googleMap||{},google=google,directionsDisplay=void 0,directionsService=new google.maps.DirectionsService,App=App||{},markers=[];googleMap.mapSetup=function(){directionsDisplay=new google.maps.DirectionsRenderer({suppressMarkers:!0,polylineOptions:{strokeColor:"#CDDDDD"}});var e=15,o=document.getElementById("map-canvas"),t=new google.maps.LatLng(52.956163,(-1.159425)),n=google.maps.MapTypeId.ROADMAP;this.map=new google.maps.Map(o,{zoom:e,center:t,mapTypeId:n,zoomControl:!0,scaleControl:!0,disableDefaultUI:!0,styles:[{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:14}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:27},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:14}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#0f2029"},{lightness:17}]}]}),directionsDisplay.setMap(this.map),this.getCrimes(),this.getLights(),autocomplete(document.getElementById("origin-input")),autocomplete(document.getElementById("destination-input")),startTime(),App.init()},App.init=function(){App.url="http://localhost:7000/",$(".directions").on("click",calcRoute),$(".navbar-brand").on("click",showInfoModal),$(".home").on("click",locate),$(".close-info").on("click",welcomeMessage),$(".usersNew").on("click",App.register),$(".usersLogin").on("click",App.login),$(".usersLogout").on("click",App.logout),$("body").on("submit",".usersNew",App.handleRegisterForm),$("body").on("submit",".usersLogin",App.handleLoginForm),$("body").on("submit",".usersLocate",calcRouteHome),$("body").on("click",".btn-locate",getLocation),checkToken()},App.register=function(e){e&&e.preventDefault(),$(".modal-content").html('\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Register</h4>\n      </div>\n      <div class="modal-body">\n      <form method="post" action="/register" class="usersNew">\n        <div class="form-group">\n          <label for="user_name">First Name</label>\n          <input class="form-control" type="text" name="user[firstName]" id="user_firstName" placeholder="First Name">\n        </div>\n        <div class="form-group">\n          <label for="user_lastName">Last Name</label>\n          <input class="form-control" type="text" name="user[lastName]" id="user_lastName" placeholder="Last Name">\n        </div>\n        <div class="form-group">\n          <label for="user_email">Email</label>\n          <input class="form-control" type="text" name="user[email]" id="user_email" placeholder="Email Address">\n        </div>\n        <div class="form-group">\n          <label for="user_home">Home</label>\n          <input class="form-control" type="text" name="user[home]" id="user_home" placeholder="Home Address">\n        </div>\n        <div class="form-group">\n          <label for="user_password">Password</label>\n          <input class="form-control" type="password" name="user[password]" id="user_password" placeholder="Password">\n        </div>\n        <div class="form-group">\n          <label for="user_passwordConfirmation">Password Confirmation</label>\n          <input class="form-control" type="password" name="user[passwordConfirmation]" id="user_passwordConfirmation" placeholder="Password Confirmation">\n        </div>\n          <button type="submit" class="btn btn-primary btn-modal" value="register">Register</button>\n        </form>\n      </div>\n    ').removeClass("info"),$(".modal").modal("show"),autocomplete(document.getElementById("user_home"))},App.handleRegisterForm=function(e){e&&e.preventDefault();var o=$(this).serialize();$.ajax({url:"/register",method:"post",data:o,beforeSend:App.setRequestHeader}).done(function(e){e.token&&App.setToken(e.token),checkToken(),$(".modal").modal("hide")})},App.setRequestHeader=function(e){return e.setRequestHeader("Authorization","Bearer "+App.getToken())},App.setToken=function(e){return window.localStorage.setItem("token",e)},App.getToken=function(){return window.localStorage.getItem("token")},App.removeToken=function(){return window.localStorage.clear()},App.login=function(e){e&&e.preventDefault(),$(".modal-content").html('\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Login</h4>\n      </div>\n      <div class="modal-body">\n      <form method="post" action="/login" class="usersLogin">\n      <div class="form-group">\n        <label for="user_email">Email</label>\n        <input class="form-control" type="text" name="user[email]" id="user_email" placeholder="Email Address">\n      </div>\n      <div class="form-group">\n        <label for="user_password">Password</label>\n        <input class="form-control" type="password" name="user[password]" id="user_password" placeholder="Password">\n      </div>\n      <button type="submit" class="btn btn-primary btn-modal">Login</button>\n      </form>\n    ').removeClass("info"),$(".modal").modal("show")},App.handleLoginForm=function(e){e&&e.preventDefault();var o=$(this).serialize();$.ajax({url:"/login",method:"post",data:o,beforeSend:App.setRequestHeader}).done(function(e){e.token&&App.setToken(e.token),checkToken(),$(".modal").modal("hide")})},App.logout=function(e){e&&e.preventDefault(),App.removeToken(),App.loggedOut()},App.loggedOut=function(){$("#message").hide(),$(".usersLogin").show(),$(".usersNew").show(),$(".usersLogout").hide(),$(".home").hide()},App.loggedIn=function(){var e=App.getToken(),o=e.split(".")[1],t=JSON.parse(window.atob(o)),n=t.userId;$.get("http://localhost:3000/users/"+n).done(function(e){return App.currentUser=e}),$(".usersLogin").hide(),$(".usersNew").hide(),$(".usersLogout").show(),$(".home").show(),welcomeMessage()},googleMap.getLights=function(){$.get("http://localhost:3000/lights").done(function(e){e.forEach(function(e){googleMap.createMarkers(e)})})},googleMap.createMarkers=function(e,o,t,n){var a=google.maps.Marker.MAX_ZINDEX,s=a+1,l=new google.maps.Marker({position:{lat:Number(e.lat),lng:Number(e.lng)},map:this.map,shape:{coords:[17,17,18],type:"circle"},icon:{url:o?o:"/images/Glow8.png",scaledSize:o?n:new google.maps.Size(5,5),origin:new google.maps.Point(0,0),anchor:o?t:new google.maps.Point(0,0),zIndex:o?s:5,optimized:!1}});o&&markers.push(l)},googleMap.getCrimes=function(){var e=this;showInfoModal(),$(".loading").show(),$.get("http://localhost:3000/crimes").done(function(o){o.forEach(function(o){var t=new google.maps.Marker({position:{lat:Number(o.lat),lng:Number(o.lng)},map:e.map,icon:{url:"images/red2.png",scaledSize:new google.maps.Size(10,10),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(0,0)}});e.addInfoWindowForCrime(o,t)})})},googleMap.addInfoWindowForCrime=function(e,o){var t=this;google.maps.event.addListener(o,"click",function(){"undefined"!=typeof t.infoWindow&&t.infoWindow.close(),t.infoWindow=showCrimeModal(e),t.map.setCenter(o.getPosition()),t.map.setZoom(16)})},$(googleMap.mapSetup.bind(googleMap));