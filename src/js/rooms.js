var room_marker;
var room_markers = [];
var floor;
//for tests = UI coords

var room_red = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
var door_blue = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
var hall_green = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
var wc_yellow = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
var other_purple = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';

$(function() {
    fillRoomsSelect();
});

function fillRoomsSelect() {
    var select = document.getElementById('type-options');
    window._global.roomtypes.forEach(function(option) {
        var element = document.createElement('option');
        element.textContent = option.name;
        element.value = option.id;
        select.add(element);
    });
}

function dropdownRoomType() {
    var select = $('#room-param').find('#type-options');
    var options = window._global.roomtype;
    dropdown(select, options);
}

function addMarkerRoom() {
    //for tests
    var type = $('#room-param').find('#type-options').val();
    setMarker(type);
    map.setCenter(room_marker.getPosition());
    room_markers.push(room_marker);
}

function setMarker(type) {
    var color = typeSwitch(type);
    room_marker = new google.maps.Marker({
        position: map.getCenter(),
        title: document.getElementById('room-param').elements[1].value,
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: color,
        map: map
    });
}

function typeSwitch(type) {
    var color;
    switch (type) {
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

    var building_id = $('#room-param').find('#building-options').val();
    var floor = $('#room-param').find('#floor-num').val();
    var buildingflooroverlay = JSON.search(window._global.buildingflooroverlay, '//*[buildingid="' + building_id + '" and floor="' + floor + '"]');

    addOverlayRooms(buildingflooroverlay);
}

function getImage(buildingflooroverlay) {
    var srcImage = JSON.search(window._global.photo, '//*[id="' + buildingflooroverlay.photoid + '"]')[0].url;
    return srcImage;
}

function addOverlayRooms(buildingflooroverlay) {

    var southwestlatitude = buildingflooroverlay.southwestlatitude;
    var southwestlongitude = buildingflooroverlay.southwestlongitude;
    var northeastlatitude = buildingflooroverlay.northeastlatitude;
    var northeastlongitude = buildingflooroverlay.northeastlongitude;

    var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(southwestlatitude, southwestlongitude),
        new google.maps.LatLng(northeastlatitude, northeastlongitude));

    overlay = new addOverlayRoomConstructor(bounds, srcImage, map);

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
