$(function() {
    initDmUploader('#drag-and-drop-zone', function(data) {
        console.log('upload finished', data);
        window._global.srcImage = data.url;
    });

});
