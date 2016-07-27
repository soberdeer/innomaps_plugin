var floor_num;
window._global.buildings = window._global.buildings || [];

function creationFailed(e) {
    console.error('something went wrong', e);
}

function saveBuilding() {
    var building_elements = $('#building');
    // var building_name = building_elements.elements[0].value;
    floor_num = building_elements.find('#floors-num').val();
    var id = edited_marker.getTitle().id;
    var streetid = building_elements.find('#street-options').val();
    var building_num = building_elements.find('#home-number').val();
    var building_block = building_elements.find('#home-block').val();
    var description = building_elements.find('#home-description').val();
    var lat;
    var lng;
    if (edited_marker !== null) {
        lat = edited_marker.getPosition().lat();
        lng = edited_marker.getPosition().lng();
    }

    var id_coord = edited_marker.getTitle().id_c;


    var saveBuilding = function () {
        var building = {
            id: id,
            number: building_num,
            block: building_block,
            description: description,
            coordinateid: id_coord,
            streetid: streetid
        };
        Promise.resolve(editBuilding(building)).then(function (result) {
            var parsedResult = /0\. Building with id=(\d+) was successfully updated/.exec(result);
            if (parsedResult && parsedResult[1]) {
                building.id = parsedResult[1];
                window._global.buildings.push(building);
                return parsedResult[1];
            } else {
                throw new Error('building creation failed');
            }
        }).catch(creationFailed);
    };

    var coordinatePromise = Promise.resolve(updateCoordinate({
        id: id_coord,
        latitude: lat,
        longitude: lng
    })).then(function (result) {
        var parsedResult = /0\. Coordinate with id=(\d+) was successfully updated/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('coordinate creation failed');
        }
    }).then(saveBuilding).catch(creationFailed);
}
