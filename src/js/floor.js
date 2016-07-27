$(function () {
    var images = [];


    initDmUploader('#drag-and-drop-zone', function (data) {
        remove_error();
        console.log('upload finished', data);

        window._global.srcImage = data.url;
        images.push({
            name: data.name,
            url: data.url
        });
        $('#dragdrop-modal').modal('hide');

    });
    $('#dragdrop-modal').on('hidden.bs.modal', function (e) {
        if (images !== []) {
            imagesDropdown(images);
            images = [];
        }
    });


    $('#files-overlays').change(addOverlay);
});
