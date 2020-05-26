var videoIndex = 0; //视频播放索引
var videoLength; //视频播放次数
var timeFlag = true; //防止重复点击获取验证码


//视频数据请求
function getVideo(videoIndex) {
    var data = {
        userId: userId,
        pageIndex: 1,
        pageSize: 20,
        orderCate: "0",
        cateId: 13,
        dateStr: ""
    }

    httpRequest("DeathbedConcernApi/DeathbedConcernList.ashx", "get", data).then(function(res) {
        console.log("视频数据请求", res);
        detailList = res.Data;
        //取到所有视频
        videoCon = detailList.map(function(item) {
            return item.FilePath;
        });
        //取到所有id的值
        videoIdCon = detailList.map(function(item) {
            return item.Id;
        });

        // 视频封面
        // videoPoster = detailList.map(function(item) {
        //     return item.Photo;
        // });


        $(".video").attr("src", videoCon[videoIndex])
        $(".source").attr("src", videoCon[videoIndex])


    })
}
//判断登记
// function regSign(index) {
//     var data = {
//         userId: userId,
//         cateid: 13
//     }

//     httpRequest("DeathbedConcernApi/DeathbedListTotal.ashx", "get", data).then(function(res) {
//         console.log("是否收藏和登记", res);
//         ishistory = res.Data[index].ishistory;
//         reg = res.Data[index].isreg;
//         console.log("reg", reg);

//     })
// }
// 点击切换视频
$('.videoCon').on('click', '.video-select-item', function() {
        videoIndex = $(".video-select-item").index($(this));
        $(".video").attr("src", videoCon[videoIndex])
        $(".video-select-item ").removeClass("video-select-item-hover ");
        $(this).addClass("video-select-item-hover ");
        document.getElementById('video').play();
        videoShow()
    })
    // 点击播放下一集
$(".nextbtn").click(function() {

    if (videoIndex < 4) {

        videoIndex += 1;
        $(".video").attr("src", videoCon[videoIndex])
        document.getElementById('video').play();
        $(".video-select-item  ").removeClass("video-select-item-hover");
        $(".video-select-item").eq(videoIndex).addClass("video-select-item-hover"); 
        //让视频显示
        videoShow()
    }

});
// 点击重复播放
$(".prevbtn").click(function() {
    $(".video").attr("src", videoCon[videoIndex])
    document.getElementById('video').play();
    //让视频显示
    videoShow()
});

// 点击封面播放视频
$('.loadFake').click(function() {
        videoShow()
        document.getElementById('video').play();
    })
    // 监听视频播放
function videoStart() {
    console.log("开始播放")
    console.log("videoLength", videoLength)
    console.log("reg", reg)
    localStorage.removeItem("timeDisplay")
    videoLength = localStorage.getItem("videoLength")
    if (videoLength == 2 && reg == 0 && isreceive == 0) {
        $(".videoPop").css("display", "block")
        loadFakeShow()
        setTimeout(function() {
            document.getElementById('video').pause();
        }, 3000);

    }

}

// 监听视频播放结束 并计数
var video = document.getElementById("video");
video.loop = false;
video.addEventListener('ended', function() {
    console.log("播放结束")
    videoLength = parseInt(localStorage.getItem("videoLength") || 0);
    videoLength = videoLength + 1;
    localStorage.setItem("videoLength", videoLength); 
    // 切换视频提示框
    fakeConShow()
}, false);

// 点击关闭视频弹出框
$(".subsidies-close").click(function() {
    $(".videoPop").css("display", "none")
        // 让视频显示
    videoShow()

});
// 点击获取验证码
$(".video-code-btn ").click(function() {
    var className = $(".video-code-btn ").attr("class");
    console.log("className", className)
    if (timeFlag == true) {
        getCode(className);
    }

});
// 选择性别效果
$(".video-sex-select-con  ").click(function() {
        $(".video-sex-select").css("display", "none");
        $(this).find(".video-sex-select").css("display", "block");
        userSex = $(this).attr("value")


    })
    // 提交信息
$(".video-use-btm").click(function() {
    getCodeCompalte()

});

//提交信息请求
function getCodeCompalte() {
    var phoneNum = document.getElementById("videoNum").value
    var userName = document.getElementById("videoName").value;
    userName = userName.replace(/(^\s*)|(\s*$)/g, ''); //把首尾的空格去掉
    var TelCode = document.getElementById("videoCode").value;
    TelCode = TelCode.replace(/(^\s*)|(\s*$)/g, '');
    console.log("phoneNum", phoneNum);
    if (userName == '' || userName == null) {
        layer.open({
            content: '请输入您贵姓',
            skin: 'msg',
            time: 2
        });
        return false;
    }
    if (!/^[\u4e00-\u9fa5]+$/gi.test(userName)) {
        layer.open({
            content: '请输入中文姓氏',
            skin: 'msg',
            time: 2
        });
        return false;
    }
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNum))) {
        layer.open({
            content: '请输入正确手机号',
            skin: 'msg',
            time: 2
        });
        return false;
    }
    if (TelCode == '' || TelCode == null) {
        layer.open({
            content: '请输入验证码',
            skin: 'msg',
            time: 2
        });
        return false;
    }
    var data = {
        sysUserId: userId,
        userTelephone: phoneNum,
        userAdddress: '',
        userName,
        userLat: latitude,
        userLon: longitude,
        TelCode: TelCode,
        userSex,
        shopId
    }
    console.log("data", data)
    httpRequest("DeathbedConcernApi/ShopInfosUserAdd.ashx", "get", data).then(function(res) {
        console.log("提交用户信息", res);
        if (res.StatusCode == 203) {
            layer.open({
                content: '验证码错误',
                skin: 'msg',
                time: 2
            });
        } else {
            $(".videoPop").css("display", "none")
            document.getElementById("videoNum").value = ""
            document.getElementById("videoName").value = ""
            document.getElementById("videoCode").value = ""
            videoShow();
            // 刷新是否登记
            envelopes();
            //解除倒计时锁定
            timeFlag = true;
            layer.open({
                content: '提交成功',
                skin: 'msg',
                time: 2
            }); 
            // 清空缓存
            localStorage.removeItem("videoLength")

        }
    })
}