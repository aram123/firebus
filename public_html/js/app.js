$(function() {


    var map;
    var latitud;
    var longitud;
    var precision;
    var des_lat;
    var des_lon;
    var  image = 'http://www.adiumxtras.com/images/thumbs/link_snes_1_12709_4630_thumb.png';
    var imageFin = 'http://rick.jinlabs.com/tango/triforce/32x32/triforce.png';
    localizame();


    function localizame() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(coordenadas, errores);
        } else {
            alert('Oops! Tu navegador no soporta geolocalización. Bájate Chrome, que es gratis!');
        }
    }

    function coordenadas(position) {
        latitud = position.coords.latitude;
        longitud = position.coords.longitude;
        precision = position.coords.accuracy;
        calcRoute();
    }

    function errores(err) {
        if (err.code == 0) {
            alert("Oops! Algo ha salido mal");
        }
        if (err.code == 1) {
            alert("Oops! No has aceptado compartir tu posición");
        }
        if (err.code == 2) {
            alert("Oops! No se puede obtener la posición actual");
        }
        if (err.code == 3) {
            alert("Oops! Hemos superado el tiempo de espera");
        }
    }



    var rendererOptions = {
//        draggable: true
    };

    var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    ;
    var directionsService = new google.maps.DirectionsService();
    var map;

   // var des = new google.maps.LatLng(28.655283, -106.070133);


    function calcRoute() {
        
         var des = new google.maps.LatLng(latitud,longitud);
         var mapOptions = {
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: des,
            streetViewControl: false
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        directionsDisplay.setMap(map);


       
        var myLatLng = new google.maps.LatLng(latitud,longitud);
        var beachMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });

        google.maps.event.addListener(map, 'click', function(e) {
            des_lat = e.latLng.ob
            des_lon = e.latLng.pb
            console.log(des_lat+' , '+des_lon)
            var r = confirm('Agregar un punto')
                    if(r===true){
                       calcRoute()
                       drawPoint(map, image, des_lat, des_lon)
                    }
        })
        
        var request = {
            origin: latitud + ',' + longitud,
            destination: des_lat + ',' + des_lon,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }

    function drawPoint(map, image, x, y) {
        var myLatLng = new google.maps.LatLng(x, y);
        var beachMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: imageFin
        });
    }

    //google.maps.event.addDomListener(window, 'load', initialize);



//    $("#get-battery").click(function() {
//        $("#battery-pct").text(Math.round(navigator.battery.level * 100) + "%");
//    });
});