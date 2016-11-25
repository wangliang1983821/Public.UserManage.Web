
//创建自定义数据区弹出对话框
DataArea_Field.DialogClose = function () {
    loadingPartial.close();
}


DataArea_Field.IsChange = false;


DataArea_Field.TopContent = "";

DataArea_Field.IsMany = false;


DataArea_Field.ShowDialogXinJian = function () {

    DataArea_Field.TopContent = "";

    DataArea_Field.IsMany = false;

    $("#DataArea_openDialog").html("");
    //    var area = '<textarea id="Data_dialog_Area" rows="20" cols="78"></textarea>';
    //    $("#DataArea_openDialog").append(area);

    var area = '<iframe frameborder="0" name="DataArea_iframe1" id="DataArea_iframe1" src="' + iframeurl + '" width="100%" height="100%"></iframe>';
    $("#DataArea_openDialog").append(area);

    if ($(".DivCommonSelected1").length == 0) {
       
        DataArea_Field.TopContent = $(DataArea_Field.selectdiv).prop("outerHTML");
        DataArea_Field.IsMany = false;

    }
    else {
        if ($(".DivCommonSelected1").length > 0) {
            var dhtml = "";
            var elcopy = $(".DivCommonSelected1").clone();
            $.each($(elcopy), function (i, n) {

                dhtml += $(n).removeClass("DivCommonSelected").removeClass("DivCommonSelected1").prop("outerHTML");
            });


            DataArea_Field.TopContent = dhtml;
         

            DataArea_Field.IsMany = true;
        }
    }

    loadingPartial.loading();
}






DataArea_Field.ShowDialogXinJianClick = function (content) {
    DataArea_Field.Setonbeforeunload();


    // $(DataArea_Field.selectdiv).replaceWith($("#Data_dialog_Area").val());
    if (DataArea_Field.IsMany) {
        $(".DivCommonSelected1").last().replaceWith(content);
        $(".DivCommonSelected1").remove();
    }
    else {
        $(DataArea_Field.selectdiv).replaceWith(content);

    }

    DataArea_Field.IsChange = true;
    DataArea_Field.DialogClose();
}




