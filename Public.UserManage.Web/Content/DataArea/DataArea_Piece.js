

//创建自定义数据区弹出对话框
DataArea_Field.pieceinclude = [];
DataArea_Field.Pieces = new Array();

DataArea_Field.showdata = "";
DataArea_Field.DialogClose = function () {
    loadingPartial.close();
}
DataArea_Field.CreateDialogDiv = function () {


}
DataArea_Field.ShowDialogXinJian = function () {

    //    var h = "";
    //        var copy = $(".DivCommonSelected2").clone();

    //        var copyr = $(copy).remove(".DivCommonSelected3");

    //        $(copyr).each(function (i, n) {
    //            ;
    //            h += $(n).removeClass("DivCommonSelected2").prop("outerHTML");
    //        });


    //    var hc = $("#DataArea_Piece_View").clone();
    //   
    //    var copyr = $(hc).find(".DivCommonSelected3").remove();
    //    $(hc).find(".DivCommonSelected2").removeClass("DivCommonSelected2").html();
    //    h = $(hc).html();
    var h = $("#DataArea_Piece_View").val();

    $("#DataArea_openDialog").html("");
    var area = '<textarea id="Data_dialog_Area" rows="30" cols="78" style="width: 100%; height:390px;"></textarea>';
    $("#DataArea_openDialog").append(area);
    //$('#Data_dialog_Area').xheditor({ tools: 'Source,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,Link,Unlink,Anchor,Img,Preview', upImgUrl: imageupload, upImgExt: "jpg,jpeg,gif,png" });


    $('#Data_dialog_Area').xheditor({ tools: 'Source,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,Link,Unlink,Img,Flash,Preview', upImgUrl: imageupload, upImgExt: "jpg,jpeg,gif,png", upFlashUrl: flashupload, upFlashExt: "swf" });

    var button = '<div class="submit"><input type="button" onclick ="DataArea_Field.ShowDialogXinJianText()" class="button_org_b button_90_30" value="文本" /><input type="button" onclick ="DataArea_Field.Edit()" class="button_org_b button_90_30" value="确定" /><input type="button" id="btn_Close" onclick="DataArea_Field.DialogClose()" class="button_gray_b button_90_30" value="取消" /></div>';


    $("#DataArea_openDialog").append(button);

    $("#Data_dialog_Area").val("");


    $("#Data_dialog_Area").val(h);
    loadingPartial.loading();



}


DataArea_Field.ShowDialogXinJianText = function () {


    var h = $("#DataArea_Piece_View").val();

    $("#DataArea_openDialog").html("");
    var area = '<textarea id="Data_dialog_Area" rows="30" cols="78" style="width: 100%; height:390px;"></textarea>';
    $("#DataArea_openDialog").append(area);
    //$('#Data_dialog_Area').xheditor({ tools: 'Source,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,Link,Unlink,Anchor,Img,Preview', upImgUrl: imageupload, upImgExt: "jpg,jpeg,gif,png" });



    var button = '<div class="submit"><input type="button" onclick ="DataArea_Field.ShowDialogXinJian()" class="button_org_b button_90_30" value="编辑器" /><input type="button" onclick ="DataArea_Field.Edit()" class="button_org_b button_90_30" value="确定" /><input type="button" id="btn_Close" onclick="DataArea_Field.DialogClose()" class="button_gray_b button_90_30" value="取消" /></div>';


    $("#DataArea_openDialog").append(button);

    $("#Data_dialog_Area").val("");


    $("#Data_dialog_Area").val(h);
    loadingPartial.loading();



}


DataArea_Field.ShowDialogSave = function () {

    //    var hc = $("#DataArea_Piece_View").clone();

    //    var copyr = $(hc).find(".DivCommonSelected3").remove();
    //    $(hc).find(".DivCommonSelected2").removeClass("DivCommonSelected2").html();
    //    h = $(hc).html();


    var h = $("#DataArea_Piece_View").val();
    $("#DataArea_openDialog").html("");
    var area = '<textarea id="Data_dialog_Area" rows="20" cols="78"></textarea>';
    $("#DataArea_openDialog").append(area);

    var button = '<div class="submit"><input type="button" onclick ="DataArea_Field.Save()" class="button_org_b button_90_30" value="确定" /><input type="button" id="btn_Close" onclick="DataArea_Field.DialogClose()" class="button_gray_b button_90_30" value="取消" /></div>';


    $("#DataArea_openDialog").append(button);

    $("#Data_dialog_Area").val("");


    $("#Data_dialog_Area").val(h);
    loadingPartial.loading();
}

