var floor_num;
window._global.buildings =  window._global.buildings || [];

function creationFailed(e) {
    console.error('something went wrong', e);
}

function saveBuilding() {
    var building_elements = $('#building');
    // var building_name = building_elements.elements[0].value;
    floor_num = '7'; //building_elements.find('#floors-val').val();

    var streetid = building_elements.find('#street-options').val();
    var building_num = building_elements.find('#home-number').val();
    var building_block = building_elements.find('#home-block').val();
    var description = building_elements.find('#home-description').val();
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();


    var saveBuilding = function(coordinateid) {
        var building = {
            number: building_num,
            block: building_block,
            description: description,
            coordinateid: coordinateid,
            streetid: streetid
        };
        Promise.resolve(createBuilding(building)).then(function(result) {
            var parsedResult = /0\. Building with id=(\d+) was successfully created/.exec(result);
            if (parsedResult && parsedResult[1]) {
                building.id = parsedResult[1];
                window._global.buildings.push(building);
                return parsedResult[1];
            } else {
                throw new Error('building creation failed');
            }
        }).catch(creationFailed);
    };

    var coordinatePromise = Promise.resolve(createCoordinate({
        latitude: lat,
        longitude: lng
    })).then(function(result) {
        var parsedResult = /0\. Coordinate with id=(\d+) was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('coordinate creation failed');
        }
    }).then(saveBuilding).catch(creationFailed);
}


//todo: save room

//todo: save paths
