function addOverlayRooms(overlay) {
    var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(overlay.southWestLatitude, overlay.southWestLongitude),
        new google.maps.LatLng(overlay.northEastLatitude, overlay.northEastLongitude));

    Promise.resolve(getPhoto(overlay.photo_id))
        .then(function(result) {
            if (result && result.url) {
                new Marker(bounds, result.url, map);
            }
        });
}
