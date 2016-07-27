var options = {
    url: "/static/lib/link.json",
    getValue: "building",
    template: {
        type: "text",
        fields: {
            link: "building"
        }
    },
    list: {
        match: {
            enabled: true
        }
    }
};
$("#data-server").easyAutocomplete(options);