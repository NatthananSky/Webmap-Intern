$(document).ready(function () {

    let container = false;
    $('.icon-link').click((e) => {
        if (container) {
            $(e.currentTarget).closest("li").toggleClass("showMenu");
        }
    });

    let toggleSidebar = $('.bx-menu');
    toggleSidebar.click(() => {
        $('.container').toggleClass('close');
        container = !container;
    });

    // check click submenu
    $('.check').click((e) => {
        $(e.currentTarget).toggleClass("open");
    });

    // toggle dem legend 
    $('.check[data-var="DEM"]').click(() => {
        $('.legend-dem').toggleClass("open");
    });

    $('.check[data-var="phangmueng"]').click(() => {
        $('.bx-spreadsheet').toggleClass("open");
    });

    $(".bx-spreadsheet").click(function () {
        $("#modalOverlay").append($(".legend-plan"));
        $('.legend-plan').toggleClass("open");
        $('.legend-plan').css({ 'width': '100%', 'max-width': '70%', 'right': '15%'});
        $("#modalOverlay").css("display", "flex");
    });
    // Close the modal if the overlay background is clicked
    $("#modalOverlay").click(function (event) {
        if ($(event.target).is(".overlay")) {
            $("#modalOverlay").fadeOut();
            $('.legend-plan').toggleClass("open");
        }
    });
    $("#closeModalBtn").click(function () {
        $("#modalOverlay").fadeOut();
        $('.legend-plan').toggleClass("open");
    });
});