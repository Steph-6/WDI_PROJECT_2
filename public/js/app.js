"use strict";var googleMap=googleMap||{},google=google;googleMap.mapSetup=function(){var e=this,t=12,l=document.getElementById("map-canvas"),o=new google.maps.LatLng(52.960413,(-1.159421)),s=google.maps.MapTypeId.ROADMAP;this.map=new google.maps.Map(l,{zoom:t,center:o,mapTypeId:s,styles:[{featureType:"all",elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40}]},{featureType:"all",elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{featureType:"all",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:16}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"},{lightness:17}]}]}),$.get("http://localhost:3000/lights").done(function(t){t.forEach(function(t){return new google.maps.Marker({position:{lat:Number(t.lat),lng:Number(t.lng)},map:e.map,icon:{url:"/images/light.png",scaledSize:new google.maps.Size(5,5),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(0,0)}})})}),$.get("http://localhost:3000/crimes").done(function(t){t.forEach(function(t){return new google.maps.Marker({position:{lat:Number(t.lat),lng:Number(t.lng)},map:e.map})})})},$(googleMap.mapSetup.bind(googleMap));