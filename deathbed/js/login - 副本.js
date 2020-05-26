var userName
var userHeadImg
var userId
$(function() {
    var NickName = sessionStorage.getItem("NickName");
    console.log("NickName", NickName)
    if (!NickName) {
        GetCode();
    } else {
        // console.log("NickName")
        userName = sessionStorage.getItem("NickName");
        userHeadImg = sessionStorage.getItem("HeadImg");
        userId = sessionStorage.getItem("UserId");
        
        if (shopId) {
            envelopes();    
            shopAdimin();
        } else {
            //未检测到商家
            $(".getEnvelopes").css("display", "none")
        }
        
        getVideo(videoIndex)
        advert()    



    }

});

function getUserData(code) {
    console.log("code", code)
    $.ajax({
        url: "https://wxappapi.fuyulove.com/GetUserInfoData.ashx?code=" + code,
        dataType: "json",
        success: function(res) {
            var data = JSON.parse(res.Data);
            // console.log("res", res)
            sessionStorage.setItem("NickName", data.NickName);
            sessionStorage.setItem("HeadImg", data.HeadImg);
            sessionStorage.setItem("UserId", data.UserId);
            userName = sessionStorage.getItem("NickName");
            userHeadImg = sessionStorage.getItem("HeadImg");
            userId = sessionStorage.getItem("UserId");
            // console.log("userId", userId)
            // Sence()
            if (shopId) {
                envelopes();    
                shopAdimin(); 
            } else {
                //未检测到商家
                $(".getEnvelopes").css("display", "none")
            } 
            
            getVideo(videoIndex)
            advert()  




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