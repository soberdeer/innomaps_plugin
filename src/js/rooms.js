var room_marker;
var room_markers = [];
var floor;
//for tests = UI coords
var coord_current_building = coord;


var room_red = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
var door_blue = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
var hall_green = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
var wc_yellow = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
var other_purple = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';

function addMarkerRoom() {
    if (coord_current_building === null) {
        return null;
        //todo: get from db or from select list on 'rooms' screen
    }
    //for tests
    var type = 'hall';
    setMarker(type);
    map.setCenter(room_marker.getPosition());
    room_markers.push(room_marker);
}

function setMarker(type) {
    var color = typeSwitch(type);
    room_marker = new google.maps.Marker({
        position: coord_current_building,
        title: document.getElementById('room-param').elements[1].value,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: color,
        map: map
    });
}

function typeSwitch(type) {
    var color;
    switch (type){
        case 'door':
            color = door_blue;
            break;
        case 'hall':
            color = hall_green;
            break;
        case 'wc':
            color = wc_yellow;
            break;
        case 'other':
            color = other_purple;
            break;
        default:
            color = room_red;
            break;
    }
    return color;
}

function showOverlay() {
    //todo: get image src of floor of building from db

}

function clearMarkersRoom() {
    room_markers.setMap(null);
    room_markers = [];
}

function getMaxFloor() {
    return floor_num;

}

function clearForm() {
    document.getElementById('room-param').reset();
}


//TELSE: ADD REMOVE MARKER BY CLICK