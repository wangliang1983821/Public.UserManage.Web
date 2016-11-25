var DataArea_Field = {};//自定义数据区公共方法
DataArea_Field.Include = '<!-- #include file="url" data_id="pieceid" -->';
DataArea_Field.isAll = true;//判断是否绑定全部元素
DataArea_Field.e = DataArea_Field.isAll ? ["*"] : ["div", "li"];//选择事件绑定元素
DataArea_Field.o = [];//外部引用模块数组
DataArea_Field.exec_url = /file="(.+?)"/gi;//模块地址正则表达式
DataArea_Field.exec_id = /data_id="(\d+?)"/gi; //模块id正则表达式
DataArea_Field.RootUrl = "http://" + DataArea_WebUrl; //访问服务器地址根路径
DataArea_Field.VirtualUrl = ""; //虚拟路径地址
DataArea_Field.div = "<div id=\"div_fudong_id\"  class=\"div_fudong\"></div>"; //鼠标跟随div
DataArea_Field.mx = 0; //鼠标当前x坐标
DataArea_Field.my = 0; //鼠标当前y坐标

DataArea_Field.tagReplace = "BODY"; 
DataArea_Field.current = null; //鼠标滑过元素
DataArea_Field.selectdiv = null; //右键元素
DataArea_Field.TreeHtml = null;
DataArea_Field.pieceinclude = [];
DataArea_Field.zpids = "";

DataArea_Field.stripscript = function (s) {
    return s.replace(/<script[\s\S]*?<\/script>/ig, '');
}
DataArea_Field.stripzhushi = function (s) {
    return s.replace(/<!--[\s\S]*?-->/ig, '');
}

DataArea_Field.Setonbeforeunload = function () {
    if (window.onbeforeunload == null) {
        window.onbeforeunload = function () {
            return "本页面要求您确认您要离开 - 您输入的数据可能不会被保存";

        }
    }
}

DataArea_Field.fragment = function (html) {
    var elt = document.createElement("div");
    var frag = document.createDocumentFragment();
    elt.innerHTML = html;
    while (elt.firstChild) {
        frag.appendChild(elt.firstChild);
    }
    return frag;
}


DataArea_Field.isPiece = function (css,e) {
    var b = false;
    if ($(e).parents("." + css).length > 0) {
       
        b = true;
    }
    else if ($(e).find("." + css).length > 0) {
      
        b = true;
    }
    else if ($(e).hasClass(css)) {
     
        b = true;

    }

    return b;
}


DataArea_Field.SetMoveFun = function (event) {
   
    $(".DivCommonSelected").removeClass("DivCommonSelected");

    DataArea_Field.current = event.target;
  
//    if (DataArea_Field.isPiece("DivCommonSelected2", DataArea_Field.current)) {
//        return;
//    }
//   

//    if (DataArea_Field.isPiece("DivCommonSelected3", DataArea_Field.current)) {
//        return;
//    }
//    if (DataArea_Field.isPiece("DivCommonSelected1", DataArea_Field.current)) {
//        return;
//    }
//    if (event.target.tagName.indexOf(DataArea_Field.tagReplace) >= 0 || event.target.id == "DataArea_Div") {
//        return;
//    }
    DataArea_Field.SetDiv(event.target);
    $(event.target).addClass("DivCommonSelected");


}
DataArea_Field.dbClick = function (event) {
    if (DataArea_Field.isPiece("DivCommonSelected3", DataArea_Field.current)) {
        DataArea_Field.current = event.target;
        RightMenu.RightMouseShow();
    }
}
DataArea_Field.Click = function (event) {
   
    if (DataArea_Field.isPiece("DivCommonSelected2", DataArea_Field.current)) {
        return false;
    }

    if (DataArea_Field.isPiece("DivCommonSelected3", DataArea_Field.current)) {
        return false;
    }


    if (event.target.tagName.indexOf(DataArea_Field.tagReplace) >= 0 || event.target.id == "DataArea_Div") {
        return false;
    }
    else {


        if ($(DataArea_Field.current).hasClass("DivCommonSelected1") || $(".DivCommonSelected1").length == 0) {
            $(DataArea_Field.current).toggleClass("DivCommonSelected1");
            if ($(DataArea_Field.current).hasClass("DivCommonSelected1")) {
                SetTagTree();
            }

        }
        else {
            if ($(".DivCommonSelected1").length > 0 && ($(DataArea_Field.current).prev(".DivCommonSelected1").length > 0 || $(DataArea_Field.current).next(".DivCommonSelected1").length > 0)) {

                $(DataArea_Field.current).toggleClass("DivCommonSelected1");
            }
            else {
                $(DataArea_Field.current).removeClass("DivCommonSelected1");
            }

        }
    }
    if ($(".DivCommonSelected1").length == 0) {
        $("#DataArea_span_tree").html("");
    }
    return false;
}


