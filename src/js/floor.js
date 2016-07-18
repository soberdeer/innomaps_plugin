function dropdownsFloorEdit() {
    var jsonList = {"Table" : [data.building]};

    var listItems= "";
    for (var i = 0; i < jsonList.Table.length; i++){
        for (var j = 0; j < (data.street).length; j++){
            if (jsonList.Table[i].streetid === data.street[j].id) {
                jsonList.Table[i].streetid = data.street[j].name;
            }
        }
        listItems+= "<option value='" + jsonList.Table[i].id + "'>" + jsonList.Table[i].streetid + " "+ jsonList.Table[i].number + "/" + jsonList.Table[i].block + "</option>";
    }
    $("#building-options").html(listItems);
}
