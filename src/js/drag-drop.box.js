//-- Some functions to work with our UI

function add_log(message) {
    var template = '<div class="info" style="text-color"><span class="status">[' + new Date().getTime() + '] - ' + message + '</span></div>';

    $('#fileList').prepend(template);
}


function remove_error() {
    $("#fileList").html("");
}

function update_file_status(id, status, message) {
    $('#uploadFile' + id).find('span.status').html(message).addClass(status);
}

function update_file_progress(id, percent) {
    $('#uploadFile' + id).find('div.progress').width(percent);
}

function initDmUploader(containerSelector, success) {
    $(containerSelector).dmUploader({
        url: '/upload',
        dataType: 'json',
        allowedTypes: 'image/*',
        onInit: function () {
           // add_log('Penguin initialized :)');
        },
        onBeforeUpload: function (id) {
            //add_log('Starting the upload of #' + id);

          //  update_file_status(id, 'uploading', 'Uploading...');
        },
        onNewFile: function (id, file) {
            //add_log('New file added to queue #' + id);

        },
        onComplete: function () {
            //add_log('All pending tranfers finished');
        },
        onUploadProgress: function (id, percent) {
            var percentStr = percent + '%';

            //update_file_progress(id, percentStr);
        },
        onUploadSuccess: function (id, data) {
            //add_log('Upload of file #' + id + ' completed');

            //add_log('Server Response for file #' + id + ': ' + JSON.stringify(data));
            if (success) {
                success.call(window, data);
            }
            //update_file_status(id, 'success', 'Upload Complete');

            //update_file_progress(id, '100%');
        },
        onUploadError: function (id, message) {
            add_log('Failed to Upload file #' + id + ': ' + message);

            update_file_status(id, 'error', message);
        },
        onFileTypeError: function (file) {
            add_log('File \'' + file.name + '\' cannot be added: must be an image');

        },
        onFileSizeError: function (file) {
            add_log('File \'' + file.name + '\' cannot be added: size excess limit');
        },
        onFallbackMode: function (message) {
            alert('Browser not supported(do something else here!): ' + message);
        }
    });
}


