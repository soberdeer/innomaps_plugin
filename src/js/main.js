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
});

function render(template, data) {
    $('#sampleArea').append(Mustache.render(template, data));
}

function getCoordinateTypes() {
  $.getJSON(window._global.urls.innoServerUrl + '/resources/coordinatetypes', function(data) {
      window._global.coordinatetypes = {} && data.coordinatetypes || [];
  });
}
