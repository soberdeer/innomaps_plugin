function checkJson(items, row, json) {//todo
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

function searchId(json, rows, values) {
    xpath = makeXpath(rows, values);
    var elements = JSON.search(json, xpath);
    return elements;

}


function makeXpath(rows, values) {
    var xpath = '//*[';
    var separator = " and ";
    for (var i = 0; i < rows.length; i++) {
        if (i === rows.length - 1) {
            xpath.concat(rows[i], '="' + values[i] + '"]/id');
        }
        xpath.concat(rows[i], '="' + values[i] + '"' + separator);
    }
    return xpath;
}