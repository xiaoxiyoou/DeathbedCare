// 点击补贴金小图标
$(".getEnvelopesCon").click(function() {
console.log("subsidieShow",subsidieShow == 1)
    if (subsidieShow == 1) {
// 页面已经加载完毕
        $(".subsidiespop").css("display", "block")
    }else if(subsidieShow == 2){
        layer.open({
            content: '商家暂时未设置补贴金',
            skin: 'msg',
            time: 3
        });
       
    } else {
        layer.open({
            content: '加载中，请重试',
            skin: 'msg',
            time: 3
        });
        
    }
    document.getElementById('video').pause();
    loadFakeShow()
});
// 点击关闭补贴金
$(".subsidiesClose").click(function() {
    $(".subsidiespop").css("display", "none")
    videoShow()

});
// 点击遮罩层关闭弹框
$(".mask").click(function() {
    $(".subsidiespop").css("display", "none")
    $(".videoPop").css("display", "none")
    videoShow()
});
// 点击获取验证码
$(".code-btn ").click(function() {
    var className = $(".code-btn ").attr("class");
    console.log("className", className)
    if (timeFlag == true) {
        getCode(className);
    }
});
//验证码倒计时
function timedown(time, className) {
    time = time - 1;
    if (time >= 0) {
        setTimeout(function() {
            timedown(time, className)
        }, 1000)
        $("." + className).html(time + "s");

    } else {
        //倒计时结束
        timeFlag = true;

        $("." + className).html("重新发送");

    }

}
// 获取验证码请求
function getCode(className) {
    var time = 61;

    var phoneNum = document.getElementById("phoneNum").value;
    var videoNum = document.getElementById("videoNum").value;
    if (videoNum) {
        phoneNum = videoNum;
    }
    if (phoneNum) {
        phoneNum = phoneNum;
    }
    console.log("phoneNum", phoneNum)
    console.log("videoNum", videoNum)
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNum))) {
        layer.open({
            content: '请输入正确手机号',
            skin: 'msg',
            time: 2
        });
        return false;
    }
    //手机号正确，不在执行，等待60秒
    timeFlag = false;

    var data = {
        phoneNum,
    }
    httpRequest("AppleApi/SendCodeService.ashx", "get", data).then(function(res) {
        console.log("获取验证码", res);
        layer.open({
            content: '获取验证码成功',
            skin: 'msg',
            time: 2
        });
        timedown(time, className);

    })
}
// 点击领取补贴金
$(".use-get").click(function() {
    getSubsidies()


});
// 领取补贴金
function getSubsidies() {
    console.log("isreceive", isreceive)
    console.log("reg", reg)
        // 已登记未领取  不用填手机号直接领取
    if (reg && isreceive == 0) {
        var data = {
            action: "receiveallowance",
            sysUserId: userId,
            shopId,
            userLat: "41.79607",
            userLon: "123.45852",

        }
        console.log("data", data)
        httpRequestt("Action/Deathed/DeathedShopAction.ashx", "get", data).then(function(res) {
            console.log("提交用户信息", res);
            if (res.code == 1) {

                layer.open({
                    content: '领取成功',
                    skin: 'msg',
                    time: 3
                });

                document.getElementById("phoneNum").value = ""
                document.getElementById("userName").value = ""
                document.getElementById("TelCode").value = ""

                // 刷新领取人数
                envelopes()
                    // 清空缓存
                localStorage.removeItem("videoLength")
            }
        })
    } else if (isreceive === 0) {
        // 未领取
        var phoneNum = document.getElementById("phoneNum").value
        var userName = document.getElementById("userName").value;
        userName = userName.replace(/(^\s*)|(\s*$)/g, ''); //把首尾的空格去掉
        var TelCode = document.getElementById("TelCode").value;
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
            action: "receiveallowance",
            sysUserId: userId,
            shopId,
            userTel: phoneNum,
            userName,
            userLat: "41.79607",
            userLon: "123.45852",
            userCode: TelCode,
            userSex,
        }
        console.log("data", data)
        httpRequestt("Action/Deathed/DeathedShopAction.ashx", "get", data).then(function(res) {
            console.log("提交用户信息", res);
            if (res.code == 2) {
                layer.open({
                    content: '验证码错误',
                    skin: 'msg',
                    time: 3
                });
            } else {
                layer.open({
                    content: '领取成功',
                    skin: 'msg',
                    time: 3
                });

                document.getElementById("phoneNum").value = ""
                document.getElementById("userName").value = ""
                document.getElementById("TelCode").value = ""

                // 刷新领取人数
                envelopes()
                    // 清空缓存
                localStorage.removeItem("videoLength")


            }
        })
    }
}
// 选择性别效果
$(".sex-select-con ").click(function() {
    $(".sex-select").css("display", "none");
    $(this).find(".sex-select").css("display", "block");
    userSex = $(this).attr("value")
})