function SetTagTree() {
   
    GetTagTree(DataArea_Field.current);
    $("#DataArea_span_tree").append(DataArea_Field.TreeHtml);
}

function GetTagTree(obj) {

    if ($(obj).parents().length > 0) {
      
        var treeo = null;
        treeo = $("<span style='cursor:pointer;'>" + $(obj).get(0).tagName + "</span>").click(function () {
           
            if (DataArea_Field.isPiece("DivCommonSelected2", obj)) {
                alert("这个区域已有块，请重新选择");
                return false;
            }

            if (DataArea_Field.isPiece("DivCommonSelected3", obj)) {
                alert("这个区域已有块，请重新选择");
                return false;
            }

            $(".DivCommonSelected1").removeClass("DivCommonSelected1");
            $(obj).toggleClass("DivCommonSelected1");
            $(this).siblings().css("color", "");
            $(this).css("color", "red");

        }
        );
        $("#DataArea_span_tree").prepend(treeo);
        $("#DataArea_span_tree").prepend("<span>&nbsp;>&nbsp;</span>");
       
        GetTagTree($(obj).parent());

    }
}


//确定鼠标当前坐标
DataArea_Field.mouseCoords = function (ev) {
    if (ev.pageX || ev.pageY) { return { x: ev.pageX, y: ev.pageY }; }
    return { x: ev.clientX, y: ev.clientY + $(document).scrollTop() };
}
//鼠标移动时执行操作
DataArea_Field.Move = function (ev) {

    Ev = ev || window.event; var mousePos = DataArea_Field.mouseCoords(Ev); DataArea_Field.mx = mousePos.x; DataArea_Field.my = mousePos.y;
    //    $("#span_tmpurl").html(DataArea_Field.my);
    if ($("#div_fudong_id"))
        $("#div_fudong_id").hide().css({ top: DataArea_Field.my - 60, left: DataArea_Field.mx, height: 20, width: 20 }).show();
   // $("#DataArea_span_tree").html(DataArea_Field.my);
    DataArea_Field.SetMoveFun(ev);
}
//显示选中标签元素名
DataArea_Field.SetDiv = function (obj, text) {
    if (text) {
        $("#div_fudong_id").show().html(text);
    }
    else {
        if (obj) {
            $("#div_fudong_id").show().html($(obj).get(0).tagName);
        }
        else {
            $("#div_fudong_id").show().html($(current).get(0).tagName);
        }
    }
   
};
//将鼠标跟随div 加入到页面中
DataArea_Field.CreateDiv = function () {
     $("#DataArea_NoSelect").append(DataArea_Field.div).find(".div_fudong").hide();
   
};

