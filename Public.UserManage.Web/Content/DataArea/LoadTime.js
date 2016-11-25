
var LoadTime = {};
LoadTime.Path = "";
LoadTime.isClose = true;


LoadTime.Append = function (path) {
   
    LoadTime.Path = path;
    var d = '<div id="div_loadtime" title="Dialog Title" class="ui-dialog-content ui-widget-content">' + '<img src="' + path + '" />' + '</div>';

    $("body").append(d).find("#div_loadtime").hide();
}

function beginprogress() {
    LoadTime.Begin();
}
function endprogress() {
    LoadTime.Complete();
}

LoadTime.Begin = function () {
    //    LoadTime.isClose = true;
    //    LoadTime.Complete();
    //    $("#div_loadtime").html('<div style ="margin: 10px;padding:20px 50px;"><img src="' + LoadTime.Path + '" /></div>');
    //    $("#div_loadtime").dialog({
    //        autoOpen: false,
    //        modal: true,
    //        width: 200,
    //        height: 150,
    //        title: "处理中",
    //        buttons: {}

    //    });
    //    $("#div_loadtime").dialog("open");
       try {
           $.noahAlert.loadingPartial.loading();
} catch (e) { }
}
LoadTime.Complete = function () {
    try {
        //        if (LoadTime.isClose) {
        //            $("#div_loadtime").dialog("close");
        //        }
        $.noahAlert.loadingPartial.close();
    } catch (e) { }
}
LoadTime.html = function (text) {
    LoadTime.Complete();
   // $.noahAlert.show(text);

    $.noahAlert.alert(text)
//    var div = '<div style ="margin: 10px;padding:20px 62px;font-size:100%;">' + text + '</div>';
//    $("#div_loadtime").html(div);
//    $("#div_loadtime").dialog({
//        autoOpen: false,
//        modal: true,
//        width: 200,
//        height: 150,
//        title: "提示",
//        buttons: {}

//    });
//    $("#div_loadtime").dialog("open");
//    LoadTime.isClose = true;
//    var t = setTimeout("LoadTime.Complete()", 1000)
}

LoadTime.show = function (text, fnok) {
//    LoadTime.Complete();

    $.noahAlert.confirm(text, function () {
                        LoadTime.Begin();
                        fnok();
                    }, function () {
        LoadTime.isClose = true;
        LoadTime.Complete();

    });

//    var div = '<div style ="margin: 10px;padding:10px 20px;font-size:100%;">' + text + '</div>';
//    $("#div_loadtime").html(div);
//    $("#div_loadtime").dialog({
//        autoOpen: false,
//        modal: true,
//        width: 250,
//        height: 200,
//        title: "提示",
//        buttons: {
//            '确定': function () {
//                LoadTime.Begin();
//                fnok();
//            },
//            '取消': function () {
//                LoadTime.isClose = true;
//                LoadTime.Complete();

//            }
//        }

//    });
//    $("#div_loadtime").dialog("open");

}
