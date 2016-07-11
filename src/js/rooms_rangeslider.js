

$(function () {
    var $document = $(document);
    var selector = '[data-rangeslider]';
    var $inputRange = $(selector);
    var value;

    function valueOutput(element) {
        value = element.value;
        var output = element.parentNode.getElementsByTagName('output')[0];
        output.innerHTML = value;
    }

    for (var i = $inputRange.length - 1; i >= 0; i--) {
        valueOutput($inputRange[i]);
    }

    $document.on('input', selector, function (e) {
        valueOutput(e.target);
    });

    /*$document.on('click', '#js-example-change-attributes', function (e) {
        var $inputRange = $('[data-rangeslider]', e.target.parentNode);
        var attributes = {
            min: $('input[name="min"]', e.target.parentNode)[0].value,
            max: $('input[name="max"]', e.target.parentNode)[0].value,
            step: $('input[name="step"]', e.target.parentNode)[0].value
        };
        $inputRange.attr(attributes).rangeslider('update', true);
    });*/
//todo: change rangelist
    $document.on('#js-example-change-attributes', function (e) {
        var $inputRange = $('[data-rangeslider]', e.target.parentNode);
        var attributes = {max: (getMaxFloor(), e.target.parentNode)[0].value};
        $inputRange.attr(attributes).rangeslider('update', true);
    });

    $document.on('click', '#js-example-change-attributes', function (e) {
        var $inputRange = $('[data-rangeslider]', e.target.parentNode);
        var value = $((this.value++), e.target.parentNode)[0].value;
        $inputRange.val(value).change();});


});