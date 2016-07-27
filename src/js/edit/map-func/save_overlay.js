function saveOverlay() {
    var photo = {
        url: $("#files-overlays").val()
    };

    Promise.resolve(createPhoto(photo))
        .then(parsePhotoId)
        .then(createFloorOverlayCallback)
        .catch(creationFailed);

    function parsePhotoId(result) {
        var parsedResult = /0\. Photo with id=(\d+) was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('photo creation failed');
        }
    }

    function createFloorOverlayCallback(photoid) {
        var floorOverlay = {
            buildingid: $("#building-options").val(),
            photoid: photoid,
            floor: $('#floor').val(),
            southwestlatitude: markerA.getPosition().lat(),
            southwestlongitude: markerA.getPosition().lng(),
            northeastlatitude: markerB.getPosition().lat(),
            northeastlongitude: markerB.getPosition().lng()
        };

        Promise.resolve(createFloorOverlay(floorOverlay))
            .then(parseFloorOverlayId)
            .then(function () {
                deleteAll();
                clearMarker();
            }).catch(creationFailed);
    }

    function parseFloorOverlayId(result) {
        var parsedResult = /0\. Building floor overlay with id=(\d+) was successfully created\./.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('overlay creation failed');
        }
    }

    function creationFailed(e) {
        console.error('something went wrong', e);
    }
}
