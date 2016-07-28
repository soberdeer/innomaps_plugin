var overlay;
var markers = [];
var markerA;
var markerB;

DebugOverlay.prototype = new google.maps.OverlayView();

function addOverlay() {
    if (markers.length >= 1 || overlay !== null) {
        deleteAll();
    }
    var swBound = new google.maps.LatLng(55.752828, 48.742661);
    var neBound = new google.maps.LatLng(55.754597, 48.744469);
    var bounds = new google.maps.LatLngBounds(swBound, neBound);

    var srcImage = $("#files-overlays").val();

    overlay = new DebugOverlay(bounds, this.value, map);

    markerA = new google.maps.Marker({
        position: swBound,
        map: map,
        draggable: true
    });

    markerB = new google.maps.Marker({
        position: neBound,
        map: map,
        draggable: true
    });
    overlay.bindTo('sw', markerA, 'position', true);
    overlay.bindTo('ne', markerB, 'position', true);

    markers.push(markerA);
    markers.push(markerB);

    google.maps.event.addListener(markerA, 'drag', function () {
        var newPointA = markerA.getPosition();
        var newPointB = markerB.getPosition();
        var newBounds = new google.maps.LatLngBounds(newPointA, newPointB);
        overlay.updateBounds(newBounds);
    });

    google.maps.event.addListener(markerB, 'drag', function () {
        var newPointA = markerA.getPosition();
        var newPointB = markerB.getPosition();
        var newBounds = new google.maps.LatLngBounds(newPointA, newPointB);
        overlay.updateBounds(newBounds);
    });

    google.maps.event.addListener(markerA, 'dragend', function () {
        var newPointA = markerA.getPosition();
        var newPointB = markerB.getPosition();
        console.log("point1" + newPointA);
        console.log("point2" + newPointB);
    });

    google.maps.event.addListener(markerB, 'dragend', function () {
        var newPointA = markerA.getPosition();
        var newPointB = markerB.getPosition();
        console.log("point1" + newPointA);
        console.log("point2" + newPointB);
    });

}

function DebugOverlay(bounds, image, map) {
    this.bounds_ = bounds;
    this.image_ = image;
    this.map_ = map;
    this.div_ = null;
    this.setMap(map);
    this.set('dragging', false);

    this.addListener('dragging_changed', function () {
        var dragging = this.get('dragging');
        map.setOptions({'draggable': !dragging});
    });
}

DebugOverlay.prototype.onAdd = function () {
    var self = this;
    var panes = this.getPanes();

    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';

    var img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.opacity = '0.5';
    img.style.position = 'absolute';
    div.appendChild(img);
    this.div_ = div;
    panes.overlayLayer.appendChild(div);

    var mouseTarget = document.createElement('div');
    mouseTarget.style.borderStyle = 'none';
    mouseTarget.style.borderWidth = '0px';
    mouseTarget.style.position = 'absolute';
    mouseTarget.draggable = 'true';
    panes.overlayMouseTarget.appendChild(mouseTarget);
    this.mouseTarget_ = mouseTarget;


    google.maps.event.addDomListener(mouseTarget, 'drag', function (e) {
        if (!self.get('dragging') || e.clientX < 0 && e.clientY < 0) {
            return;
        }

        var imgX = e.clientX - self.get('mouseX') + self.get('imgX');
        var imgY = e.clientY - self.get('mouseY') + self.get('imgY');
        self.set('dragImgX', imgX);
        self.set('dragImgY', imgY);

        mouseTarget.style.left = imgX + 'px';
        mouseTarget.style.top = imgY + 'px';
        div.style.left = imgX + 'px';
        div.style.top = imgY + 'px';

        var overlayProjection = self.getProjection();
        var sw = overlayProjection.fromContainerPixelToLatLng(new google.maps.Point(imgX, imgY + img.offsetHeight));
        var ne = overlayProjection.fromContainerPixelToLatLng(new google.maps.Point(imgX + img.offsetWidth, imgY));
        self.set('sw', sw);
        self.set('ne', ne);

    });

    google.maps.event.addDomListener(mouseTarget, 'mousedown', function (e) {
        // Cancel the mousedown event to prevent dragging the map.
        if (e.stopPropagation) {
            e.stopPropagation();
        } else if (window.e) {
            window.e.cancelBubble = true;
        }
        self.set('mouseX', e.clientX);
        self.set('mouseY', e.clientY);
    });

    google.maps.event.addDomListener(mouseTarget, 'dragstart', function (e) {
        self.set('dragging', true);
    });

    google.maps.event.addDomListener(mouseTarget, 'dragleave', function (e) {
        self.set('dragging', false);
        self.updateBounds(new google.maps.LatLngBounds(
            self.get('sw'), self.get('ne')
        ));
    });
};

DebugOverlay.prototype.draw = function () {
    //debugger;
    var overlayProjection = this.getProjection();
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
    var div = this.div_;
    this.set('imgX', sw.x);
    this.set('imgY', ne.y);

    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y) + 'px';

    this.mouseTarget_.style.left = div.style.left;
    this.mouseTarget_.style.top = div.style.top;
    this.mouseTarget_.style.width = div.style.width;
    this.mouseTarget_.style.height = div.style.height;

};


DebugOverlay.prototype.updateBounds = function (bounds) {
    this.bounds_ = bounds;
    this.draw();
};

DebugOverlay.prototype.onRemove = function () {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
};

function hideOverlay() {
    if (overlay) {
      overlay.setMap(null);
    }
}

function showOverlay() {
    overlay.setMap(map);
}


function deleteAll() {
    hideOverlay();
    hideMarkers();
    overlay = null;
    markers = [];
}

function imagesDropdown(images) {
    var select = document.getElementById("files-overlays");
    var emptySelect = !$(select).val();
    images.forEach(function(image){
        var element = document.createElement("option");
        element.textContent = image.name;
        element.value = image.url;
        select.add(element);
    });
    if (images.length) {
      $(select).show();
    }
    if (emptySelect) {
      addOverlay.call(select);
    }
}
