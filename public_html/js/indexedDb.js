
var db;
var initDb = false;

function indexedDBOk() {
    return "indexedDB" in window;
}

document.addEventListener("DOMContentLoaded", function() {

    //No support? Go in the corner and pout.
    if (!indexedDBOk)
        return;

    var openRequest = indexedDB.open("bustoppppp", 6);

    openRequest.onupgradeneeded = function(e) {
        var thisDB = e.target.result;
        
        if (!thisDB.objectStoreNames.contains("busstop")) {
            var os = thisDB.createObjectStore("busstop", {autoIncrement: true});
            //index on bus stop name
            os.createIndex("bus_stop_name", "bus_stop_name", {unique: false});
            os.createIndex("origin", "origin", {unique: false});
            os.createIndex("destination", "destination", {unique: false});
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

function fillBusStop(){
    console.log('maybe false...');
    if(initDb){
        console.log('true!');
        addBusStop('nf', 'heroes', 'heroes1');
        addBusStop('nf', 'dah', 'duh');   
    }
}

function addBusStop(busStopName, origin, destination) {
    console.log("Añadiendo " + busStopName+ " " + origin + " " + destination + "...");

    //Get a transaction
    //default for OS list is all, default for type is read
    var transaction = db.transaction(["busstop"], "readwrite");
    //Ask for the objectStore
    var store = transaction.objectStore("busstop");

    //Define a person
    var busStopObj = {
        'bus_stop_name': busStopName,
        'origin': origin,
        'destination': destination
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