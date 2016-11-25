/*用法
//$.noahAlert.show({ haveSubmit: true, 
haveCancel: true,
autoInterval: 1000,
onSubmit: function () { },
onCancel: function () { }
});
$.noahAlert.show("message");//自动关闭消息
$.noahAlert.show("message",options);//扩展设置其他属性
$.noahAlert.show("title","message");//显示消息和标题
$.noahAlert.confirm("msg",sumbitCallback,cancelCallback);//confirm消息框，以及提交回调和取消回调
$.noahAlert.alert("msg")//模拟原生alert，不自动关闭
//进度条加载
loadingPartial.loading()=$.noahAlert.loadingPartial.loading();
loadingPartial.close()=$.noahAlert.loadingPartial.close();
*/
; (function ($){
    function getMaxZ()
    {
       return Math.max.apply(null,$.map($('body > *'), function(e,n){
                if($(e).css('position')=='absolute')
                return parseInt($(e).css('z-index'))||1;
       }));
    }

    $.noahAlert = {
        show: function (options) {
            function keyDownEvent(event)
            {
                       //enter
                       if(event.which==13){
                          if (opt.onSubmit) {
                              opt.onSubmit();
                            }
                            removePanel();
                       }else if(event.which==27)//esc
                       {
                         if (opt.onCancel) {
                             opt.onCancel();
                         }
                         removePanel();
                       }
            }
            function removePanel()
            {
               //obj.unbind("keydown");
               $(document).unbind("keydown",keyDownEvent);
               //obj.find(".button_gray_b").unbind("click");
               //obj.find(".button_org_b").unbind("click");
               obj.remove();
               panel.remove();
            }
            var maxZ = getMaxZ();
            var opt={ haveSubmit: false, haveCancel: false };
            if(arguments.length==2){
               if(typeof arguments[1]=='string')
               { 
                 opt.title=arguments[0];
                 opt.message=arguments[1];
                 opt.autoInterval=1000;
               }
               else{
                  opt.message=arguments[0];
                  $.extend(opt, arguments[1]);
               }
            }else
            {
                if(typeof options=='string')
                {
                   opt.message=options;
                   opt.autoInterval=1000;
                }else{
                   $.extend(opt, options);
                }
            }
            var array = [];
            array.push('<div class="openwindow" >');
            array.push('<a href="javascript:;" class="close">关闭</a>');
            array.push('<div class="openwindow_con">');
            if(opt.title){
               array.push('<h4>');
               array.push(opt.title);
               array.push('</h4>');
            }
            if(opt.message)
            {
              array.push('<p class="text">');
              array.push(opt.message);
              array.push('</p>');
            }
            
            array.push('</div>');
            if (opt.haveSubmit || opt.haveCancel) {
                array.push('<div class="openwindow_submit">');
                if (opt.haveSubmit) {
                    array.push('<input type="button" value="确定" class="button_org_b button_70_30">');
                }
                if (opt.haveCancel) {
                    array.push('<input type="button" value="取消" class="button_gray_b button_70_30">');
                }
                array.push('</div>');
            }
            array.push('</div>');
            var panel=$('<div class="noahAlertPanel"></div>');
            var obj = $(array.join(""));
            if(maxZ<0){
              maxZ=0;
            }
            if(maxZ<1000) maxZ=1000;
            panel.css("z-index",maxZ+1);
            obj.css("z-index",maxZ+2);
            $("body").append(obj);
            $("body").append(panel);
            obj.css("top",document.body.scrollTop + document.documentElement.scrollTop + window.innerHeight / 2 - obj.height());
            obj.css("left",$(window).width() / 2-obj.outerWidth()/2);
            obj.one("click",".close", function () {
                if (opt.onCancel) {
                    opt.onCancel();
                }
                removePanel();
            });
            if (opt.haveSubmit) {
                obj.one("click",".button_org_b", function () {
                    if (opt.onSubmit) {
                        opt.onSubmit();
                    }
                    removePanel();
                });
            }
            if (opt.haveCancel) {
                obj.one("click",".button_gray_b", function () {
                    if (opt.onCancel) {
                        opt.onCancel(true);
                    }
                    removePanel();
                });
            }
            //
            $(document).bind("keydown",keyDownEvent);
            if (opt.autoInterval&&opt.autoInterval>=100) {//大于100才处理
                this.timer = window.setTimeout(function () { removePanel(); }, opt.autoInterval);
            }
        },
        confirm:function(msg,submitCallback,cancelCallback)
        {
            var opt={haveSubmit:true,haveCancel:true,message:msg};
            if(submitCallback)
            {
                opt.onSubmit=submitCallback;
            }
            if(cancelCallback)
            {
               opt.onCancel=cancelCallback;
            }
            this.show(opt);
        },
        alert:function(msg)
        {
            var opt={haveSubmit:true,message:msg};
            this.show(opt);
        }
    };
    $.noahAlert.loadingPartial=window.loadingPartial={};
    var array=[];
    array.push('<div id="loadingArea" style="background-color:White;position:absolute;width:200px;height:20px;padding:20px 20px 40px 20px;display:none;">');
    array.push('<div id="loadContent">加载中...</div>');
    array.push('<img alt="loading" width="200px" height="7px" src="../Content/image/13221821.gif" />');
    array.push('</div>');
    var $loadingArea=$(array.join(""));
    array=[];
    array.push('<div class="ui-widget-overlay ui-front" id="loadlayer" style="display:none;"></div>');
    var $loadlayer=$(array.join(""));
    $("body").append($loadingArea);
    $("body").append($loadlayer);
    loadingPartial.layer = $loadlayer;
    loadingPartial.area = $loadingArea;
    loadingPartial.showText = $loadingArea.find("#loadContent");
    loadingPartial.showTextChanged = false;
    loadingPartial.areaWidth=loadingPartial.area.outerWidth();
    loadingPartial.areaHeight=loadingPartial.area.outerHeight();

    loadingPartial.loading = function (text) {
        var zindex = getMaxZ();
        loadingPartial.layer.css("z-index",zindex+1);
        loadingPartial.area.css("z-index",zindex+2);
        loadingPartial.layer.show();

        loadingPartial.area.hide();
        if (text) {
            loadingPartial.showTextChanged = true;
            loadingPartial.showText.html(text);
        } else if (loadingPartial.showTextChanged) {
            loadingPartial.showText.html("加载中...");
            loadingPartial.showTextChanged = false;
        }
        var top = document.body.scrollTop + document.documentElement.scrollTop + window.innerHeight / 2 - loadingPartial.areaHeight / 2 ;
        var left = document.body.scrollLeft + document.documentElement.scrollLeft + window.innerWidth / 2 - loadingPartial.areaWidth / 2;
        loadingPartial.area.css({ "left": left, "top": top });
        loadingPartial.area.show();
    }
    loadingPartial.close = function () {
        loadingPartial.layer.fadeOut();
        loadingPartial.area.fadeOut();
    }
})(jQuery);