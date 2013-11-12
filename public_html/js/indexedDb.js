
var db;
var initDb = false;

function indexedDBOk() {
    return "indexedDB" in window;
}

document.addEventListener("DOMContentLoaded", function() {

    //No support? Go in the corner and pout.
    if (!indexedDBOk)
        return;

    var openRequest = indexedDB.open("bustoppppppppp", 10);

    openRequest.onupgradeneeded = function(e) {
        var thisDB = e.target.result;
        
        if (!thisDB.objectStoreNames.contains("busstop")) {
            var os = thisDB.createObjectStore("busstop", {autoIncrement: true});
            //index on bus stop name
            os.createIndex("route", "route", {unique: false});
            os.createIndex("origin", "origin", {unique: false});
            os.createIndex("is_station", "is_station", {unique: false});
            os.createIndex("bus_stop_name", "bus_stop_name", {unique: false});
            os.createIndex("consecutive", "consecutive", {unique: false});
        }
        initDb = true;
    }

    openRequest.onsuccess = function(e) {

        db = e.target.result;

    }

    openRequest.onerror = function(e) {
        //Do something for the error
    }

}, false);
/**
["28.635213971444706 , -106.08183860778809","28.637794081866083 , -106.0791563987732",
"28.64125923983104 , -106.07537984848022","28.64366971700008 , -106.07286930084229",
"28.64474311478968 , -106.07177495956421","28.64474311478968 , -106.07177495956421",
"28.645703514027513 , -106.0741138458252", "28.64357555877523 , -106.07542276382446",
"28.641391064232934 , -106.07761144638062","28.639752663474074 , -106.08357667922974",
"28.637605754784676 , -106.08525037765503","28.633330639112042 , -106.0834264755249",
"28.63193695142568 , -106.08338356018066"
]
**/
function fillBusStop(){
    console.log('maybe false...');
    if(initDb){
        console.log('true!');
        addBusStop(1, "28.635213971444706 , -106.08183860778809", "Parque heroes",1,1);
        addBusStop(1, "28.637794081866083 , -106.0791563987732", "Centro",1,2);
        addBusStop(1, "28.64125923983104 , -106.07537984848022", "Centro",1,3);
         addBusStop(1, "28.64366971700008 , -106.07286930084229", "Centro",1,4);
          addBusStop(1, "28.64474311478968 , -106.07177495956421", "",0,5);
           addBusStop(1, "28.646381437606834 , -106.07381343841553", "",0,6);
            addBusStop(1, "28.645703514027513 , -106.0741138458252", "trancito",0,7);
             addBusStop(1, "28.64357555877523 , -106.07542276382446", "Trebol",1,8);
              addBusStop(1, "28.641391064232934 , -106.07761144638062", "",0,9);
               addBusStop(1, "28.639752663474074 , -106.08357667922974", "Palomar",1,10);
               addBusStop(1, "28.637605754784676 , -106.08525037765503", "",0,11);
               addBusStop(1, "28.633330639112042 , -106.0834264755249", "",0,12);
               addBusStop(1, "28.63193695142568 , -106.08338356018066", "Puente",1,13);
        
        initDB = false;
    }
}

function addBusStop(route, origin, is_station, bus_stop_name, consecutive) {
    console.log("Añadiendo " + route+ " " + origin + " " + is_station + " " + bus_stop_name + " " + consecutive + "...");
    

    //Get a transaction
    //default for OS list is all, default for type is read
    var transaction = db.transaction(["busstop"], "readwrite");
    //Ask for the objectStore
    var store = transaction.objectStore("busstop");

    //Define a person
    var busStopObj = {
        'route' : route, 
        'origin' : origin,
        'is_station' : is_station,
        'bus_stop_name' : bus_stop_name,
        'consecutive' : consecutive
    }

    //Perform the add
    var request = store.add(busStopObj);

    request.onerror = function(e) {
        alert("oops..");
        console.log("Error", e.target.error.name);
        console.dir(e.target);
        //some type of error handler
    }

    request.onsuccess = function(e) {
        console.log("exito");
    }
}

function getAllBussStop() {

    var transaction = db.transaction(["busstop"], "readonly");
    var store = transaction.objectStore("busstop");
    var index = store.index("bus_stop_name");

    
    var range = IDBKeyRange.lowerBound(0);
    var s = "";
    window.result = [];
    index.openCursor(range).onsuccess = function(e) {
        var cursor = e.target.result;
        if (cursor) {
            var currentObj = [];
            for (var field in cursor.value) {
                currentObj.push(cursor.value[field]);
            }
            window.result.push(currentObj);
            cursor.continue();
        }
        $.each(window.result,function(f, elem){
                $.each(elem, function(index, value){
                    console.log(value);
                }); 
            });        
    }
}

function logBusStops() {
    fillBusStop();
    getAllBussStop(); 
}