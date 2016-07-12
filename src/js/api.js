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

function createBuildingNum(building_num, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/building_num', {
        name: building_num.name
    }, success);
}

function createBuildingBlock(building_block, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/building_block', {
        name: building_block.name
    }, success);
}
