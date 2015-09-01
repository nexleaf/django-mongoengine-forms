$(document).ready(function() {
    var itemTemplate,
        lastItemId, newItemId,
        count = $(".js-widget-item").length,
        fieldNameMatch = $(".js-widget-last-item input:first").attr("id").match(/id_([a-z_]+)_\d+_\d+/),
        fieldName = fieldNameMatch ? fieldNameMatch[1] : null;

    if (!fieldName) {
        throw new Error("Missing field name.");
    }

    lastItemId = fieldName + "_" + (count - 1) + "_";
    newItemId = fieldName + "_{count}_";
    itemTemplate = $(".js-widget-last-item").prop("outerHTML");
    itemTemplate = itemTemplate.replace("id_" + lastItemId + "0", "id_" + newItemId + "0");
    itemTemplate = itemTemplate.replace("id_" + lastItemId + "1", "id_" + newItemId + "1");
    itemTemplate = itemTemplate.replace(lastItemId + "0", newItemId + "0");
    itemTemplate = itemTemplate.replace(lastItemId + "1", newItemId + "1");

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
