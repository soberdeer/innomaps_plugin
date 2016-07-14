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
});

function render(template, data) {
    $('#sampleArea').append(Mustache.render(template, data));
}

function dropdown(select, option) {
    for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var element = document.createElement("option");
        element.textContent = opt;
        element.value = opt;
        select.appendChild(element);
    }
}

function getCoordinateTypes() {
  $.getJSON(window._global.urls.innoServerUrl + '/resources/coordinatetypes', function(data) {
      window._global.coordinatetypes = {} && data.coordinatetypes || [];
  });
}

function getStreets() {
    $.getJSON(window._global.urls.innoServerUrl + '/resources/street', function(data) {
        window._global.street = {} && data.street || [];
    });
}

function getBuildings() {
    $.getJSON(window._global.urls.innoServerUrl + '/resources/building', function(data) {
        window._global.building = {} && data.building || [];
    });
}

