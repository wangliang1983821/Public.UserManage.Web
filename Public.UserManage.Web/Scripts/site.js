$(function () {
    // menu
    //    $(".headbox .menu ul.list li").mouseover(function (e) {
    //        $(this).addClass("current").siblings().removeClass("current");
    //        var id = $(this).attr("id");
    //        $(".headbox .menutwo[data-menu=" + id + "]").show(300).siblings(".menutwo").hide(150);
    //    });

    //    $(".headbox .menutwo").mouseleave(null,function() {
    //        $(this).hide(300);
    //    });


    $(".headbox .menutwo").show();
    $(".headbox .menutwo .list li").not(".current").hover(function (e) {
        $(this).addClass("current");
    }, function (e) {
        $(this).removeClass("current");
    });

    $("body").on("load", ".ro", function () {
        $(this).prop("readonly", "readonly");
    });

})