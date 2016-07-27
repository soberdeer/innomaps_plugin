window._global.photos = window._global.photos || [];
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

    var building_id = $('#building-options').val();
    var floor = $('#floor-num').val();
    Promise.resolve(getBuildingFloorOverlays())
        .then(function(result) {
            var overlay = result.buildingflooroverlays.filter(function(overlay) {
                return overlay.buildingid == building_id && overlay.floor == floor;
            })[0];
            addOverlayRooms(overlay);
        });
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

    Promise.resolve(getPhotos())
        .then(function(result) {
            var photo = result.photos.filter(function(photo) {
                return photo.id == buildingflooroverlay.photo_id;
            })[0];
            if (photo) {
                var overlay = new addOverlayRoomConstructor(bounds, photo.url, map);
            }
        });
}

function addOverlayRoomConstructor(bounds, image, map) {

    // Initialize all properties.
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
addOverlayRoomConstructor.prototype.onAdd = function () {

    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';

    // Create the img element and attach it to the div.
    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.position = 'absolute';
    div.appendChild(img);

    this.div_ = div;

    // Add the element to the "overlayLayer" pane.
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
};

addOverlayRoomConstructor.prototype.draw = function () {

    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    var overlayProjection = this.getProjection();

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

    // Resize the image's div to fit the indicated dimensions.
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
addOverlayRoomConstructor.prototype.onRemove = function () {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
};


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
