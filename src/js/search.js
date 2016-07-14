var angular_module = angular.module('plunker', []);

function searchStreetID(json, streetname) {
    var result = $.grep(json, function (element) {
        return (element.name === streetname);
    });
    alert(result[0].id);
}

function searchPhotoId() {

}

function searchCoordinateTypes(name) {
    var json = getCoordinateTypes();
    angular_module.controller(['$filter', function ($filter) {
        var result = $filter('filter')(json, function (d) {
            return d.name === name;
        })[0];

        return result;
    }]);
}

function searchBuildingId(name) {
    var json = getBuildings();
    angular_module.controller(['$filter', function ($filter) {
        var result = $filter('filter')(json, function (d) {
            return d.name === name;
        })[0];

        return result;
    }]);
}

function checkJson(items, row,  json) {//todo
    var results = $.grep(json, function (value) {
        for (var i = 0; i < items.length; i++) {
            if (value[items[i].street] !== items[i].value) {
                return false;
            }
        }
        return true;
    });
    return results;
}