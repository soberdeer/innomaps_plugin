$(function() {
    $("#sampleArea").empty();
    $(".topMenuRight li").each(function(i, item) {
        item.onclick = function() {
          $('#sampleArea')
            .empty()
            .load(item.getAttribute("url"));
        };
    });
});

function render(template, data) {
    $('#sampleArea').append(Mustache.render(template, data));
}
