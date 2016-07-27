function saveRoom() {

    var room_elements = $('#room-param');

    var buildingid = room_elements.find('#building-options').val();

    var typeid = room_elements.find('#type-options').val();
    var number = room_elements.find('#room-num').val();
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();


    var saveRoom = function (coordinateid) {
        Promise.resolve(createRoom({
            buildingid: buildingid,
            number: number,
            coordinateid: coordinateid,
            typeid: typeid
        })).then(function (result) {
            var parsedResult = /0\. Room with id=(\d+) was successfully created/.exec(result);
            if (parsedResult && parsedResult[1]) {
                return parsedResult[1];
            } else {
                throw new Error('room creation failed');
            }
        }).catch(creationFailed);
    };

    var coordinatePromise = Promise.resolve(createCoordinate({
        latitude: lat,
        longitude: lng
    })).then(function (result) {
        var parsedResult = /0\. Coordinate with id=(\d+) was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('coordinate creation failed');
        }
    }).then(saveRoom).catch(creationFailed);
}