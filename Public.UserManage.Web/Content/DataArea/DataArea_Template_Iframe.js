
jQuery.Hashtable = function() {
 	    this.items = new Array();
 	    this.itemsCount = 0;
 	    this.add = function(key, value) {
 	        if (!this.containsKey(key)) {
 	            this.items[key] = value;
 	            this.itemsCount++;
 	        }
 	        else
 	            throw "key '" + key + "' allready exists."
 	    }
 	    this.get = function(key) {
 	        if (this.containsKey(key))
 	            return this.items[key];
 	        else
 	            return null;
 	    }
 	  
 	    this.remove = function(key) {
 	        if (this.containsKey(key)) {
 	            delete this.items[key];
 	            this.itemsCount--;
 	        }
 	        else
 	            throw "key '" + key + "' does not exists."
 	    }
 	    this.containsKey = function(key) {
 	        return typeof (this.items[key]) != "undefined";
 	    }
 	    this.containsValue = function containsValue(value) {
 	        for (var item in this.items) {
 	            if (this.items[item] == value)
 	                return true;
 	        }
 	        return false;
 	    }
 	    this.contains = function(keyOrValue) {
 	        return this.containsKey(keyOrValue) || this.containsValue(keyOrValue);
 	    }
 	    this.clear = function() {
 	        this.items = new Array();
 	        itemsCount = 0;
 	    }
 	    this.size = function() {
 	        return this.itemsCount;
 	    }
 	    this.isEmpty = function() {
 	        return this.size() == 0;
 	    }
 	};


 
//创建自定义数据区弹出对话框
 	DataArea_Field = DataArea_Field || {};
 	
 
 	DataArea_Field.hashTable = new jQuery.Hashtable();
DataArea_Field.iframe = '<iframe src="iframe_url"  id="iframepage" frameborder="0" height="600" width="900" marginheight="0" marginwidth="0" ></iframe>';
DataArea_Field.iFrameHeight = function (x, y) {
    var ifm = document.getElementById("iframepage");
   
    ifm.height = y;
    ifm.width = x;
    //    var ifm = document.getElementById("iframepage");
    //    var subWeb = document.frames ? document.frames["iframepage"].document : ifm.contentDocument;
    //    if (ifm != null && subWeb != null) {
    //        ifm.height = subWeb.body.scrollHeight;
    //        ifm.width = subWeb.body.scrollWidth;
    //    }
}
DataArea_Field.DialogClose = function () {
    loadingPartial.close();
}

DataArea_Field.CreateDialogDiv = function () {

}


//弹出编辑
DataArea_Field.TopContent = "";

DataArea_Field.IsMany = false;

