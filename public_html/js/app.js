$(function() {

    var busStop = {
        "0": {
            'ruta': 1,
            'coor': "28.635213971444706 , -106.08183860778809",
            'nombre': "Parque heroes",
            'esPa': 1,
        },
        "1": {
            'ruta': 1,
            'coor': "28.637794081866083 , -106.0791563987732",
            'nombre': "Centro",
            'esPa': 1,
        },
        "2": {
            'ruta': 1,
            'coor': "28.64474311478968 , -106.07177495956421",
            'nombre': "",
            'esPa': 0,
        },
        "3": {
            'ruta': 1,
            'coor': "28.645703514027513 , -106.0741138458252",
            'nombre': "Trancito",
            'esPa': 1,
        },
        "4": {
            'ruta': 1,
            'coor': "28.641391064232934 , -106.07761144638062",
            'nombre': "",
            'esPa': 0,
        },
        "5": {
            'ruta': 1,
            'coor': "28.63193695142568 , -106.08338356018066",
            'nombre': "Puente",
            'esPa': 1,
        }
    };

    var map;
    var latitud;
    var longitud;
    var precision;
    var des_lat;
    var des_lon;
    var image = 'http://www.adiumxtras.com/images/thumbs/link_snes_1_12709_4630_thumb.png';
    var imageFin = 'http://rick.jinlabs.com/tango/triforce/32x32/triforce.png';
    var origin1;
    var origin2;
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
        mapdraw();
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


    function mapdraw() {

        var des = new google.maps.LatLng(latitud, longitud);
        var mapOptions = {
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: des,
            streetViewControl: false
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        directionsDisplay.setMap(map);



        var myLatLng = new google.maps.LatLng(latitud, longitud);
        var beachMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });

        google.maps.event.addListener(map, 'click', function(e) {
            des_lat = e.latLng.ob
            des_lon = e.latLng.pb
            console.log(des_lat + ' , ' + des_lon)
            var r = confirm('Agregar un punto')
            if (r === true) {
                calcRoute();
                drawPoint(map, image, des_lat, des_lon);
                
                origin1 = new google.maps.LatLng(latitud, longitud);
                origin2 = new google.maps.LatLng(des_lat, des_lon);
                calculateDistances(origin1, origin2);
            }
        })
    }
    
function calculateDistances(destinationA, destinationB) {
  var service = new google.maps.DistanceMatrixService();
  
  service.getDistanceMatrix(
    {
      origins: [destinationA],
      destinations: [destinationB],
      travelMode: google.maps.TravelMode.WALKING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, callback);
}

function callback(response, status) {
  console.log(response.rows[0].elements[0].distance.text);
  return response.rows[0].elements[0].distance.text;
}
    
    function calcRoute() {
        var request = {
            origin: latitud + ',' + longitud,
            destination: des_lat + ',' + des_lon,
            waypoints: [{location: '28.635213971444706,-106.08183860778809'},
                {location: "28.637794081866083 , -106.0791563987732"},
                {location: "28.64125923983104 , -106.07537984848022"},
                {location: "28.64366971700008 , -106.07286930084229"}],
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                console.log('direction setted');
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


    function calculateDistances() {

            var glatlng1 = new GLatLng(latitud + ',' + longitud);
            var glatlng2 = new GLatLng( "28.637794081866083 , -106.0791563987732");
            var miledistance = glatlng1.distanceFrom(glatlng2, 3959).toFixed(1);
            var kmdistance = (miledistance * 1.609344).toFixed(1);
            alert(kmdistance);
        
    }

    google.maps.event.addDomListener(window, 'load', mapdraw);



//    $("#get-battery").click(function() {
//        $("#battery-pct").text(Math.round(navigator.battery.level * 100) + "%");
//    });
});
