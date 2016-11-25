/**
 * JQuery selector v0.4
 */
;
(function ($) {

    function Selector() {

        var settings = {
            title: "标题",
            width: 800,
            height: 500,
            maxChecked: null,   // 选择数量限制,默认为全部可选，该值必须为int类型且大于1
            checked: false,
            callback: {
                selected: null, // 当点击窗口的确定按钮时触发
            }
        };

        var consts = {
            event: {
                selected: "selected",
            }
        };

        function findById(array, id) {
            var i = 0;
            var length = array.length;
            for (; i < length; i++) {
                if (array[i].id == id) {
                    return array[i];
                }
            }
            return null;
        }

        var data = {
            _own: {},           // 表示自身对象
            _data: [],          // json数据对象
            _items: [],         // 所有列表项(非分类)字典
            _index: [],         // 索引字典,key:字母  value:index对象,包含:id,text,children
            _si: [],            // 数组,用来保存当前的选中项
            _tmp_si: [],        // 数组,临时保存用户当前的选中项
            _hasCtor: false,    // 表示当前数据是否有分类数据 true:有分类 false:没有分类
            _hasSearch:false,   // 表示是否启用关键字查询
            _cur_ctor: 0,       // 表示当前分类Id
            _checkedNum: 0,     // 表示当前选中项的个数
            _itemCount: 0,      // 列表项数量
            _custom: function () {

            },
            /**
             * 检查settings
            */
            settingCheck: function () {
                // maxChecked
                var max = settings.maxChecked;
                if (max != null && typeof (max) != "number") {
                    settings.maxChecked = null;
                } else {
                    if (max <= 0)
                        settings.maxChecked = null;
                }
            },
            init_data: function (d) {
                // 索引处理
                data._index.length = 0;
                for (var i = 65; i <= 90; i++) {
                    var idx = {};
                    idx.text = idx.index = String.fromCharCode(i);
                    idx.children = [];
                    data._index[idx.index] = idx;
                }
                // # 索引用来指向数字和其他无法识别的列表项
                data._index["#"] = { text: "#", index: "#", children: [] };

                if (typeof d == 'string') {
                    data._data = JSON.parse(d);
                } else {
                    data._data = d;
                }
                for (var i = 0; i < data._data.length; i++) {
                    var itm = data._data[i];
                    data.compatible(itm);
                    if (itm.children) {
                        data._hasCtor = true;
                        for (var j = 0; j < itm.children.length; j++) {
                            var chd = itm.children[j];
                            data.compatible(chd);
                            data._items.push(chd);//[chd.id.toString()] = chd;
                            data._itemCount++;
                            if (chd.checked)
                                data._si.push(chd);
                            data.InsertIndexChild(chd);
                        }
                    } else {
                        data._items.push(itm);//[itm.id.toString()] = itm;
                        data._itemCount++;
                    }

                    // 将列表项添加到相应的索引字典列表中

                }
            },
            dispose: function () {
                handler = null;
                view = null;
                data = null;
            },
            /**
             * 对列表项数据做一些兼容性处理
             * @param {} itm 
             * @returns {} 
             */
            compatible: function (itm) {
                // 同时兼容text和name两个显示字段
                if (itm.text == "undefined" || itm.text == null) {
                    itm.text = itm.name;
                }
            },
            InsertIndexChild: function (itm) {
                var __text = itm.text.replace(/-/g, "");
                var fletter = $.pinyin(__text);
                if (fletter) {
                    itm._index = fletter[0].toUpperCase();
                    if (itm._index in data._index)
                        data._index[itm._index].children.push(itm);
                    else {
                        data._index["#"].children.push(itm);
                    }
                } else {
                    data._index["#"].children.push(itm);
                }
            }
        };

        data._own = this;

        var handler = {
            show: function () {
                view._il.find("input[type='checkbox']").prop("checked", false);
                //for (var key in data._items) {
                //    data._items[key].checked = false;
                //}
                var z = 0;
                var length = data._items.length;
                for (; z < length; z++) {
                    data._items[z].checked = false;
                }
                view._ci.empty();
                data._checkedNum = 0;
                data._tmp_si = [];
                for (var i = 0; i < data._si.length; i++) {
                    handler.checked(data._si[i].id);
                }
                handler.chkNumValidate();
                view._ol.addClass("sct-show");
                view._box.show();
            },
            close: function (e) {
                if ($(e.target).hasClass("close")) {
                    view._ol.removeClass("sct-show");
                    view._box.hide();
                    view._ci.empty();
                    data._tmp_si = [];
                    return false;
                }
            },
            addChk: function (id, text, parent) {
                return $("<label><input type='checkbox' id='" + id + "' checked='checked'><span>" + text + "</span></label>").appendTo(parent);
            },
            checked: function (id, temp) {
                if (temp == null || temp == undefined) temp = true;
                handler.setStatusById(id, true, temp);
                handler.chkNumValidate();
            },
            unchecked: function (id, temp) {
                if (temp == null || temp == undefined) temp = true;
                handler.setStatusById(id, false, temp);
                handler.chkNumValidate();
            },
            /**
             * 根据Id设置选中/取消选中
             * @id 要设置的列表项Id
             * @flag true:选中 false:取消选中
             * @temp 表示是要从data._tmp_si中删除的项,true:删除 false:不删除。当全选/取消全选时会有性能问题
            */
            setStatusById: function (id, flag, temp) {
                var item = findById(data._items, id);// data._items[id];
                if (item && item.checked != flag) {
                    view._il.find("#" + item.id + "").prop("checked", flag);
                    item.checked = flag;
                    if (flag) {
                        handler.addChk(item.id, item.text, view._ci);
                        data._tmp_si.push(item);
                        data._checkedNum++;
                    } else {
                        view._ci.find("#" + item.id + "").parent().remove();
                        if (temp) {
                            var i = data._tmp_si.indexOf(item);
                            if (i >= 0) {
                                data._tmp_si.splice(i, 1);
                            }
                        }
                        data._checkedNum--;
                    }
                    return false;
                }
            },
            setStatusByItem: function (item, flag, temp) {
                if (item && item.checked != flag) {
                    view._il.find("#" + item.id + "").prop("checked", flag);
                    item.checked = flag;
                    if (flag) {
                        handler.addChk(item.id, item.text, view._ci);
                        data._tmp_si.push(item);
                        data._checkedNum++;
                    } else {
                        view._ci.find("#" + item.id + "").parent().remove();
                        if (temp) {
                            var i = data._tmp_si.indexOf(item);
                            if (i >= 0) {
                                data._tmp_si.splice(i, 1);
                            }
                        }
                        data._checkedNum--;
                    }
                    return false;
                }
            },
            chkClick: function () {
                var id = $(this).attr("id");
                if ($(this).is(":checked")) {
                    handler.checked(id);
                } else {
                    handler.unchecked(id);
                }
            },
            submit: function () {
                data._si = data._tmp_si.slice();
                view.setInputCon(data._si);
                data._tmp_si = [];
                $(data._own).trigger(consts.event.selected);
            },
            clean: function () {
                while (data._tmp_si.length > 0) {
                    var item = data._tmp_si.pop();
                    handler.setStatusByItem(item, false, false)
                }
                data._tmp_si = [];
                handler.chkNumValidate();
            },
            /**
             * 获取选中项的属性数据
             * @param  {[type]} prop      列表项属性
             * @param  {[type]} separator 属性拼接字符串分隔符
             * @return {[type]}           字符串,用参数separator指定的分隔符连接
             */
            getValue: function (prop, separator) {
                var s = [];
                for (var i = 0; i < data._si.length; i++) {
                    var item = data._si[i];
                    if (item.hasOwnProperty(prop)) {
                        s.push(item[prop]);
                    }
                }
                return s.join(separator);
            },
            /**
             * 当在顶端选择不同的分类时触发
             */
            navChanged: function (e) {
                view.searchByCategories($(this));
            },
            keyChanged:function(val)
            {
                view.searchByKeyWords(val);
            },
            chkNumValidate: function () {
                var max = settings.maxChecked;
                var num = data._checkedNum;
                if (max == null || max >= num) {
                    view._chkNum.html(num);
                }
                else {
                    view._chkNum.html(max);
                    for (var i = 0; i < num - max; i++) {
                        handler.unchecked(data._tmp_si[0].id);
                    }
                }
            },
            index_Click: function (obj) {

                k = $(obj).attr("data_index");

                view._il.html("");
                var con_id = view._con.prop("id");
                var pair = data._index[k];
                if (pair.children.length) {
                    var dl = $("<dl id='" + con_id + "_" + k + "' data-index='" + k + "'></dl>");
                    var dd = $("<dd></dd>");
                    $('<label class="item-index">' + k + '</label>').appendTo(dl);
                    for (var i = 0; i < pair.children.length; i++) {
                        var chd = pair.children[i];

                        $('<label><input type="checkbox" id="' + chd.id + '"><span>' + chd.text + '</span></label>').appendTo(dd);

                        dd.appendTo(dl);
                    }

                    dl.appendTo(view._il);
                }
                view._con.find(".sct-items dl").find("input[type='checkbox']").click(handler.chkClick);
            }
        };
        var view = {
            _con: {}, // 表示整个容器 container
            _ol: {}, // 遮罩层 overly
            _box: {}, // 表示对话框
            _il: {}, // 列表项 itemlist
            _ci: {}, // 底部选中项 checkedItems 
            _ipt: {}, // 输入文本框
            _nav: {}, // 顶部导航下拉列表
            _chkNum: {}, // 当前选中项个数dom
            _chkData: [],//全部数据
            /**
             * 设置文本框内容
             * @param {[type]} d 选中项字典集合
             */
            setInputCon: function (d) {
                var s = [];
                for (var i = 0; i < d.length; i++) {
                    s.push(d[i].text);
                }
                view._ipt.val(s.join(';'));
                view._ipt.prop("title", s.join(';'));
                data._custom(handler.getValue("id", ";"));
            },
            init_setting: function (box) {
                box.find(".sct-title h2").html(settings.title);
                box.css("width", settings.width + "px");
                box.find(".sct-items").css("height", settings.height + "px");
            },
            /**
             * 根据顶端的分类导航设置列表项的展示
             * @param  {[type]} obj select对象
             */
            searchByCategories: function (obj) {
                var cid = obj.val();
                view._il.html("");
                data._cur_ctor = cid;
                if (view._txtSearch)
                {
                    view._txtSearch.val("");
                }
                if (cid == 0) {

                    $.each(view._chkData, function (i, n) {
                        n.appendTo(view._il);
                    });

                } else {
                    handler.clean();
                    $.each(data._data, function (i, n) {

                        if (cid == n.id) {
                            if (n.children.length) {
                                var dl = $("<dl></dl>");
                                var dd = $("<dd></dd>");
                                $('<label class="item-index">' + n.text + '</label>').appendTo(dl);
                                for (var i = 0; i < n.children.length; i++) {
                                    var chd = n.children[i];

                                    var ischk = settings.checked && cid > 0 ? 'checked="checked"' : "";
                                    $('<label><input type="checkbox"  ' + ischk + ' id="' + chd.id + '"><span>' + chd.text + '</span></label>').appendTo(dd);
                                    if (settings.checked && cid > 0)
                                        handler.checked(chd.id);

                                    dd.appendTo(dl);
                                }
                                dl.appendTo(view._il);

                            }
                        }
                    });

                }
                view._con.find(".sct-items dl").find("input[type='checkbox']").click(handler.chkClick);
            },
            searchByKeyWords: function (val) {
                var ckey = val;
                view._il.html("");
                //data._cur_ctor = ckey;
                view._nav.val(0);
                if (ckey == "") {
                    $.each(view._chkData, function (i, n) {
                        n.appendTo(view._il);
                    });
                }else{
                    $.each(data._data, function (i, n) {
                        if (n.children.length) {
                            var hasValue = false;
                            var dd = $("<dd></dd>");
                            for (var i = 0; i < n.children.length; i++) {
                                var chd = n.children[i];

                                var ischk = settings.checked && cid > 0 ? 'checked="checked"' : "";
                                var cItem = $('<label><input type="checkbox"  ' + ischk + ' id="' + chd.id + '"><span>' + chd.text + '</span></label>');
                                if (settings.checked && cid > 0)
                                    handler.checked(chd.id);

                                if (chd.text.indexOf(ckey) != -1) {
                                    hasValue = true;
                                    cItem.appendTo(dd);
                                }
                            }
                            if (hasValue) {
                                var dl = $("<dl></dl>");

                                $('<label class="item-index">' + n.text + '</label>').appendTo(dl);
                                dd.appendTo(dl);
                                dl.appendTo(view._il);
                            }
                        }
                    });
                }
                view._con.find(".sct-items dl").find("input[type='checkbox']").click(handler.chkClick);
            },
            fill_view: function () {
                $.each(data._data, function (i, n) {
                    if (n.children.length) {
                        var dl = $("<dl></dl>");
                        var dd = $("<dd></dd>");
                        $('<label class="item-index">' + n.text + '</label>').appendTo(dl);
                        for (var i = 0; i < n.children.length; i++) {
                            var chd = n.children[i];

                            $('<label><input type="checkbox" id="' + chd.id + '"><span>' + chd.text + '</span></label>').appendTo(dd);

                            dd.appendTo(dl);
                        }

                        view._chkData.push(dl);
                    }
                });
                $.each(view._chkData, function (i, n) {
                    n.appendTo(view._il);
                });
            },
            init_view: function (obj) {
                view._con = obj;
                view._ol = $('<div class="sct-overlay close" />').appendTo(view._con);
                var box = $("<div class='sct-box'><div class='sct-title'><h2></h2><span class='close close-btn'>关闭</span></div>" +
                    "<div class='sct-list-con'>" +
                    "<div class='sct-nav-con'>  <select class='sct-nav-cmb'></select> " + (settings.maxChecked == null ? "" : "<label class='maxChecked'>注: 最多只能选择 " + settings.maxChecked + " 个</label>") + " </div>" +
                    "<div class=sct-index-con><ul class='sct-index'></ul><div class='sct-index-sp'></div></div>" +
                    "<div class='sct-list'><div class='sct-items'><dl><dd></dd></dl></div></div>" +
                    "<div class='sct-bottom'> <dl><dt>已选(<span id='checkedNum'>0</span>)：<a class='clean' href='javascript:;'>清除</a></dt><dd></dd></dl></div>" +
                    "</div>" +
                    "<div class='sct-btn'> <input type='button' class='opt-btn submit close' value='确定' style='color:white;'>&nbsp;&nbsp;<input type='button' class='opt-btn close' value='取消' style='color:white;'></div>" +
                    "</div>");
                view.init_setting(box);
                box.appendTo(view._ol);

                // 初始化索引
                var ic = view._con.find(".sct-list-con .sct-index");
                var con_id = view._con.prop("id");
                for (var k in data._index) {
                    var idx = data._index[k];
                    var cls = idx.children.length <= 0 ? "idx-disable" : "";
                    var pindex = idx.index;
                    $("<li data_index=" + idx.index + "><a class='" + cls + "' href='#' >" + idx.text + "</a></li>").click(function () { handler.index_Click(this); }).appendTo($(ic));
                    // ic.append(ip);

                }
                view._box = view._con.find(".sct-box").first();
                view._box.hide();
                view._il = view._con.find(".sct-items dl");
                view._ci = view._con.find(".sct-bottom dl dd");
                view._ipt = view._con.find(".sct-input");
                view._nav = view._box.find(".sct-nav-cmb");
                view._chkNum = view._box.find("#checkedNum");
                //view._ipt.attr({
                //    "readonly": "readonly"
                //});
                $("<option value='0'>全部</option>").appendTo(view._nav);
                if (data._hasCtor) {
                    for (var i = 0; i < data._data.length; i++) {
                        var c = data._data[i];
                        if (c.children)
                            $("<option value='" + c.id + "' data-index='" + c._index + "''>" + c.text + "</option>").appendTo(view._nav);
                    }
                }
                if (data._hasSearch)
                {
                    view._txtSearch = $("<input type='text' style='height:19px;' />");
                    var pa = view._nav.parent();
                    view._txtSearch.appendTo(pa);
                    $("<input type='button' value='查询' style='height:23px;padding:2px;margin-left:10px;color:black;' />").on("click", function () {
                        handler.keyChanged(view._txtSearch.val());
                    }).appendTo(pa);
                }
                view._nav.change(handler.navChanged);

                view._con.children("input.btn").click(handler.show);
                view._con.find(".sct-btn .submit").click(handler.submit);
                view._con.find(".sct-bottom .clean").click(handler.clean);
                view._con.find(".close").click(handler.close);

                view.fill_view();
                view.setInputCon(data._si);

                view._il.find("input[type='checkbox']").click(handler.chkClick);
                view._ci.on("click", "label input[type='checkbox']", handler.chkClick);

            }
        };

        this._init = function (obj, s, d, fn) {
            settings = $.fn.extend(settings, s);
            if (fn && fn.constructor == Function) {
                data._custom = fn;
            }
            data.settingCheck();
            data.init_data(d);
            view.init_view(obj);
        };
        this._fn = function () {

        };
        // 获取所有的选中项，属性方法与传入的item数据相同
        this.getSelected = function () {
            var result = [],
                clone = data._si.slice();
            for (var k in clone) {
                result.push(clone[k]);
            }
            return result;
        };
        this.checked = function (ids) {
            data._tmp_si = data._si.slice();
            for (var i = 0; i < ids.length; i++) {
                var item = findById(data._items, ids[i]);// data._items[ids[i]];
                if (item) {
                    if (data._si.indexOf(item) < 0) {
                        handler.checked(ids[i]);
                    }
                }
            }
            data._si = data._tmp_si.slice();
            view.setInputCon(data._si);
        };
        this.unchecked = function (ids) {
            data._tmp_si = data._si.slice();
            for (var i = 0; i < ids.length; i++) {
                var item = findById(data._items, ids[i]);// data._items[ids[i]];
                if (item) {
                    var index = data._si.indexOf(item);
                    if (index >= 0) {
                        handler.unchecked(ids[i]);
                    }
                }
            }
            data._si = data._tmp_si.slice();
            view.setInputCon(data._si);
        };
        this.close = handler.close;
        this.dispose = data.dispose;
        this.getValue = handler.getValue;

        $(data._own).bind(consts.event.selected, function () {
            if (settings.callback.selected)
                settings.callback.selected();
        });
    }

    $.fn.selector = {
        init: function (obj, setting, data, fn) {
            if (!(obj || obj.hasClass("sct-container") || obj.children("input.sct-input"))) return null;
            var selector = new Selector();
            selector._init(obj, setting, data, fn);
            return selector;
        }
    }
}(jQuery));