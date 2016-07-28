var room_marker;
var room_markers = [];

var room_red = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
var door_blue = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
var hall_green = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
var wc_yellow = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
var other_purple = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';

$(function() {
    fillBuildingsSelect().then(fillFloorsSelect);
    $('#building-options').change(fillFloorsSelect);
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

function fillFloorsSelect() {
    var buildingId = $('#building-options').val();
    $('#floor-options').empty();
    Promise.resolve(getBuildingFloorOverlays())
        .then(filterBuildingOverlays)
        .then(addFloorOptions);

    function filterBuildingOverlays(result) {
        return result.buildingflooroverlays.filter(function(overlay) {
            return overlay.building_id == buildingId;
        });
    }

    function addFloorOptions(overlays) {
        var select = document.getElementById('floor-options');
        overlays.forEach(function(overlay) {
            var element = document.createElement('option');
            element.textContent = overlay.floor;
            element.value = overlay.floor;
            select.add(element);
        });
    }
}

function addMarkerRoom() {
    //for tests
    var type = $('#room-param').find('#type-options').val();
    setMarker(type);
    map.setCenter(room_marker.getPosition());
    markers.push(room_marker);
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
    var building_id = $('#building-options').val();
    var floor = $('#floor-options').val();
    Promise.resolve(getBuildingFloorOverlays())
        .then(function(result) {
            var overlay = result.buildingflooroverlays.filter(function(overlay) {
                return overlay.building_id == building_id && overlay.floor == floor;
            })[0];
            if (overlay) {
                addOverlayRooms(overlay);
            }
        });
}

function clearForm() {
    document.getElementById('room-param').reset();
}
