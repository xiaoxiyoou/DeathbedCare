$(function() {
    var NickName = sessionStorage.getItem("NickName");
    console.log("NickName", NickName)
    if (!NickName) {
        GetCode();
    } else {
        userId = sessionStorage.getItem("UserId");
        userName = sessionStorage.getItem("NickName");
        userHeadImg = sessionStorage.getItem("HeadImg");
        detailTitle(articleId[index]);
        conment_request(articleId[index])
        regSign(index)
            // 请求剩余部分文章内容
        for (var i = 1; i < length; i++) {
            getConent(infosContentId[i]);
        }

    }

});

function getUserData(code) {
    console.log("code", code)
    $.ajax({
        url: "https://wxappapi.fuyulove.com/GetUserInfoData.ashx?code=" + code,
        dataType: "json",
        success: function(res) {
            var data = JSON.parse(res.Data);
            console.log("登陆信息请求", res)
            sessionStorage.setItem("NickName", data.NickName);
            sessionStorage.setItem("HeadImg", data.HeadImg);
            sessionStorage.setItem("UserId", data.UserId);
            userId = sessionStorage.getItem("UserId");
            userName = sessionStorage.getItem("NickName");
            userHeadImg = sessionStorage.getItem("HeadImg");
            detailTitle(articleId[index]);
            conment_request(articleId[index])
            regSign(index)
                // 请求剩余部分文章内容
            for (var i = 1; i < length; i++) {
                getConent(infosContentId[i]);
            }

        }
    });
}



function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function GetCode() {
    var code = getUrlParam("code");
    if (code == '' || code == undefined) {
        let appid = "wx3a1c77d8059257bf";
        let redirect_url = window.location.href
        let url = 'http://wxapi.fuyulove.com/sns/base.aspx?keys=fyloveobit&redirect_uri=' + redirect_url;
        window.location.href = url


    } else {
        getUserData(code);

    }

}