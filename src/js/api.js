function createCoordinate(coordinate, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/coordinate', {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      floor: coordinate.floor,
      typeid: coordinate.typeid,
      description: coordinate.description
    }, success);
}

function createStreet(street, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/street', {
      name: street.name
    }, success);
}

function createBuilding(building, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/building', {
        number: building.number,
        block: building.block,
        description: building.description,
        coordinateid: building.coordinateid,
        streetid: building.streetid
    }, success);
}

function createPhoto(photo, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/photo', {
        utl: photo.url
    }, success);
}




function createFloorOverlay(building, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/building', {
        number: building.number,
        block: building.block,
        description: building.description,
        coordinateid: building.coordinateid,
        streetid: building.streetid
    }, success);
}
