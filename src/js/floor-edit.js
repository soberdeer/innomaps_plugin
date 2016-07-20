window._global.buildings = window._global.buildings || [];

$(function() {
    fillBuildingsSelect();
});

function fillBuildingsSelect() {
    var select = document.getElementById('building-options');
    Promise.resolve(getBuildings()).then(
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
