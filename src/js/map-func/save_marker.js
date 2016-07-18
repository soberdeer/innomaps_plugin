var floor_num;

function creationFailed(e) {
    console.error('something went wrong', e);
}

function saveBuilding() {
    var building_elements = $('#building');
    // var building_name = building_elements.elements[0].value;
    floor_num = building_elements.find('#floors-val').val();

    var streetid = building_elements.find('#street-options').val();
    var building_num = building_elements.find('#home-number').val();
    var building_block = building_elements.find('#home-block').val();
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();


    var saveBuilding = function(coordinateid){
      Promise.resolve(createBuilding({
          number: building_num,
          block: building_block,
          coordinateid: coordinateid,
          streetid: streetid
      })).then(function(result) {
          var parsedResult = /0\. Building with id=(\d+) was successfully created/.exec(result);
          if (parsedResult && parsedResult[1]) {
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
            throw new Error('street creation failed');
        }
    }).then(saveBuilding).catch(creationFailed);
}


function saveOverlay() {
    var floor_edit_elements = document.getElementById('floor-num_floor-edit');
    var photo = srcImage;
    var buildingid = $("#building-options").val();
    var floor = floor_edit_elements.elements[0].value;
    var swLat = markerA.getPosition().lat();
    var swLng = markerA.getPosition().lng();
    var neLat = markerB.getPosition().lat();
    var neLng = markerB.getPosition().lng();

    var photoPromise = Promise.resolve(createPhoto({
        url: photo
    })).then(function(result) {
        var parsedResult = /0\. Photo with id=(\d+) was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('photo creation failed');
        }
    }).catch(creationFailed);


    Promise.all([photoPromise]).then(function(values) {
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

    })).then(function(result) {
        var parsedResult = /0\. Overlay was successfully created/.exec(result);
        if (parsedResult && parsedResult[1]) {
            return parsedResult[1];
        } else {
            throw new Error('overlay creation failed');
        }
    }).catch(creationFailed);

    alert("Floor " + floor + "was successfully saved!");
    deleteAll();
    alert(" successfully saved!");
    clearMarker();

}

//todo: save room

//todo: save paths
