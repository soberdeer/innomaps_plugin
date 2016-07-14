var marker;
var coord = {lat: 55.75360130293316, lng: 48.743500784039};

function addMarkerBuilding() {
    if (marker) {
        //if marker already was created change positon
        marker.setPosition(location);
    } else {
        marker = new google.maps.Marker({
            position: coord,
            title: document.getElementById('building').elements[0].value,
            draggable: true,
            animation: google.maps.Animation.DROP,
            map: map
        });
        map.setCenter(marker.getPosition());
    }
}

function clearMarker() {
    marker.setMap(null);
}

function streetsDropdown() {
    var select = document.getElementById("street-options");
    var options = getStreets();

    dropdown(select, options);
}
