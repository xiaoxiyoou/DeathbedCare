$(function() {
    page.init();
});
var flag = true;
var page = {
    init: function() {
        $("#file").change($.proxy(this.upload, this));
    },
    upload: function() {
        if (flag) {
            $("#change").text("上传中，请稍后")
            flag = false;
            var file = $("#file")[0].files[0],
                  //文件对象
                name = file.name,
                     //文件名
                size = file.size,
                     //总大小
                succeed = 0;
            var shardSize = 2 * 1024 * 1024,
                   //以2MB为一个分片
                shardCount = Math.ceil(size / shardSize);  //总片数
            for (var i = 0; i < shardCount; ++i) {
                //计算每一片的起始与结束位置
                var start = i * shardSize,
                    end = Math.min(size, start + shardSize);

                //构造一个表单，FormData是HTML5新增的
                var form = new FormData();
                form.append("data", file.slice(start, end));  //slice方法用于切出文件的一部分
                form.append("name", name);
                form.append("total", shardCount);  //总片数
                form.append("index", i + 1);     //当前是第几片

                console.log("form", form)

                //Ajax提交
                $.ajax({
                    url: "http://cdn.fuyulove.com//Action/UploadBid.ashx",
                    type: "POST",
                    data: form,
                    async: true,
                         //异步
                    processData: false,
                      //很重要，告诉jquery不要对form进行处理
                    contentType: false,
                      //很重要，指定为false才能形成正确的Content-Type
                    success: function(data) {
                        console.log(data);
                        if (data.code == 1) {
                            console.log(data.src);
                            $("#img").attr("src", "http://cdn.fuyulove.com/" + data.src);
                            app.setImg("http://cdn.fuyulove.com/" + data.src)
                            $("#change").text("点击修改")
                            flag = true;
                        }

                    }
                });
            }
        }
    }
};