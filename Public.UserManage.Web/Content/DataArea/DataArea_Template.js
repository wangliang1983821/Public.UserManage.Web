
//创建自定义数据区弹出对话框


DataArea_Field.nodes = null;
DataArea_Field.editNodes = function (b) {

    if (!DataArea_Field.nodes) {
        DataArea_Field.nodes = new Array();
        var narray = zTreeObj.transformToArray(zTreeObj.getNodes());
        $.each(narray, function (i, n) {

            if (n.data && n.data.enable == 0) {
                DataArea_Field.nodes.push(n);
            }

        });
    }

    if (b) {
        $.each(DataArea_Field.nodes, function (i, n) {
            zTreeObj.showNode(n);
        });
    }
    else {
        $.each(DataArea_Field.nodes, function (i, n) {
            zTreeObj.hideNode(n);
        });
    }
}
DataArea_Field.CreateDialogDiv = function () {
    var d = '<div id="add-piece-dlg" title="Dialog Title" class="ui-dialog-content ui-widget-content">' + '</div>';

    $("body").append(d).find("#add-piece-dlg").hide();


    $("#add-piece-dlg").on("click", ".page-opt", function () {
        $("#CurPageOpt").val($(this).attr("data-opt"));
    });

    $("#add-piece-dlg").on("click", "#pc-cancel", function () {
        $("#add-piece-dlg").dialog("close");
    });

}
//弹出新建块
DataArea_Field.ShowDialogXinJian = function (dhtml) {
    if ($(".DivCommonSelected1").length > 0 && dhtml) {

        DataArea_Field.editNodes(false);
        $("#add-piece-dlg").html("");
        $("#add-piece-dlg").html("Load..........");
        $.ajax({
            url: AddPieceBasic,
            type: "POST",
            cache: false,
            data: "content=" + encodeURIComponent(dhtml),
            success: function (data) {

                $("#add-piece-dlg").html(data);
            }
        });



        $("#add-piece-dlg").dialog({

            autoOpen: false,
            modal: true,
            width: 600,
            height: 800,
            title: "新建块",
            close: function (event, ui) {
                var cid = $("#add-piece-dlg #CId").val();

                $.post(PieceRemoveCache, { cid: cid });
            },
            buttons: []

        });
        $("#add-piece-dlg").dialog("open");
    }
    else {
        alert("请选择");
    }



}
//弹出编辑块
DataArea_Field.ShowDialogBianji = function () {
    var id = RightMenu.PieceId();
    $("#add-piece-dlg").html("");
    $("#add-piece-dlg").html("Load..........");
    $.ajax({
        url: PieceEdit + "/" + id,
        type: "GET",
        cache: false,
        dataType: "html",
        success: function (data) {

            $("#add-piece-dlg").html(data);
        }
    });
    $("#add-piece-dlg").dialog({
        autoOpen: false,
        modal: true,
        width: 600,
        height: 800,
        title: "编辑块",
        close: function (event, ui) {
            var cid = $("#add-piece-dlg #CId").val();

            $.post(PieceRemoveCache, { cid: cid });
        }

    });
    $("#add-piece-dlg").dialog("open");
}
//弹出导入块
DataArea_Field.ShowDialogDaoRu = function () {
    $("#add-piece-dlg").html("");
    $("#add-piece-dlg").html("Load..........");
    DataArea_Field.editNodes(true);
    // $("#dialog").load("/Template/PieceSearch?r="+Math.random());
    $.ajax({
        url: PieceSearch + "?r=" + Math.random(),
        type: "GET",
        cache: false,
        dataType: "html",
        success: function (data) {
            $("#add-piece-dlg").html(data);
        }
    });
    $("#add-piece-dlg").dialog({
        bgiframe: true,
        autoOpen: false,
        modal: true,
        width: 1000,
        height: 800,
        title: "导入块",
        buttons: []

    });
    $("#add-piece-dlg").dialog("open");
}


DataArea_Field.ShowDialogView = function () {
    $("#add-piece-dlg").html("");
    if ($(".DivCommonSelected1").length > 0) {
        var dhtml = "";
        var elcopy = $(".DivCommonSelected1").clone();
        $.each($(elcopy), function (i, n) {

            dhtml += $(n).removeClass("DivCommonSelected").removeClass("DivCommonSelected1").prop("outerHTML");
        });

        var area = $('<textarea id="AreaData_SelectHtml" rows="30" cols="78"></textarea>').val(dhtml);
        $("#add-piece-dlg").append(area);

        $("#add-piece-dlg *").removeClass("DivCommonSelected");

        $("#add-piece-dlg *").removeClass("DivCommonSelected1");
        // var dhtml = $(RightMenu.SelectDiv()).prop("outerHTML");

        $("#add-piece-dlg").dialog({
            autoOpen: false,
            modal: true,
            width: 600,
            height: 800,
            title: "查看块",
            buttons: [
		  {
		      text: "新建",
		      click: function () {
		          $("#add-piece-dlg").dialog("close");
		          DataArea_Field.ShowDialogXinJian($("#AreaData_SelectHtml").val());

		      }
		  },
		  {
		      text: "取消",
		      click: function () {
		          $("#add-piece-dlg").dialog("close");
		      }
		  }
        ]

        });

        $("#add-piece-dlg").dialog("open");
    }
    else {
        alert("请选择");
    }
}