//清空选中元素
 DataArea_Field.Clear = function () {
     $("#DataArea_span_tree").html("");
    $(".DivCommonSelected1").removeClass("DivCommonSelected1");
}
//返回页面注释元素
DataArea_Field.getCommentNodes = window.NodeFilter ? function (e) {
    //支持TreeWalker的浏览器
    var r = [], o, s;

    s = document.createTreeWalker(e, NodeFilter.SHOW_COMMENT, null, null);
    while (o = s.nextNode()) {
        if (o.data.indexOf("#include") >= 0) {
            r.push(o);
        }
    } //遍历迭代器

    return r;
} : function (e) {
    //不支持的需要遍历
    alert("浏览器版本有点低");
    return;
    switch (e.nodeType) {
        case 8:
            if (e.indexof("#include") >= 0) {
                return [e]; //注释节点直接返回
            }

        case 1: case 9: //文档或元素需要遍历子节点
            var i, s = e.childNodes, l = s.length, result = [];
            for (i = 0; i < s.length; i++) //递归每个子节点
                result.push(getCommentNodes(s[i]));
            return Array.prototype.concat.apply([], result); //合并子数组
    };
};
//显示元素所有属性
DataArea_Field.ShowShuXin = function (obj) {
    // 用来保存所有的属性名称和值 
    var props = "";
    // 开始遍历 
    for (var p in obj) {
        // 方法 
        if (typeof (obj[p]) == " function ") {
            obj[p]();
        } else {
            // p 为属性名称，obj[p]为对应属性的值 
            props += p + " = " + obj[p] + " \t ";
        }
    }
    // 最后显示所有的属性 
    alert(props);
}
DataArea_Field.GetEncode = function (data) {

    var ec_encode = DataArea_Encode;
    var ge_en = /data_encode="(.+?)"/gi;

    var ge_data = ge_en.exec(data);

    if (ge_data) {
        ec_encode = ge_data[1];
    }
    return ec_encode;


}
//导入页面所有块元素
DataArea_Field.PieceInit = function () {

    var i, o, s = DataArea_Field.getCommentNodes(document);

    for (i = 0; o = s[i]; i++) {


        DataArea_Field.o.push(o);

    }

    $.each(DataArea_Field.o, function (i, n) {


        DataArea_Field.exec_url = /file="(.+?)"/gi;
        DataArea_Field.exec_id = /data_id="(\d+?)"/gi;
        var arrid = DataArea_Field.exec_id.exec(n.data);
        var arrurl = DataArea_Field.exec_url.exec(n.data);

        if (arrid && arrurl) {
            var u = arrurl[1];
            var id = arrid[1];
            if (id && u) {
              
                var pi_encode = DataArea_Field.GetEncode(n.data);

                $.post(DataArea_GetPieceFileString, { url: u, encode: pi_encode },

                  function (data) {
                   
                      var bd = $("<div id='DataArea_Piece_View' data='DataArea_Piece_View'></div>").append($(data).addClass("DivCommonSelected3").attr("data_temurl", u).attr("data_id", id));
                    //  var d = $("<div id='DataArea_Piece_View_" + arrid + "' data='DataArea_Piece_View'></div>").append($(data).addClass("DivCommonSelected3").attr("data_id", id));
                      data = bd.html();
                      data = DataArea_Field.LoadPieceInclude(data);
                    
                     // data = $(d).html();

                      data = DataArea_Field.stripscript(data);
                      data = DataArea_Field.stripzhushi(data);
                    
                     
                   //   var d = $(data).addClass("DivCommonSelected3").attr("data_temurl", u).attr("data_id", id);

                      var d = $(data).addClass("DivCommonSelected3");

                      //$(d).find(".DivCommonSelected3").attr("data_temurl", u).attr("data_id", id);
                      $(d).mouseenter(function () {
                          $("#span_tmpurl").html(u);


                      }).mouseleave(function () {
                          $("#span_tmpurl").html('');

                      });

                      DataArea_Field.AddPiece(n, d);
                  });

            }
        }
    });
}

 DataArea_Field.GetPieceIds = function () {
     var i, o, s = DataArea_Field.getCommentNodes(document);

     for (i = 0; o = s[i]; i++) {

     
         DataArea_Field.o.push(o);

     }
     var ids = "";
     $.each(DataArea_Field.o, function (i, n) {
       
         DataArea_Field.exec_id = /data_id="(\d+?)"/gi;
         var arrid = DataArea_Field.exec_id.exec(n.data);
         if (arrid) {
             var id = arrid[1];
             if (id) {
                 ids = ids + id + ",";

             }
         }
     });

     ids = ids.substring(0, ids.length - 1)
     return ids;
 }
 //根据块id 返回include
 DataArea_Field.GetIncludeById = function (pid) {
     var i, o, s = DataArea_Field.getCommentNodes(document);

     for (i = 0; o = s[i]; i++) {

         DataArea_Field.o.push(o);

     }
     var current = null;
     $.each(DataArea_Field.o, function (i, n) {

         DataArea_Field.exec_id = /data_id="(\d+?)"/gi;
         var arrid = DataArea_Field.exec_id.exec(n.data);
         if (arrid) {
             var id = arrid[1];
             if (id) {
                 if (pid == id) {
                     current = n;
                 }

             }
         }
     });
     return current;
 }

 //将块内容加入节点
 DataArea_Field.AddPiece = function (n, d) {
     if (n.previousSibling) {
         $(n.previousSibling).after(d);
     }
     else {
         $(n.parentNode).prepend(d);
     }
 }

