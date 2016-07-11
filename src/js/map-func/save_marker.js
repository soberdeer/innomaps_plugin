var floor_num;


function saveMarker() {
    var building_elements = document.getElementById('building');
    var building_name = building_elements.elements[0].value;
    floor_num = building_elements.elements[1].value;
    var street = building_elements.elements[2].value;
    var building_num = building_elements.elements[3].value;
    var building_block = building_elements.elements[4].value;
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();

    //ICON UPLOAD


//TODO save to 'buildings'

    alert(building_name + " successfully saved!");
    clearMarker();

}

function saveOverlay() {
    var overlay_elements = document.getElementById('floors');
    var building_id;
    var floor = overlay_elements.elements[0].value;
    var swLat = markerA.getPosition().lat();
    var swLng = markerA.getPosition().lng();
    var neLat = markerB.getPosition().lat();
    var neLng = markerB.getPosition().lng();

    alert(Floor + floor + " successfully saved!");
    deleteAll();

    //todo save to 'building_floor_overlays'
}

//todo: save room

//todo: save paths