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

function checkJson(item, json) {
    if (item.value in json) {return true;}
}

function createPhoto(photo, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/photo', {
        url: photo.url
    }, success);
}

function createFloorOverlay(buildingflooroverlay, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/buildingflooroverlay', {
        buildingid: buildingflooroverlay.buildingid,
        photoid: buildingflooroverlay.photoid,
        floor: buildingflooroverlay.floor,
        southwestlatitude: buildingflooroverlay.southwestlatitude,
        southwestlongitude: buildingflooroverlay.southwestlongitude,
        northeastlatitude: buildingflooroverlay.northeastlatitude,
        northeastlongitude: buildingflooroverlay.northeastlongitude
    }, success);
}

function createRoom(room, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/room', {
        buildingid: room.buildingid,
        coordinateid: room.coordinateid,
        number: room.number,
        typeid: room.typeid
    }, success);
}

function createEdge(edge, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/edge', {
        typeid: edge.typeid,
        sourceid: edge.sourceid,
        targetid: edge.targetid
    }, success);
}

function editCoordinate(coordinate, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/coordinate', {
        id: coordinate.id,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        floor: coordinate.floor,
        typeid: coordinate.typeid,
        name: coordinate.name,
        description: coordinate.description
    }, success);
}

function editStreet(street, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/street', {
        id: street.id,
        name: street.name
    }, success);
}

function editBuilding(building, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/building', {
        id: building.id,
        number: building.number,
        block: building.block,
        description: building.description,
        coordinateid: building.coordinateid,
        streetid: building.streetid
    }, success);
}

function editPhoto(photo, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/photo', {
        id: photo.id,
        url: photo.url
    }, success);
}

function editFloorOverlay(buildingflooroverlay, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/buildingflooroverlay', {
        id: buildingflooroverlay.id,
        buildingid: buildingflooroverlay.buildingid,
        photoid: buildingflooroverlay.photoid,
        floor: buildingflooroverlay.floor,
        southwestlatitude: buildingflooroverlay.southwestlatitude,
        southwestlongitude: buildingflooroverlay.southwestlongitude,
        northeastlatitude: buildingflooroverlay.northeastlatitude,
        northeastlongitude: buildingflooroverlay.northeastlongitude
    }, success);
}

function editRoom(room, success) {
    return $.post(window._global.urls.innoServerUrl + '/resources/room', {
        id: room.id,
        buildingid: room.buildingid,
        coordinateid: room.block,
        typeid: room.typeid
    }, success);
}

function getPhoto(id) {
      return $.getJSON(window._global.urls.innoServerUrl + '/resources/photo', {id: id});
}

function getEdgeTypes() {
      return $.getJSON(window._global.urls.innoServerUrl + '/resources/edgetypes');
}

function getRooms() {
      return $.getJSON(window._global.urls.innoServerUrl + '/resources/rooms');
}