var RightMenu = (function () {
    //    var current = null; //鼠标滑过元素
    //    var selectdiv = null; //右键元素
    var menuList = []; //多个菜单时的id
    var bindElement = [];
    var deep = 0;
    var TemElement = []; //当前块元素

    //    //绑定鼠标滑过元素是的元素样式
    //    var BindElementArray3 = function (obj) {

    //                bindElement = obj;

    //                $.each(bindElement, function (i, n) {

    //                    ClickBind(MoveBind(n));

    //                });
    //                $(".div_fudong").unbind();
    //    };

    //绑定鼠标滑过是事件
    //    var MoveBind = function (n) {
    //        $(n).mouseenter(function () {

    //            $(".DivCommonSelected").removeClass("DivCommonSelected");

    //            $(this).addClass("DivCommonSelected");
    //            DataArea_Field.current = this;
    //            DataArea_Field.SetDiv(DataArea_Field.current);
    //            return false;
    //        });

    //        $(n).mouseleave(function () {

    //            $(this).removeClass("DivCommonSelected");
    //            if (DataArea_Field.isAll) {
    //                $(this).parent().addClass("DivCommonSelected");
    //                DataArea_Field.current = $(this).parent();
    //            }
    //            else {
    //                DataArea_Field.current = null;
    //            }

    //            DataArea_Field.SetDiv(DataArea_Field.current);
    //            return false;
    //        });
    //        return n;
    //    }
    //    //绑定鼠标单击是事件
    //    var ClickBind = function (n) {
    //        $(n).click(function () {

    //            if ($(DataArea_Field.current).hasClass("DivCommonSelected2") || $(DataArea_Field.current).hasClass("DivCommonSelected3")) {
    //                return false;
    //            }
    //            else {
    //                if ($(DataArea_Field.current).hasClass("DivCommonSelected1") || $(".DivCommonSelected1").length == 0) {
    //                    $(DataArea_Field.current).toggleClass("DivCommonSelected1");
    //                }
    //                else {
    //                    if ($(".DivCommonSelected1").length > 0 && ($(DataArea_Field.current).prev(".DivCommonSelected1").length > 0 || $(DataArea_Field.current).next(".DivCommonSelected1").length > 0)) {
    //                        $(DataArea_Field.current).toggleClass("DivCommonSelected1");
    //                    }
    //                    else {
    //                        $(DataArea_Field.current).removeClass("DivCommonSelected1");
    //                    }

    //                }
    //            }
    //            return false;
    //        });
    //        //绑定鼠标双击是事件

    //        $(n).dblclick(function () {
    //            if ($(DataArea_Field.current).hasClass("DivCommonSelected2") || $(DataArea_Field.current).hasClass("DivCommonSelected3")) {
    //                return false;
    //            }
    //            else {
    //                if ($(this).hasClass("DivCommonSelected1") || $(".DivCommonSelected1").length == 0) {
    //                    $(this).toggleClass("DivCommonSelected1");
    //                }
    //                else {
    //                    if ($(".DivCommonSelected1").length > 0 && ($(this).prev(".DivCommonSelected1").length > 0 || $(this).next(".DivCommonSelected1").length > 0)) {
    //                        $(this).toggleClass("DivCommonSelected1");
    //                    }
    //                    else {
    //                        $(this).removeClass("DivCommonSelected1");
    //                    }

    //                }
    //            }
    //            return false;

    //        });
    //        return n;
    //    }

    //右键菜单显示
    var rightShow = function () {
        DataArea_Field.selectdiv = DataArea_Field.current;
        if (DataArea_Field.selectdiv) {
            var id = "myMenu1";
            if (pdTemplateCss("DivCommonSelected2") || pdTemplateCss("DivCommonSelected3")) {
                id = "myMenu2";
            }

            var mw = $('body').width(), mhh = $('html').height(), mbh = $('body').height(),
            w = $('#' + id).width(), h = $('#' + id).height(),
            mh = (mhh > mbh) ? mhh : mbh; //最大高度 比较html与body的高度

            if (mh < h + DataArea_Field.my) { DataArea_Field.my = mh - h; } //超 高
            if (mw < w + DataArea_Field.mx) { DataArea_Field.mx = mw - w; } //超 宽
            $.each(menuList, function (i, n) {
                $("#" + n).hide();
            });
            $("#" + id).hide().css({ top: DataArea_Field.my - 10, left: DataArea_Field.mx - 10 }).show();
        }
    }
    //找到当前块元素
    var pdTemplateCss = function (css) {
        var b = false;
        if ($(DataArea_Field.selectdiv).parents("." + css).length > 0) {
            TemElement = $(DataArea_Field.selectdiv).parents("." + css);
            b = true;
        }
        else if ($(DataArea_Field.selectdiv).find("." + css).length > 0) {
            TemElement = $(DataArea_Field.selectdiv).find("." + css);
            b = true;
        }
        else if ($(DataArea_Field.selectdiv).hasClass(css)) {
            TemElement = $(DataArea_Field.selectdiv);
            b = true;

        }

        return b;
    }
    //删除块元素
    var ReData = function (css) {
        var u = TemElement.attr("data_temurl");
        var id = TemElement.attr("data_id");
        DataArea_Field.removeElement(id, u);

        $("[data_id='" + id + "']").removeClass("DivCommonSelected2").removeClass("DivCommonSelected3");
        //        TemElement.removeClass(css);
        //        TemElement.siblings("." + css).removeClass(css);


    }
    ////绑定自定义菜单
    ////id:自定义菜单id
    ////options:自定义菜单对象
    ////obj:需要绑定div的jquery选择器
    var Bind = function (obj, id, options) {

        options = $.extend({ menuList: [] }, options); var menuCount = options.menuList.length;

        var divMenuList = "<div id=\"" + id + "\" class=\"mengban_open\" ><ul>";
        for (var i = 0; i < menuCount; i++) {
            divMenuList += "<li  onclick=\"" + options.menuList[i].clickEvent + "\">" + options.menuList[i].menuName + "</li>";
        }
        divMenuList += "</ul><div>";

        $("body").append(divMenuList).find("#" + id).bind("mouseover", function () {
            $(".DivCommonSelected").removeClass("DivCommonSelected");
            $(DataArea_Field.selectdiv).addClass("DivCommonSelected");
            DataArea_Field.SetDiv(DataArea_Field.selectdiv);

        }).hide().find("li")
	      	.bind("mouseover", function () { $(this).addClass("current"); })
	    	.bind("mouseout", function () { $(this).removeClass("current"); });
        $(document).click(function () { $("#" + id).hide(); });
        $("#" + id).mouseleave(function () { $("#" + id).hide(); });

        menuList.push(id);
    };

    //插入块元素
    var addInclude = function (id, url) {

        var a = $($(".DivCommonSelected1").eq(0)).prev();
        var b = $(".DivCommonSelected1");

        var nurl = DataArea_Field.RootUrl + url;

        var u = DataArea_Field.Include.replace("url", url).replace("pieceid", id);

        $.get(nurl, function (data) {

            var d = $(data).addClass("DivCommonSelected2").attr("data_temurl", url).attr("data_id", id);
            $(".DivCommonSelected1").last().replaceWith(d);
            $(".DivCommonSelected1").remove()
            $(d).last().after(u);

        });
    };

    var TemplateCallBack = function (id, path, content) {

        var a = $($(".DivCommonSelected1").eq(0)).prev();
        var b = $(".DivCommonSelected1");


        var u = DataArea_Field.Include.replace("url", path).replace("pieceid", id);

        var d = b.removeClass("DivCommonSelected1").addClass("DivCommonSelected2").attr("data_temurl", path).attr("data_id", id);
        $(d).last().after(u);
        $("#add-piece-dlg").dialog("close");
    }

    //保存修改
    var saveInclude = function (url) {
        $("#DataArea_Div .DivCommonSelected").removeClass("DivCommonSelected");
        $("#DataArea_Div .DivCommonSelected1").removeClass("DivCommonSelected1");
        $("#DataArea_Div .DivCommonSelected2").remove();
        $("#DataArea_Div .DivCommonSelected3").remove();
        var cc = $("#DataArea_Div").html();

        var ids = DataArea_Field.GetPieceIds();
        //DetailName 作为保存类型，Encode作为块id字符串
        $.post(DataArea_SubUrl, { Content: cc, id: DataArea_Id, DetailName: DataArea_Type, pieceids: ids },
                  function (data) {
                      alert(data);
                      location.reload();
                  });
    };
    //预览当前页面
    var nosaveInclude = function () {
        $("#DataArea_Div .DivCommonSelected").removeClass("DivCommonSelected");
        $("#DataArea_Div .DivCommonSelected1").removeClass("DivCommonSelected1");

        $("#DataArea_Div .DivCommonSelected2").hide();
        $("#DataArea_Div .DivCommonSelected3").hide();

        var cc = $("#DataArea_Div").html();
        $("#DataArea_Div .DivCommonSelected2").show();
        $("#DataArea_Div .DivCommonSelected3").show();

        $.post(DataArea_ViewUrl, { Content: cc, DetailName: DataArea_Type, id: DataArea_Id },
                  function (data) {
                      alert(data);
                      DataArea_Field.OpenUrl(data);
                  });
    }

    return {

        //        ArrayBindDiv3: function (obj) {
        //            BindElementArray3(obj);
        //            return this;
        //        },
        eClickBind: function (obj) {
            ClickBind(obj);

            return obj;
        },
        //        eMoveBind: function (obj) {
        //            MoveBind(obj);

        //            return obj;
        //        },
        //返回右键元素
        //        SelectDiv: function () {

        //            return DataArea_Field.selectdiv;
        //        },
        ShowPointDiv: function (id) {

            if ($(id)) {
                var offset = $("#AreaData_BtnTree").offset();
                $(id).hide().css({ top: offset.top, left: offset.left, height: 200, width: 200 }).show();
            }


        },
        RightMouseShow: function () {

            rightShow();
            return this;

        },
        //当前选中div
        ////参数说明
        ////obj:需要绑定元素数组
        ////isrdown: 是否绑定全屏右键弹出菜单
        ////id:自定义菜单id
        ////options:自定义菜单内容列表操作对象
        BindRightMenu: function () {
            DataArea_Field.CreateDiv();
            DataArea_Field.CreateDialogDiv();

            document.getElementById("DataArea_Div").onmousemove = DataArea_Field.Move; //记录鼠标位置
            document.getElementById("DataArea_Div").onclick = DataArea_Field.Click;
            return this;

        },
        BindMenu: function (obj, id, options) {

            Bind(obj, id, options); //绑定自定义菜单

            return this;

        },

        TiHuanInclude: function (id, url) {

            //    url = '/templatefile/111.shtml';
            addInclude(id, url);
            $("#add-piece-dlg").dialog('close');
        },
        Save: function (url) {

            saveInclude();
        },
        NoSave: function (url) {

            nosaveInclude();
        },
        Re: function () {
            ReData("DivCommonSelected2");
            // ReData("DivCommonSelected3");
        },
        FWUrl: function (url) {
            var id = TemElement.attr("data_id");

            $.post(url, { id: id },
                function (data) {
                    alert(data);
                });
        },
        OpenUrl: function (url, p) {
            var id = TemElement.attr("data_id");
            url = url + "?pid=" + id;

            DataArea_Field.OpenUrl(url);
        },
        PieceId: function (url, p) {
            var id = TemElement.attr("data_id");
            return id;
        },
        CreateTemplateCallBack: function (id, path, content) {
          
            TemplateCallBack(id, path, content);

        }
    };


} ());



