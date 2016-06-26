var options = {
    <!--make connect to server-->
    url: "",

    getValue: "building",

    list: {
        match: {
            enabled: true
        }
    }
};

$("#data-server").easyAutocomplete(options);