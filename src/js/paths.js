var markers = [];

$(function() {
    var startPoint;
    var lines = [];

    fillBuildingsSelect().then(fillFloorsSelect).then(downloadMarkers);
    $('#building-options').change(fillFloorsSelect);
    $('#floor-options').change(downloadMarkers);
    fillEdgeTypesDropdown();
    $('#save-paths').click(function() {
        savePath(lines);
    });

    function fillEdgeTypesDropdown() {
        var select = document.getElementById('edge-options');
        Promise.resolve(getEdgeTypes())
            .then(function(result) {
                dropdown(select, result.edgetypes);
            });
    }

    function downloadMarkers() {
        getAllBuildingOverlaysPromise()
            .then(getAllRoomsPromise)
            .then(getAllCoordinates)
            .then(addMarkers);
    }

    function getAllBuildingOverlaysPromise() {
        return Promise.resolve(getBuildingFloorOverlays())
            .then(filterOverlays)
            .then(addOverlay);

        function filterOverlays(result) {
            var buildingId = $('#building-options').val();
            var floor = $('#floor-options').val();
            return result.buildingflooroverlays.filter(function(overlay) {
                return overlay.building_id == buildingId && overlay.floor == floor;
            })[0];
        }

        function addOverlay(overlay) {
            if (overlay) {
                addOverlayRooms(overlay);
            }
            return overlay;
        }
    }

    function getAllRoomsPromise(overlay) {
        if (overlay) {
            return Promise.resolve(getRooms())
                .then(filterRooms);
        } else {
            console.error('Overlay has illegal value', overlay);
        }

        function filterRooms(result) {
            return result.rooms.filter(function(room) {
                return room.building_id == overlay.building_id;
            });
        }
    }

    function getAllCoordinates(rooms) {
        if (rooms) {
            return Promise.resolve(getCoordinates())
                .then(filterCoordinates);
        } else {
            console.error('Rooms have illegal value', rooms);
        }

        function filterCoordinates(result) {
            var floor = $('#floor-options').val();
            return result.coordinates.filter(function(coordinate) {
                return coordinate.floor == floor && rooms.filter(function(room) {
                    return room.coordinate_id == coordinate.id;
                }).length > 0;
            });
        }
    }

    function addMarkers(allCoordinates) {
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        if (allCoordinates) {
            markers = allCoordinates.map(function(coordinate) {
                var latlng = new google.maps.LatLng(coordinate.latitude, coordinate.longitude);
                var pathMarker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: coordinate.name
                });
                pathMarker.coordinateId = coordinate.id;
                map.setCenter(pathMarker.getPosition());
                pathMarker.addListener('click', setPoint(pathMarker));
                return pathMarker;
            });
        } else {
            console.error('Coordinates have illegal value', allCoordinates);
        }
    }

    function setPoint(pathMarker) {
        return function(marker) {
            var position = {
                lat: marker.latLng.lat(),
                lng: marker.latLng.lng(),
                coordinateId: pathMarker.coordinateId,
                unbounce: function() {
                  unbounce(pathMarker);
                }
            };
            if (startPoint) {
                if (position.lat !== startPoint.lat || position.lng !== startPoint.lng) {
                    makeConnection(startPoint, position);
                    bounce(pathMarker);
                    startPoint = null;
                } else {
                    alert('same point! choose another');
                }
            } else {
                bounce(pathMarker);
                startPoint = position;
            }
        };
    }

    function bounce(pathMarker) {
        pathMarker.setAnimation(google.maps.Animation.BOUNCE);
    }

    function unbounce(pathMarker) {
        pathMarker.setAnimation(null);
    }

    function makeConnection(startPoint, endPoint) {
        var type = $('#edge-options').val();
        var path = new google.maps.Polyline({
            path: [startPoint, endPoint],
            geodesic: true,
            strokeColor: '#F57C00',
            strokeOpacity: 0.2,
            strokeWeight: 3
        });
        path.setMap(map);
        lines.push({
            start: startPoint,
            end: endPoint,
            typeid: type
        });
    }
});
