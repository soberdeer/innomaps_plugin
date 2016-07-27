function saveBuilding() {
    Promise.resolve(createCoordinate({
            latitude: marker.getPosition().lat(),
            longitude: marker.getPosition().lng()
        }))
        .then(parseCoordinateId)
        .then(saveBuilding)
        .catch(creationFailed);

    function saveBuilding(coordinateid) {
        var building = {
            number: $('#home-number').val(),
            block: $('#home-block').val(),
            description: $('#home-description').val(),
            coordinateid: coordinateid,
            streetid: $('#street-options').val()
        };
        Promise.resolve(createBuilding(building))
            .then(parseBuildingId)
            .catch(creationFailed);
    }

    function parseBuildingId(result) {
        var parsedResult = /0\. Building with id=(\d+) was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('building creation failed');
        }
    }

    function parseCoordinateId(result) {
        var parsedResult = /0\. Coordinate with id=(\d+) was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('coordinate creation failed');
        }
    }
}
