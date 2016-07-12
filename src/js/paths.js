var startPoint;
var endPoint;
var lines = [];

function addMarkersPaths() {
    if (room_markers === null) {
        return null;
        //todo: get list of coords in building (rooms, doors, halls etc) from db
    }

    for (var i = 0; i < room_markers.length; i++) {
        var type = 'hall'; //todo: get type from db
        setMarkerForPaths(type, room_markers[i]);
    }
}

function setMarkerForPaths(type, room_marker) {
    var color = typeSwitch(type);
    room_marker = new google.maps.Marker({
        position: {lat: room_marker.getPosition().lat, lng: room_marker.getPosition().lng},
        // todo: get title from db /*title: document.getElementById('room-param').elements[1].value,*/
        draggable: false,
        icon: color,
        map: map
    });
    map.setCenter(room_marker.getPosition());
    room_markers.push(room_marker);

    room_marker.addListener('click', setPoint());
}


function setPoint() {
    if (startPoint !== null) {
        toggleBounce();
        var check = {lat: room_marker.getPosition().lat, lng: room_marker.getPosition().lng};
        if (check !== startPoint) {
            endPoint = check;
            makeConnection();
        } else {
          alert('same point! choose another');
        }
    } else {
        toggleBounce();
        startPoint = {lat: room_marker.getPosition().lat, lng: room_marker.getPosition().lng};

    }

}
function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function makeConnection() {
    var connection = [startPoint, endPoint];
    var path = new google.maps.Polyline({
        path: [startPoint, endPoint],
        geodesic: true,
        strokeColor: '#F57C00',
        strokeOpacity: 0.2,
        strokeWeight: 3
    });
    path.setMap(map);
    lines.push(connection);
    startPoint = null;
    endPoint = null;
}