DataArea_Field.ShowDialogEdit = function () {

    DataArea_Field.TopContent = "";

    DataArea_Field.IsMany = false;
    if ($(".DivCommonSelected1").length == 0) {
        alert("请选择");
        return;
    }
    $("#DataArea_openDialog").html("");
    //    var area = '<textarea id="Data_dialog_Area" rows="20" cols="78"></textarea>';
    //    $("#DataArea_openDialog").append(area);

    var iframepage = DataArea_Field.iframe.replace(/iframe_url/, DataArea_IframeUrl + "?type=3");
    $("#DataArea_openDialog").append(iframepage);
    loadingPartial.loading(550, 200);

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

DataArea_Field.ShowDialogEditClick = function (content) {
    DataArea_Field.Setonbeforeunload();


    // $(DataArea_Field.selectdiv).replaceWith($("#Data_dialog_Area").val());
    if (DataArea_Field.IsMany) {
        $(".DivCommonSelected1").last().replaceWith(content);
        $(".DivCommonSelected1").remove();
    }
    else {
        $(DataArea_Field.selectdiv).replaceWith(content);

    }


    DataArea_Field.DialogClose();
}



//弹出导入块
DataArea_Field.ShowDialogDaoRu = function () {
    $("#DataArea_openDialog").html("");

    var iframepage = DataArea_Field.iframe.replace(/iframe_url/, DataArea_IframeUrl + "?type=2");
    $("#DataArea_openDialog").append(iframepage);
    loadingPartial.loading(550, 200);
 
//    $("#openDialog").hide().css({ top: DataArea_Field.my - 200, left: DataArea_Field.mx - 500, height: 800, width: 1200 }).show();
 
}


DataArea_Field.ShowDialogView = function () {
    $("#DataArea_openDialog").html("");
    if ($(".DivCommonSelected1").length > 0) {
        var dhtml = "";
        $(".DivCommonSelected").removeClass("DivCommonSelected");
        var elcopy = $(".DivCommonSelected1").clone();

        var bd = $("<div id='DataArea_Piece_View' data='DataArea_Piece_View'></div>").append($(elcopy));



      
        $.each($(elcopy), function (i, n) {

            dhtml += $(n).removeClass("DivCommonSelected").removeClass("DivCommonSelected1").prop("outerHTML");
        });

        var area = $('<input type ="hidden" id="AreaData_SelectHtml" />').val(dhtml);
        $("#DataArea_openDialog").append(area);
        $("#DataArea_openDialog").append(area);
        var iframepage = DataArea_Field.iframe.replace(/iframe_url/, DataArea_IframeUrl + "?type=1");
        $("#DataArea_openDialog").append(iframepage);

        loadingPartial.loading(460,100);
       // $("#DataArea_loadlayer").hide().css({ top: DataArea_Field.my - 200, left: DataArea_Field.mx - 500, height: 800, width: 1200 }).show();

    }
    else {
        alert("请选择");
    }
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
            }
            $("#" + id).css("z-index", "" + (1000000000 + 10));
            var mw = $('body').width(), mhh = $('html').height(), mbh = $('body').height(),
            w = $('#' + id).width(), h = $('#' + id).height(),
            mh = (mhh > mbh) ? mhh : mbh; //最大高度 比较html与body的高度

            if (mh < h + DataArea_Field.my) { DataArea_Field.my = mh - h; } //超 高
            if (mw < w + DataArea_Field.mx) { DataArea_Field.mx = mw - w; } //超 宽
            $.each(menuList, function (i, n) {
                $("#" + n).hide();
            });


            setTimeout(function () { $("#" + id).hide().css({ top: DataArea_Field.my - 10, left: DataArea_Field.mx - 10 }).show(); }, 100);



        }
    }
    //找到当前块元素
    var pdTemplateCss = function (css) {
        var b = false;
        if ($(DataArea_Field.selectdiv).hasClass(css)) {
            TemElement = $(DataArea_Field.selectdiv);
            b = true;

        }
        else if ($(DataArea_Field.selectdiv).parents("." + css).length > 0) {
            TemElement = $(DataArea_Field.selectdiv).parents("." + css);
            b = true;
        }
        else if ($(DataArea_Field.selectdiv).find("." + css).length > 0) {
            TemElement = $(DataArea_Field.selectdiv).find("." + css);
            b = true;
        }
        //else if ($(DataArea_Field.selectdiv).hasClass(css)) {
        //    TemElement = $(DataArea_Field.selectdiv);
        //    b = true;

        //}

        return b;
    }
    //删除块元素
    var ReData = function (css) {
        var u = TemElement.attr("data_temurl");
        var id = TemElement.attr("data_id");
        DataArea_Field.removeElement(id, u);

        $("[data_id='" + id + "']").removeClass("DivCommonSelected2").removeClass("DivCommonSelected3");



    }

    var ReInclude = function () {
        var u = TemElement.attr("data_temurl");
        var id = TemElement.attr("data_id");
        var content = DataArea_Field.hashTable.get(id);


        //        $("[data_id='" + id + "']").removeClass("DivCommonSelected2").removeClass("DivCommonSelected3");

        if (content) {
            $("[data_id='" + id + "']").last().replaceWith($(content).removeClass("DivCommonSelected").removeClass("DivCommonSelected1"));
            $("[data_id='" + id + "']").remove();
            DataArea_Field.removeElement(id, u);

            DataArea_Field.hashTable.remove(id);
        }
        else {
            alert("不能重置");
        }
    }

    var ReductionData = function () {
        if (pdTemplateCss("DivCommonSelected3")) {
            ReData();
            return;

        }
        if (pdTemplateCss("DivCommonSelected2")) {
            ReInclude();
            return;

        }

        alert("重置失败");

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

    //插入块元素
    var addInclude = function (id, url) {
        DataArea_Field.Setonbeforeunload();
        var a = $($(".DivCommonSelected1").eq(0)).prev();
        var b = $(".DivCommonSelected1");

        var nurl = DataArea_Field.RootUrl + url;
        var u = DataArea_Field.Include.replace("url", url).replace("pieceid", id);

        $.post(DataArea_GetPieceFileString, { url: url, encode: DataArea_Encode },
                       function (data) {

                           data = DataArea_Field.stripscript(data);
                           AddCache(id);
                           var d = $(data).addClass("DivCommonSelected2").attr("data_temurl", url).attr("data_id", id);

                           $(d).mouseenter(function () {

                               $("#span_tmpurl").html(nurl);


                           }).mouseleave(function () {
                               $("#span_tmpurl").html('');

                           });



                           $(".DivCommonSelected1").last().replaceWith(d);
                           $(".DivCommonSelected1").remove();
                           $(d).last().after(u);
                       });

        //        $.get(nurl, function (data) {

        //            data = DataArea_Field.stripscript(data);
        //            AddCache(id);
        //            var d = $(data).addClass("DivCommonSelected2").attr("data_temurl", url).attr("data_id", id);

        //            $(d).mouseenter(function () {

        //                $("#span_tmpurl").html(nurl);


        //            }).mouseleave(function () {
        //                $("#span_tmpurl").html('');

        //            });



        //            $(".DivCommonSelected1").last().replaceWith(d);
        //            $(".DivCommonSelected1").remove()
        //            $(d).last().after(u);

        //        });
    };

    var AddCache = function (id) {
        if (!DataArea_Field.hashTable.containsKey(id)) {
            var phtml = "";
            var elcopy = $(".DivCommonSelected1").clone();
            $.each($(elcopy), function (i, n) {

                phtml += $(n).removeClass("DivCommonSelected").removeClass("DivCommonSelected1").prop("outerHTML");
            });
            DataArea_Field.hashTable.add(id, phtml);
        }
    }

    var TemplateCallBack = function (id, path, content) {
        DataArea_Field.Setonbeforeunload();
        var a = $($(".DivCommonSelected1").eq(0)).prev();
        var b = $(".DivCommonSelected1");


        var u = DataArea_Field.Include.replace("url", path).replace("pieceid", id);
        AddCache(id);
        var d = b.removeClass("DivCommonSelected1").addClass("DivCommonSelected2").attr("data_temurl", path).attr("data_id", id);
        $(d).mouseenter(function () {

            $("#span_tmpurl").html(path);


        }).mouseleave(function () {
            $("#span_tmpurl").html('');

        });
        $(d).last().after(u);
        DataArea_Field.DialogClose();


    }

    //保存修改
    var saveInclude = function (url) {
        $(".DivCommonSelected").removeClass("DivCommonSelected");
        $(".DivCommonSelected1").removeClass("DivCommonSelected1");
        $(".DivCommonSelected2").remove();
        $(".DivCommonSelected3").remove();
        var cc = document.documentElement.outerHTML;
       
        var ids = DataArea_Field.GetPieceIds();
        DataArea_Field.zpids = DataArea_Field.zpids.substring(0, DataArea_Field.zpids.length - 1)
        ids = ids + "," + DataArea_Field.zpids;
        $("#span_tmpurl").html(DataArea_DataAreaLoadPath);


        //DetailName 作为保存类型，Encode作为块id字符串
        $.post(DataArea_SubUrl, { Content: encodeURIComponent(cc), id: DataArea_Id, DetailName: DataArea_Type, pieceids: ids },
                  function (data) {
                      alert(data);
                      window.onbeforeunload = null;
                      location.reload();
                  });
    };
    //预览当前页面
    var nosaveInclude = function () {
        $(".DivCommonSelected").removeClass("DivCommonSelected");
        $(".DivCommonSelected1").removeClass("DivCommonSelected1");

        //$(".DivCommonSelected2").hide();
        //$(".DivCommonSelected3").hide();

      //  var cc = document.documentElement.outerHTML;
      
        var dev = $(document.documentElement).clone();

        $(".DivCommonSelected2", dev).remove();
        $(".DivCommonSelected3", dev).remove();

        var cc = dev.prop("outerHTML");

      

        //alert($(document.documentElement).clone().remove(".DivCommonSelected2").remove(".DivCommonSelected3").prop("outerHTML"));


        //$(".DivCommonSelected2").show();
        //$(".DivCommonSelected3").show();

        $.post(DataArea_ViewUrl, { Content: encodeURIComponent(cc), DetailName: DataArea_Type, id: DataArea_Id, Encode: DataArea_Encode },
                  function (data) {


                      DataArea_Field.OpenUrl(data);
                  });
    }

    return {


        eClickBind: function (obj) {
            ClickBind(obj);

            return obj;
        },

        ShowPointDiv: function (id) {

            if ($(id)) {
                var offset = $("#AreaData_BtnTree").offset();
                $(id).hide().css({ top: offset.top, left: offset.left, width: 200 }).show();
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

            document.body.onmousemove = DataArea_Field.Move; //记录鼠标位置


            document.body.onclick = DataArea_Field.Click;

            document.body.ondblclick = DataArea_Field.dbClick;

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

        TiHuanInclude: function (id, url) {


            addInclude(id, url);
            DataArea_Field.DialogClose();
        },
        Save: function (url) {

            saveInclude();
        },
        NoSave: function (url) {

            nosaveInclude();
        },
        Re: function () {
            //            ReData("DivCommonSelected2");
            ReductionData();
        },
        FWUrl: function (url, text) {
            var b = true;
            if (text) {
                b = confirm(text);
            }

            if (b) {
                var id = TemElement.attr("data_id");

                $.post(url, { id: id },
                function (data) {

                    alert(data.message);
                });
            }
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


    RightMenu.BindRightMenu().BindMenu(DataArea_Field.e, 'myMenu1', {
        menuList: [

          { menuName: "编辑内容", menuclass: "0", clickEvent: "DataArea_Field.ShowDialogEdit()" },
               { menuName: "新建块", menuclass: "1", clickEvent: "DataArea_Field.ShowDialogView()" },
			   { menuName: "导入块", menuclass: "2", clickEvent: "DataArea_Field.ShowDialogDaoRu()" },
               { menuName: "清理选中块", menuclass: "3", clickEvent: "DataArea_Field.Clear()" }


               
            ]
    }).BindMenu(DataArea_Field.e, 'myMenu2', {
        menuList: [

               //{ menuName: "删除", menuclass: "3", clickEvent: "RightMenu.FWUrl('" + DataArea_PieceDelete + "','"+"是否确认删除"+"')" },
               { menuName: "推送", menuclass: "4", clickEvent: "RightMenu.OpenUrl('" + DataArea_PieceAddPiecePushById + "')" },
                { menuName: "收藏", menuclass: "5", clickEvent: "RightMenu.FWUrl('" + DataArea_PieceAddToFavorite + "')" },
                 { menuName: "预览", menuclass: "5", clickEvent: "RightMenu.NoSave()" },
                  { menuName: "重置导入块", menuclass: "5", clickEvent: "RightMenu.Re()" }
            ]
    });

    DataArea_Field.PieceInit();

    document.oncontextmenu = function () {

        RightMenu.RightMouseShow();

        return false;
    }



    window.onbeforeunload = null;
});

