var NC = NC || {};
NC.News = NC.News || {};
NC.News.UploadImage = (function ($) {
    //设置
    var settings = {
        "holderId": "",
        "urlFiledId": "",
        "sizeFiledId": "",
        "swf": "",
        "server": "",
        "comment": "",
        "previewWidth": 320,
        "previewHeight": 213
    };

    var domTeamplate = '<!--默认情况-->' +
                     '<div class="shangchuan_moren">' +
                        '<div class="picker">上传本地图片</div>' +
                        '<span class="comment">{comment}</span>' +
                        '<span class="comment error" style="display:none;color:Red;"></span>' +
                     '</div>' +
					 '<!--图片上传中-->' +
					 '<div class="shangchuan_loading" style="display:none">' +
					     '<a href="javascript:;" class="qxsc">取消上传</a>' +
						 '<div class="loading">' +
                             '<p class="text">loading…</p>' +
							 '<p class="jdt"><span style="width:0%"></span></p>' +
						 '</div>' +
					 '</div>' +
					 '<!--缩略图-->' +
					 '<div class="shangchuan_slt" style="display:none">' +
						 '<div class="suoluetu"><img width="{previewWidth}" height="{previewHeight}" src="" /><del title="删除">×</del></div>' +
					 '</div>';

    function initUploader() {
        var holder, urlFiled, sizeFiled;
        holder = $("#" + settings.holderId);
        urlFiled = $("#" + settings.urlFiledId);
        sizeFiled = $("#" + settings.sizeFiledId);
        var domHtml = domTeamplate.replace("{comment}", settings.comment);
        domHtml = domHtml.replace("{previewWidth}", settings.previewWidth);
        domHtml = domHtml.replace("{previewHeight}", settings.previewHeight);
        holder.append(domHtml);
        if (urlFiled.val() != "") {
            holder.children(".shangchuan_slt").find("img").attr("src", urlFiled.val());
            holder.children(".shangchuan_slt").show();
            holder.find('.picker').text("重新上传图片");
        }

        var $loading, $percent, $slt, $img, $error;
        $loading = holder.children(".shangchuan_loading");
        $percent = $loading.find(".jdt span");
        $qxsc = $loading.find(".qxsc");
        $slt = holder.children(".shangchuan_slt");
        $img = $slt.find("img");
        $del = $slt.find("del");
        $error = holder.find(".shangchuan_moren .error");

        var uploader = WebUploader.create({
            // swf文件路径
            swf: settings.swf,
            // 文件接收服务端。
            server: settings.server,
            // 选择文件的按钮。可选。
            // 内部根据当前运行时创建，可能是input元素，也可能是flash.
            pick: {
                id: holder.find('.picker'),
                multiple: false
            },
            // 选完文件后，是否自动上传
            auto: true,
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false,
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'jpg,jpeg,png,gif,bmp',
                mimeTypes: 'image/*'
            },
            fileSingleSizeLimit: 6 * 1024 * 1024,
            compress: false
        });
        // 当有文件添加进来的时候
        uploader.on('fileQueued', function (file) {
            $percent.css('width', '0%');
            $qxsc.on("click", function () {
                uploader.cancelFile(file);
            });
            $loading.show();
        });
        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            $percent.css('width', Math.floor(percentage * 100) + '%');
        });

        // 文件上传成功
        uploader.on('uploadSuccess', function (file, response) {
            $loading.hide();
            $error.hide()
            response.Data.Url.replace("/bitauto/", "/newsimg-320-w0-1/bitauto/")
            $img.attr("src", response.Data.Url);
            urlFiled.val(response.Data.Url);
            if (sizeFiled.length > 0)
                sizeFiled.val(response.Data.Width + "x" + response.Data.Height);
            $slt.show();
            holder.find(".webuploader-pick").text("重新上传图片");
        });

        // 文件上传失败
        uploader.on('uploadError', function (file, reason) {
            $loading.hide();
            $error.text('上传失败！').show();
        });

        // 完成上传，成功或者失败，重置上传对象
        uploader.on('uploadComplete', function (file) {
            uploader.reset();
        });

        uploader.on('error', function (type) {
            switch (type) {
                case "Q_EXCEED_SIZE_LIMIT":
                    $error.text('文件总大小超过限制！').show();
                    break;
                case "F_EXCEED_SIZE":
                    $error.text('图片不能超过6M！').show();
                    break;
                case "F_DUPLICATE":
                    $error.text('文件重复，已经在列表中！').show();
                    break;
                case "Q_EXCEED_NUM_LIMIT":
                    $error.text('文件总个数超过限制！').show();
                    break;
            }
        });

        $del.click(function () {
            $slt.hide();
            $img.attr("src", "");
            urlFiled.val("");
            if (sizeFiled.length > 0)
                sizeFiled.val("");
            holder.find(".webuploader-pick").text("上传本地图片");
        });
    }

    return {
        //初始化
        init: function (options) {
            for (obj in options) {
                settings[obj] = options[obj];
            }
            initUploader();
        }
    };
})($);