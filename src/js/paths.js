var startPoint;
var endPoint;
var path_marker;
var lines = [];
var db_markers = [];


function dropdownPath() {
    var select = $('#path-param').find('#building-options');
    var options = window._global.building;
    dropdown(select, options);
}

function showOverlayPath() {

    var building_id = $('#path-param').find('#building-options').val();
    var floor = $('#path-param').find('#floor-num').val();
    var buildingflooroverlay = JSON.search(window._global.buildingflooroverlay, '//*[buildingid="' + building_id + '" and floor="' + floor + '"]');

    addOverlayRooms(buildingflooroverlay);
}

function getAllBuildingCoordinates() {
    var arr = [];
    return arr;//todo
}

function addMarkersFromJson() {
    var allCoordinates = getAllBuildingCoordinates();
    allCoordinates.forEach(function (coordinate) {
        var element = JSON.search(window._global.coordinate, '//*[id="' + coordinate + '"]')[0];
        var latlng = new google.maps.LatLng(element.lat, element.lng);
        path_marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: element.name
        });
        map.setCenter(path_marker.getPosition());
        path_marker.addListener('click', setPoint());
        db_markers.push(path_marker);
    });
    
}


function setPoint() {
    if (startPoint !== null) {
        toggleBounce();
        var check = {lat: path_marker.getPosition().lat, lng: path_marker.getPosition().lng};
        if (check !== startPoint) {
            endPoint = check;
            makeConnection();
        } else {
            alert('same point! choose another');
        }
    } else {
        toggleBounce();
        startPoint = {lat: path_marker.getPosition().lat, lng: path_marker.getPosition().lng};
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
