window._global = window._global || {};

$(function() {
    $("#sampleArea").empty();
    $(".topMenuRight li").each(function(i, item) {
        item.onclick = function() {
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
    options.forEach(function(street){
        var element = document.createElement("option");
        element.textContent = street.name;
        element.value = street.id;
        select.add(element);
    });
}

function getCoordinateTypes() {
  return $.getJSON(window._global.urls.innoServerUrl + '/resources/coordinatetypes', function(data) {
      window._global.coordinatetypes = data.coordinatetypes || [];
  }, function() {
    window._global.coordinatetypes = window._global.coordinatetypes || [];
  });
    return data.coordinatetypes;
}

function getRoomTypes() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/roomtypes', function(data) {
        window._global.roomtypes = data.roomtypes || [];
    }, function() {
      window._global.roomtypes = window._global.roomtypes || [];
    });
}

function getStreets() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/streets', function(data) {
        window._global.streets = data.streets || [];
    });
}

function getBuildings() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/buildings', function(data) {
        window._global.building = data.building || [];
    });
}

function getBuildingFloorOverlay() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/buildingflooroverlay', function(data) {
        window._global.buildingflooroverlay = {} && data.buildingflooroverlay || [];
    });
}

function getPhoto() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/photo', function(data) {
        window._global.photo = {} && data.photo || [];
    });
}

function getCoordinates() {
    return $.getJSON(window._global.urls.innoServerUrl + '/resources/coordinate', function(data) {
        window._global.coordinate = {} && data.coordinate || [];
    });
}
