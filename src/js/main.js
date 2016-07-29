window._global = window._global || {};

$(function () {
    $("#sampleArea").empty();
    $(".topMenuRight li").each(function (i, item) {
        item.onclick = function () {
          deleteMarkers();
            $('#sampleArea')
                .empty()
                .load(item.getAttribute("url"));
        };
    });
    getCoordinateTypes();
    getStreets();
    getRoomTypes();
});

function render(template, data) {
    $('#sampleArea').append(Mustache.render(template, data));
}

function dropdown(select, options) {
    options.forEach(function (street) {
        var element = document.createElement("option");
        element.textContent = street.name;
        element.value = street.id;
        select.add(element);
    });
}

function getCoordinateTypes() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/coordinatetypes', function (data) {
        window._global.coordinatetypes = data.coordinatetypes || [];
    }, function () {
        window._global.coordinatetypes = window._global.coordinatetypes || [];
    });
}

function getRoomTypes() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/roomtypes', function (data) {
        window._global.roomtypes = data.roomtypes || [];
    }, function () {
        window._global.roomtypes = window._global.roomtypes || [];
    });
}

function getStreets() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/streets', function (data) {
        window._global.streets = data.streets || [];
    });
}

function getBuildings() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/buildings');
}

function getBuildingFloorOverlays() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/buildingflooroverlays');
}

function getPhotos() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/photos');
}

function getCoordinates() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/coordinates');
}

function creationFailed(e) {
    console.error('something went wrong', e);
}

function setMapOnAllMarkers(map) {
    setMapOnAll(markers, map);
}

function setMapOnAll(arr, map) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].setMap(map);
    }
}

function showMarkers() {
    setMapOnAllMarkers(map);
}

function hideMarkers() {
    setMapOnAllMarkers(null);
}

function deleteMarkers() {
  hideMarkers();
  markers = [];
}
