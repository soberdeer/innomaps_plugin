function checkFill() {
    var allFilled = true;

    var inputs = document.getElementById('building');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "text" && inputs[i].value === '') {
            allFilled = false;
            break;
        }
    }
    document.getElementById("disabled").disabled = !allFilled;
}

$(document).ready(function() {
    var inputs = document.getElementsByTagName('building');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "text") {
            inputs[i].onkeyup = checkFill;
            inputs[i].onblur = checkFill;
        }
    }
    streetsDropdown();
});

function streetsDropdown() {
    var select = document.getElementById("street-options");
    var options = window._global.streets;

    dropdown(select, options);

}
