

// We are keeping this in closure, it's less expensive than querying DOM
const modal = $("#add-rating-modal")

// Not polluting the global scope
export function closeModal() {
    if (!modal?.hasClass("hidden")) {
        modal?.fadeToggle()
        modal?.toggleClass("hidden")
    }
}

// Not polluting the global scope
export function openModal() {
    if (modal?.hasClass("hidden")) {
        modal?.fadeToggle()
        modal?.toggleClass("hidden")
    }
}

// 
$("#product-overview")?.on("click", ".modal-open-btn", function () {
    openModal()
})

modal?.find("#close-btn")?.on("click", function () {
    closeModal()
})

$(document).mouseup(function (e) {
    var container = $(".model-content");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container?.is(e.target) && container?.has(e.target)?.length === 0 && !$(".modal-open-btn")?.is(e.target)) {
        closeModal()
    }
});