var RightMenu = (function () {

    var menuList = []; //多个菜单时的id
    var bindElement = [];
    var deep = 0;
    var TemElement = []; //当前块元素



    //右键菜单显示
    var rightShow = function () {
        DataArea_Field.selectdiv = DataArea_Field.current;
        if (DataArea_Field.selectdiv) {
            var id = "myMenu1";
            if (pdTemplateCss("DivCommonSelected2") || pdTemplateCss("DivCommonSelected3")) {
                id = "myMenu2";
                return;
            }
            $("#" + id).css("z-index", "" + (1000000000 + 10));
            var mw = $('body').width(), mhh = $('html').height(), mbh = $('body').height(),
            w = $('#' + id).width(), h = $('#' + id).height(),
            mh = (mhh > mbh) ? mhh : mbh; //最大高度 比较html与body的高度

            //            if (mh < h + DataArea_Field.my) { DataArea_Field.my = mh - h; } //超 高
            //            if (mw < w + DataArea_Field.mx) { DataArea_Field.mx = mw - w; } //超 宽
            $.each(menuList, function (i, n) {
                $("#" + n).hide();
            });

          //  $("#" + id).hide().css({ top: DataArea_Field.my - 10, left: DataArea_Field.mx - 10 }).show();


            setTimeout(function () { $("#" + id).hide().css({ top: DataArea_Field.my - 10, left: DataArea_Field.mx - 10 }).show(); }, 100); 

        }
    }

    var pdTemplateCss = function (css) {
        var b = false;
        if ($(DataArea_Field.current).parents("." + css).length > 0) {
            TemElement = $(DataArea_Field.current).parents("." + css);
            b = true;
        }
        else if ($(DataArea_Field.current).find("." + css).length > 0) {
            TemElement = $(DataArea_Field.current).find("." + css);
            b = true;
        }
        else if ($(DataArea_Field.current).hasClass(css)) {
            TemElement = $(DataArea_Field.current);
            b = true;

        }

        return b;
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

        $("#DataArea_NoSelect").append(divMenuList).find("#" + id).bind("mouseover", function () {
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


    var deleteInclude = function () {
        $(DataArea_Field.selectdiv).hide();
    };
    var saveInclude = function (url) {
        $(".DivCommonSelected").removeClass("DivCommonSelected");
        $(".DivCommonSelected1").removeClass("DivCommonSelected1");
        $(".DivCommonSelected2").remove();
        $(".DivCommonSelected3").remove();
        var cc = document.documentElement.outerHTML;

        $("#span_tmpurl").html(DataArea_LoadPath);
        $.post(DataArea_SaveUrl, { Content: encodeURIComponent(cc), id: DataArea_Id },
                  function (data) {
                      alert(data);
                      window.onbeforeunload = null;
                      location.reload();
                  });
    };

    var nosaveInclude = function (url) {
        $(".DivCommonSelected").removeClass("DivCommonSelected");
        $("#DataArea_Div .DivCommonSelected1").removeClass("DivCommonSelected1");

        //$(".DivCommonSelected2").hide();
        //$(".DivCommonSelected3").hide();
       

        var dev = $(document.documentElement).clone();

        $(".DivCommonSelected2", dev).remove();
        $(".DivCommonSelected3", dev).remove();

        var cc = dev.remove(".DivCommonSelected2").remove(".DivCommonSelected3").prop("outerHTML");


        //var cc = document.documentElement.outerHTML;
        //$(".DivCommonSelected2").show();
        //$(".DivCommonSelected3").show();
        $.post(DataArea_ViewUrl, { Content: encodeURIComponent(cc), id: DataArea_Id },
                  function (data) {

                      DataArea_Field.OpenUrl(data);
                  });
    };
    var fabuInclude = function (url) {

        $.post(DataArea_SubUrl, { id: DataArea_Id },
                  function (data) {
                      alert(data);
                      //                      location.reload();
                  });
    };

    return {

        ArrayBindDiv3: function (obj) {
            BindElementArray3(obj);
            return this;
        },
        eClickBind: function (obj) {
            ClickBind(obj);

            return obj;
        },



        ShowPointDiv: function (id) {

            if ($(id)) {

                $(id).hide().css({ top: DataArea_Field.my - 20, left: DataArea_Field.mx - 20, height: 200, width: 200 }).show();
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


            document.body.onmousemove = DataArea_Field.Move; //记录鼠标位置

            document.body.onclick = DataArea_Field.Click;

            //            document.body.onclick = DataArea_Field.Click;

            document.getElementById("DataArea_NoSelect").onmousemove = function (e) {
                $("#div_fudong_id").hide();
                if (e && e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    window.event.cancelBubble = true;
                }
            }
                        document.getElementById("DataArea_NoSelect").onclick = function (e) {
                            $("#div_fudong_id").hide();
                            if (e && e.stopPropagation) {
                                e.stopPropagation();
                            } else {
                                window.event.cancelBubble = true;
                            }
                        }
            return this;

        },
        BindMenu: function (obj, id, options) {

            Bind(obj, id, options); //绑定自定义菜单

            return this;

        },


        Save: function (url) {

            saveInclude(DataArea_TemplatePath);
        },
        NoSave: function (url) {

            nosaveInclude(DataArea_TemplatePath);
        },
        FaBu: function (url) {

            if (DataArea_Field.IsChange) {
                alert("有未保存修改，请保存修改");
                return;
            }
            fabuInclude();

        },
        Delete: function () {
            var b = true;

            b = confirm("是否确定删除");


            if (b) {
                deleteInclude();
            }

        }
    };


} ());



$(function ($) {
    //绑定鼠标移入移除事件

    RightMenu.BindRightMenu().BindMenu(DataArea_Field.e, 'myMenu1', {
        menuList: [
               { menuName: "编辑", menuclass: "1", clickEvent: "DataArea_Field.ShowDialogXinJian()" },
                     { menuName: "删除", menuclass: "5", clickEvent: "RightMenu.Delete()" },
                { menuName: "保存", menuclass: "6", clickEvent: "RightMenu.Save()" },
                    { menuName: "清理选中块", menuclass: "3", clickEvent: "DataArea_Field.Clear()" }

        ]
    });
 
    DataArea_Field.PieceInit();
    document.oncontextmenu = function () {

        RightMenu.RightMouseShow();

        return false;
    } //屏蔽右键

    window.onbeforeunload = null;
});

