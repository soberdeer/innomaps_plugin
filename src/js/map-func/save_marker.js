var floor_num;


function saveMarker() {
    var building_elements = document.getElementById('building');
    var building_name = building_elements.elements[0].value;
    floor_num = building_elements.elements[1].value;
    var street = building_elements.elements[2].value;
    var building_num = building_elements.elements[3].value;
    var building_block = building_elements.elements[4].value;
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();

    checkStreet();

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

    var buildingNumPromise = Promise.resolve(createBuildingNum({
        name: building_num
    })).then(function (result) {
        var parsedResult = /0\. Building number was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('number creation failed');
        }
    }).catch(creationFailed);

    var buildingBlockPromise = Promise.resolve(createBuildingBlock({
        name: building_block
    })).then(function (result) {
        var parsedResult = /0\. Building block was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('block creation failed');
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

    Promise.all([streetPromise, buildingNumPromise, buildingBlockPromise, coordinatePromise]).then(function (values) {
        var streetid = values[0];
        var buildingnumid = values[1];
        var buildingblockid = values[2];
        var coordinateid = values[3];
    }).catch(creationFailed);

    alert(building_name + " successfully saved!");
    clearMarker();

}


function getStreets() {
    var list = $.getJSON(window._global.urls.innoServerUrl + '/resources/street', function(data) {
        window._global.street = {} && data.street || [];
    });
    return list;
    
}
function checkStreet() {
    var streets = getStreets();

}

function saveOverlay() {
    var overlay_elements = document.getElementById('floors');
    var building_id;
    var floor = overlay_elements.elements[0].value;
    var swLat = markerA.getPosition().lat();
    var swLng = markerA.getPosition().lng();
    var neLat = markerB.getPosition().lat();
    var neLng = markerB.getPosition().lng();

    alert(Floor + floor + " successfully saved!");
    deleteAll();

    var floorPromise = Promise.resolve(createBuildingNum({
        name: floor
    })).then(function (result) {
        var parsedResult = /0\. Floor was successfully created/.exec(result);
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

    alert(" successfully saved!");
    clearMarker();



    //todo save to 'building_floor_overlays'
}

//todo: save room

//todo: save paths