$(function ($) {

    //绑定鼠标移入移除事件

    //RightMenu.ArrayBindDiv3(DataArea_Field.e);
    RightMenu.BindRightMenu().BindMenu(DataArea_Field.e, 'myMenu1', {
        menuList: [
               { menuName: "新建块", menuclass: "1", clickEvent: "DataArea_Field.ShowDialogView()" },
			   { menuName: "导入块", menuclass: "2", clickEvent: "DataArea_Field.ShowDialogDaoRu()" },
               { menuName: "清理选中块", menuclass: "3", clickEvent: "DataArea_Field.Clear()" }

            ]
    }).BindMenu(DataArea_Field.e, 'myMenu2', {
        menuList: [
        //               { menuName: "生成", menuclass: "1", clickEvent: "RightMenu.Save()" },
        //			   { menuName: "编辑", menuclass: "2", clickEvent: "DataArea_Field.ShowDialogBianji()" },
               {menuName: "删除", menuclass: "3", clickEvent: "RightMenu.FWUrl('" + PieceDelete + "')" },
               { menuName: "推送", menuclass: "4", clickEvent: "RightMenu.OpenUrl('" + PieceAddPiecePushById + "')" },
                { menuName: "收藏", menuclass: "5", clickEvent: "RightMenu.FWUrl('" + PieceAddToFavorite + "')" },
                 { menuName: "预览", menuclass: "5", clickEvent: "RightMenu.NoSave()" },
                  { menuName: "重置数据区", menuclass: "5", clickEvent: "RightMenu.Re()" }
            ]
    });
   
    DataArea_Field.PieceInit();
    document.oncontextmenu = function () {

        RightMenu.RightMouseShow();

        return false;
    } //屏蔽右键
});

