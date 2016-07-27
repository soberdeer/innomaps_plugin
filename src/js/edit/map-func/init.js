var myLatlng = {lat: 55.75360130293316, lng: 48.7435007840395};

var map;

function initMap() {
    var myOptions = {
        center: myLatlng,
        zoom: 15
    };

    map = new google.maps.Map(document.getElementById("map"), myOptions);
}


$(document).ready(function () {
    Promise.resolve(getBuildingFloorOverlays())
        .then(function(result) {
            var overlay = result.buildingflooroverlays.filter(function(overlay) {
                return overlay.floor == "1";
            })[0];
            addOverlayRooms(overlay);
        });
});