$(document).ready(function() {
    var itemTemplate,
        count = $(".js-widget-item").length,
        fieldNameMatch = $(".js-widget-last-item input:first").attr("id").match(/id_([a-z_]+)_\d+_\d+/),
        fieldName = fieldNameMatch ? fieldNameMatch[1] : null;

    if (!fieldName) {
        throw new Error("Missing field name.");
    }

    itemTemplate = $(".js-widget-last-item").prop("outerHTML");
    itemTemplate = itemTemplate.replace("id_" + fieldName + "_" + (count - 1) + "_0", "id_" + fieldName + "_{count}_0");
    itemTemplate = itemTemplate.replace("id_" + fieldName + "_" + (count - 1) + "_1", "id_" + fieldName + "_{count}_1");

    var $lastItem = $(".js-widget-last-item");

    function addNewItem () {
        var $item = $(itemTemplate.replace(/\{count\}/g, count));
        count += 1;
        $item.insertAfter($lastItem);
        $lastItem.removeClass(".js-widget-last-item");
        stopListening($lastItem);
        $lastItem = $item;
        startListening($lastItem);
    }

    function startListening ($item) {
        $("input:first", $item).on("change.listWidget", _onLastItemChange);
    }

    function stopListening ($item) {
        $("input:first", $item).off("change.listWidget", "**", _onLastItemChange);
    }

    function _onLastItemChange () {
        if ($(this).val()) {
            addNewItem();
        }
    }

    startListening($lastItem);
});
