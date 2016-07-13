var floor_num;
var streetid;
var coordinateid;
var buildingid;


function saveMarker() {
    var building_elements = document.getElementById('building');
    var building_name = building_elements.elements[0].value;
    floor_num = building_elements.elements[1].value;
    var street = building_elements.elements[2].value;
    var building_num = building_elements.elements[3].value;
    var building_block = building_elements.elements[4].value;
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();


    var streetPromise = Promise.resolve(createStreet({
        name: street
    })).then(function (result) {
        var parsedResult = /0\. Street with id=(\d+) was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('street creation failed');
        }
    }).catch(creationFailed);


    var coordinatePromise = Promise.resolve(createCoordinate({
        latitude: lat,
        longitude: lng
    })).then(function (result) {
        var parsedResult = /0\. Coordinate with id=(\d+) was successfully created/.exec(result);

        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('street creation failed');
        }
    }).catch(creationFailed);


    function creationFailed(e) {
        console.error('something went wrong', e);
    }

    Promise.all([streetPromise, coordinatePromise]).then(function (values) {
        streetid = values[0];
        coordinateid = values[1];
    }).catch(creationFailed);

    var buildingPromise = Promise.resolve(createBuilding({
        number: building_num,
        block: building_block,
        coordinate_id: coordinateid,
        street_id: streetid
    })).then(function (result) {
        var parsedResult = /0\. Building with id=(\d+) was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('building creation failed');
        }
    }).catch(creationFailed);

    alert(street + " " + building_name + "/" + building_block + " successfully saved!");

    clearMarker();

}


function saveOverlay() {
    var overlay_elements = document.getElementById('floors');
    var photo = window.data;
    var floor = overlay_elements.elements[0].value;
    var swLat = markerA.getPosition().lat();
    var swLng = markerA.getPosition().lng();
    var neLat = markerB.getPosition().lat();
    var neLng = markerB.getPosition().lng();
    var photoid;

    var photoPromise = Promise.resolve(createPhoto({
        url: photo
    })).then(function (result) {
        var parsedResult = /0\. Photo with id=(\d+) was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('photo creation failed');
        }
    }).catch(creationFailed);


    Promise.all([photoPromise]).then(function (values) {
        photoid = values[0];
    }).catch(creationFailed);


    var floorPromise = Promise.resolve(createFloorOverlay({
        name: floor,
        southWestLatitude: swLat,
        southWestLongitude: swLng,
        northEastLatitude: neLat,
        northEastLongitude: neLng

    })).then(function (result) {
        var parsedResult = /0\. Overlay was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('number creation failed');
        }
    }).catch(creationFailed);

    Promise.all([floorPromise]).then(function (values) {
        var floorid = values[0];
    }).catch(creationFailed);


    function creationFailed(e) {
        console.error('something went wrong', e);
    }


    alert("Floor " + floor + "was successfully saved!");
    deleteAll();
    alert(" successfully saved!");
    clearMarker();


    //todo save to 'building_floor_overlays'
}

//todo: save room

//todo: save paths