//根据id移除include节点
 DataArea_Field.removeElement = function (id, url) {

     var i, o, s = DataArea_Field.getCommentNodes(document);

     for (i = 0; o = s[i]; i++) {

         // var u = o.data.split('"')[1];

         DataArea_Field.exec_url = /file="(.+?)"/gi;
         DataArea_Field.exec_id = /data_id="(\d+?)"/gi;
         var arrid = DataArea_Field.exec_id.exec(o.data);
         var arrurl = DataArea_Field.exec_url.exec(o.data);
         if (arrid && arrurl) {
             var u = arrurl[1];
             var pid = arrid[1];

             if (pid == id && u.indexOf(url) >= 0) {
                 var _parentElement = o.parentNode;
                 if (_parentElement) {
                     _parentElement.removeChild(o);
                 }
                 alert("重置成功");
             }
         }
     }
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


 DataArea_Field.LoadPieceInclude = function (data) {

     var d = $("<div id='DataArea_Piece_View' data='DataArea_Piece_View'></div>").append($(data).addClass("DivCommonSelected3"));


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

                 var d = DataArea_Field.LoadPieceInclude(data);
               
                 var zpid = $.ajax({
                     type: "POST",
                     url: GetPieceIdByUrl,
                     data: "url=" + u,
                     async: false
                 }).responseText;


                d= $(d).each(function (i,n) {
                     if (typeof ($(n).attr("data_id")) == "undefined") {
                          $(n).addClass("DivCommonSelected3").attr("data_temurl", u).attr("data_id", zpid);
                     }
                
                 });

              //   d = $(d).addClass("DivCommonSelected3").attr("data_temurl", u).attr("data_id", zpid);

                if (zpid > 0) {
                    DataArea_Field.zpids += zpid + ",";
                }
                 

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
     })


     return $(d).html();

 }



//弹出新页面
var a = undefined;
DataArea_Field.OpenUrl = function (url) {
    if (url) {

    }
    else {
        url = DataArea_ViewUrl;
    }

    try {

        if (!a) {
            a = document.createElement("a");
            document.getElementById("DataArea_NoSelect").appendChild(a);
        }
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        a.click();
    }
    catch (e) {
        window.open(url);
    }
}
//关闭当前页面
DataArea_Field.Close = function (url) {
    if
    (confirm("您确定要关闭本页吗？")) {
        window.onbeforeunload = null;
        window.opener = null;
        window.open('', '_self');
        window.close();
    }
    else { }
}
