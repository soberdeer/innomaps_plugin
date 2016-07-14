var floor_num;


function saveBuilding() {
    var building_elements = document.getElementById('building');
    var building_name = building_elements.elements[0].value;
    floor_num = building_elements.elements[1].value;

    var street = document.getElementById('street-options').options[document.getElementById('street-options').selectedIndex].value;
    var building_num = building_elements.elements[3].value;
    var building_block = building_elements.elements[4].value;
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();

    var streetPromise = function(){if (!checkJson(street, data.street)) {

        Promise.resolve(createStreet({
            name: street
        })).then(function (result) {
            var parsedResult = /0\. Street with id=(\d+) was successfully created/.exec(result);
            if (parsedResult && parsedResult[1]) {
                return parsedResult[1];
            } else {
                throw new Error('street creation failed');
            }
        }).catch(creationFailed);
    }
    else {
        return searchStreetID(street, data.street);
    }};


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
    var floor_edit_elements = document.getElementById('floor-num_floor-edit');
    var photo = srcImage;
    var building_selector = document.getElementById('floors_get_building');
    var buildingid = searchBuildingId(building_selector.options[building_selector.selectedIndex].value);
    
    var floor = floor_edit_elements.elements[0].value;
    var swLat = markerA.getPosition().lat();
    var swLng = markerA.getPosition().lng();
    var neLat = markerB.getPosition().lat();
    var neLng = markerB.getPosition().lng();

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


    Promise.resolve(createFloorOverlay({
        buildingid: buildingid,
        photoid: photoid,
        floor: floor,
        southWestLatitude: swLat,
        southWestLongitude: swLng,
        northEastLatitude: neLat,
        northEastLongitude: neLng

    })).then(function (result) {
        var parsedResult = /0\. Overlay was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('overlay creation failed');
        }
    }).catch(creationFailed);


    function creationFailed(e) {
        console.error('something went wrong', e);
    }


    alert("Floor " + floor + "was successfully saved!");
    deleteAll();
    alert(" successfully saved!");
    clearMarker();
    
}

//todo: save room

//todo: save paths