DataArea_Field.Edit = function () {

    // var html = $($("#Data_dialog_Area").val()).addClass("DivCommonSelected2");
    //  $(".DivCommonSelected2").replaceWith($(html).prop("outerHTML"));
    var html = $("#Data_dialog_Area").val();
    $("#DataArea_Piece_View").val(html);
    // DataArea_Field.LoadPieceInclude($("#DataArea_Piece_View"));
    var data = html;
    var subdata = DataArea_Field.LoadPieceInclude(data);
    subdata = DataArea_Field.stripscript(subdata);
    subdata = DataArea_Field.stripzhushi(subdata);
    DataArea_Field.SetShow(subdata);

    DataArea_Field.DialogClose();
    DataArea_Field.Setonbeforeunload();
}

DataArea_Field.Save = function () {

    var h = $("#Data_dialog_Area").val();
    //    var copy = $(".DivCommonSelected2").clone();
    //    $(copy).each(function (i, n) {
    //        ;
    //        h += $(n).removeClass("DivCommonSelected2").prop("outerHTML");
    //    });

    $.post(DataArea_PieceSub, { content: encodeURIComponent(h), pid: DataArea_PieceId },
                  function (data) {

                      alert(data.message);
                      window.onbeforeunload = null;
                      location.reload();
                  })

}


DataArea_Field.PieceInit = function () {

    var i, o, s = DataArea_Field.getCommentNodes(document);

    for (i = 0; o = s[i]; i++) {

        /// <reference path="../../test.shtml" />
        DataArea_Field.o.push(o);

    }

    $.each(DataArea_Field.o, function (i, n) {
        //        var u = n.data.split('"')[1];
        //        var id = n.data.split('"')[3];

        DataArea_Field.exec_url = /file="(.+?)"/gi;
        DataArea_Field.exec_id = /data_id="(\d+?)"/gi;
        var arrid = DataArea_Field.exec_id.exec(n.data);
        var arrurl = DataArea_Field.exec_url.exec(n.data);

        if (arrid && arrurl) {
            var u = arrurl[1];
            var id = arrid[1];
            if (id && u) {

                if (DataArea_PieceId == id) {



                    var url = DataArea_SubUrl + "/" + id;
                    $.get(url, function (data) {

                        var d = $("<input id='DataArea_Piece_View' name='DataArea_Piece_View' type ='hidden'  value=''/>").val(data);

                        // var d = $("<div id='DataArea_Piece_View' data='DataArea_Piece_View'></div>").append($(data).addClass("DivCommonSelected2").attr("data_id", id));
                        // var d= d = DataArea_Field.LoadPieceInclude(data);

                        var subdata = DataArea_Field.LoadPieceInclude(data);
                        subdata = DataArea_Field.stripscript(subdata);
                        subdata = DataArea_Field.stripzhushi(subdata);


                        DataArea_Field.AddPiece(n, d);
                        DataArea_Field.Pieces.push(d);

                        DataArea_Field.SetShow(subdata);

                    });


                }
                else {


                    $.post(DataArea_GetPieceFileString, { url: u, encode: DataArea_Encode },
                       function (data) {
                           data = DataArea_Field.LoadPieceInclude(data);

                           // data = $(d).html();

                           data = DataArea_Field.stripscript(data);
                           data = DataArea_Field.stripzhushi(data);


                           var d = $(data).addClass("DivCommonSelected3").attr("data_temurl", u).attr("data_id", id);

                           $(d).mouseenter(function () {
                               $("#span_tmpurl").html(u);


                           }).mouseleave(function () {
                               $("#span_tmpurl").html('');

                           });
                           //                           if (n.previousSibling) {
                           //                               $(n.previousSibling).after(d);
                           //                           }
                           //                           else {
                           //                               $(n.parentNode).prepend(d);
                           //                           }

                           DataArea_Field.AddPiece(n, d);

                           if (DataArea_Field.showdata) {

                               DataArea_Field.SetShow(DataArea_Field.showdata);
                           }

                       });

                }
            }
        }
    });
}


DataArea_Field.getPieceCommentNodes = function (e) {
    //不支持的需要遍历

    switch (e.nodeType) {
        case 8:

            if (e.data.indexOf("#include") >= 0) {
                return [e]; //注释节点直接返回
            }

        case 1: case 9: //文档或元素需要遍历子节点
            var i, s = e.childNodes, l = s.length, result = [];
            for (i = 0; i < s.length; i++) //递归每个子节点
            {
                var oa = DataArea_Field.getPieceCommentNodes(s[i]);
                if (oa) {
                    result.push(oa);
                }

            }
            return Array.prototype.concat.apply([], result); //合并子数组
    };
};

//DataArea_Field.LoadPieceInclude = function (data) {

//    var dd = data = $(data)[0];
//    DataArea_Field.pieceinclude = [];
//    var s = DataArea_Field.getPieceCommentNodes(dd);

