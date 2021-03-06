var markers = [];
var coord = {lat: 55.75360130293316, lng: 48.743500784039};

function addMarkerBuilding() {
    if (markers[0]) {
        //if marker already was created change positon
        marker[0].setPosition(location);
    } else {
        markers[0] = new google.maps.Marker({
            position: coord,
            title: document.getElementById('building').elements[0].value,
            draggable: true,
            animation: google.maps.Animation.DROP,
            map: map
        });
        map.setCenter(markers[0].getPosition());
    }
}
