function fillBuildingsSelect() {
    var select = document.getElementById('building-options');
    $(select).empty();
    return Promise.resolve(getBuildings()).then(
        function(result) {
            result.buildings.forEach(function(building) {
                var street = window._global.streets.filter(function(street) {
                    return street.id == building.street_id;
                })[0];
                if (street) {
                    var element = document.createElement('option');
                    element.textContent = street.name;
                    if (building.number) {
                        element.textContent += ', ' + building.number;
                    }
                    if (building.block) {
                        element.textContent += ', ' + building.block;
                    }

                    element.value = building.id;
                    select.add(element);
                }
            });
        });
}


function fillFloorsSelect() {
    var select = document.getElementById('floor-options');
    $(select).empty();
    var buildingId = $('#building-options').val();
    return Promise.resolve(getBuildingFloorOverlays())
        .then(filterBuildingOverlays)
        .then(addFloorOptions);

    function filterBuildingOverlays(result) {
        return result.buildingflooroverlays.filter(function(overlay) {
            return overlay.building_id == buildingId;
        });
    }

    function addFloorOptions(overlays) {
        overlays.forEach(function(overlay) {
            var element = document.createElement('option');
            element.textContent = overlay.floor;
            element.value = overlay.floor;
            select.add(element);
        });
    }
}
