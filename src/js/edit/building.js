var edit_markers_building = [];
var edited_marker;

$(document).ready(
    function () {
        var coordinates_id = JSON.search(window._global.buildings, '//coordinateid');
        coordinates_id.forEach(function (coord_id) {
            var coord = JSON.search(window._global.coordinate, '//*[id = ' + coord_id + ']')[0];
            var building_id = JSON.search(window._global.buildings, '//*[coordinateid = ' + coord_id + ']' )[0].id;
            var marker = new google.maps.Marker({
                position: {lat: coord.lat, lng: coord.lng},
                draggable: true,
                map: map,
                title: {id: building_id, id_c: coord_id}
            });
            edit_markers_building.push(marker);
            marker.addListener('drag', function () {
                edited_marker = marker;
            });
        });
    });