//    for (i = 0; o = s[i]; i++) {

//        /// <reference path="../../test.shtml" />
//        DataArea_Field.pieceinclude.push(o);

//    }
//   
//    $.each(DataArea_Field.pieceinclude, function (i, n) {

//        DataArea_Field.exec_url = /file="(.+?)"/gi;
//        var arrurl = DataArea_Field.exec_url.exec(n.data);
//        if (arrurl) {
//            var u = arrurl[1];
//            if (u) {
//                var url = DataArea_Field.RootUrl + u;


//                var data = $.ajax({
//                    type: "POST",
//                    url: DataArea_GetPieceFileString,
//                    data: "url=" + u + "&encode=" + DataArea_Encode,
//                    async: false
//                }).responseText;


//                var d = $(data).addClass("DivCommonSelected3").attr("data_temurl", u);


//                if (n.previousSibling) {
//                    $(n.previousSibling).after(d);
//                }
//                else {
//                    $(n.parentNode).prepend(d);
//                }
//                $(d).mouseenter(function () {

//                    $("#span_tmpurl").html(u);


//                }).mouseleave(function () {
//                    $("#span_tmpurl").html('');

//                });


//            }
//        }
//    })

//    DataArea_Field.SetShow();
//}


DataArea_Field.LoadPieceInclude = function (data) {

    var d = $("<div id='DataArea_Piece_Edit' data='DataArea_Piece_Edit'></div>").append($(data).addClass("DivCommonSelected2"));


    var dd = data = d[0];
    DataArea_Field.pieceinclude = [];

    var s = DataArea_Field.getPieceCommentNodes(dd);

    if (s) {
        for (i = 0; o = s[i]; i++) {

            /// <reference path="../../test.shtml" />
            DataArea_Field.pieceinclude.push(o);

        }
    }


    $.each(DataArea_Field.pieceinclude, function (i, n) {

        DataArea_Field.exec_url = /file="(.+?)"/gi;
        var arrurl = DataArea_Field.exec_url.exec(n.data);
        if (arrurl) {
            var u = arrurl[1];

            if (u) {
                var url = DataArea_Field.RootUrl + u;


                var data = $.ajax({
                    type: "POST",
                    url: DataArea_GetPieceFileString,
                    data: "url=" + u + "&encode=" + DataArea_Encode,
                    async: false
                }).responseText;



                var zpid = $.ajax({
                    type: "POST",
                    url: GetPieceIdByUrl,
                    data: "url=" + u,
                    async: false
                }).responseText;


                if (DataArea_PieceId == zpid) {
                    var d = $("<input id='DataArea_Piece_View' type ='hidden'  value=''/>").val(data);

                    // var d = $("<div id='DataArea_Piece_View' data='DataArea_Piece_View'></div>").append($(data).addClass("DivCommonSelected2").attr("data_id", id));
                    // var d= d = DataArea_Field.LoadPieceInclude(data);

                    var subdata = DataArea_Field.LoadPieceInclude(data);
                    subdata = DataArea_Field.stripscript(subdata);
                    subdata = DataArea_Field.stripzhushi(subdata);


                    DataArea_Field.AddPiece(n, d);
                    DataArea_Field.Pieces.push(d);

                    DataArea_Field.showdata = subdata;

                }
                else {

                    var d = DataArea_Field.LoadPieceInclude(data);
                    d = $(d).addClass("DivCommonSelected2").attr("data_temurl", u);


                    if (n.previousSibling) {
                        $(n.previousSibling).after(d);
                    }
                    else {
                        $(n.parentNode).prepend(d);
                    }
                    $(d).mouseenter(function () {

                        $("#span_tmpurl").html(u);


                    }).mouseleave(function () {
                        $("#span_tmpurl").html('');

                    });
                }




            }
        }
    })


    return $(d).html();

}


DataArea_Field.SetShow = function (data) {

    if ($("[data='pieceview']").length > 0) {
        $("[data='pieceview']").remove();
    }

    // $("#DataArea_Piece_View").hide();
    // var a = $("#DataArea_Piece_View").clone();
    var a = $(data);

    // $(a).children().attr("data", "pieceview");

    $(a).attr("data", "pieceview")
    $($(a)[0]).attr("id", "DataArea_area")
    //var b = $(a).html();
    var b = $(a);

    $("#DataArea_Piece_View").after(b);

    DataArea_Field.GotoActive();

}

DataArea_Field.GotoActive = function () {
    document.getElementById('DataArea_area').scrollIntoView();
}

$(function ($) {
    //绑定鼠标移入移除事件
    DataArea_Field.CreateDialogDiv();

    DataArea_Field.PieceInit();

    window.onbeforeunload = null;

   
});

