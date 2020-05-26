function WeiXinShare(title, link, imgurl, sharedesc) {
    var data = {
        url: window.location.href,
        t: Math.random()
    };

    var _getWechatSignUrl = 'http://b.fuyulove.com/Action/CacheData.aspx?action=jssdk';
    $.ajax({
        url: _getWechatSignUrl,
        data: data,
        success: function(res) {


            if (res.code == 1) {
                wxConfig(res.data.data.appid, res.data.data.timestamp, res.data.data.nonceStr, res.data.data.signature);
            }
        }
    });

    function wxConfig(_appId, _timestamp, _nonceStr, _signature) {
        wx.config({
            debug: false,
            appId: _appId,
            timestamp: _timestamp,
            nonceStr: _nonceStr,
            signature: _signature,
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage', 'openLocation', 'getLocation'
            ]
        });



    }
    var link = location.protocol + '//' + location.host + location.pathname
    var shopId = getUrlParam("shopId");
    link = link + '?shopId=' + shopId;
    console.log("link", link)


    wx.ready(function() {
        wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: 'http://b.fuyulove.com/ShopActity/deathbed/' + imgurl,
            success: function() {

            }
        });
        wx.onMenuShareAppMessage({
            title: title,
            desc: sharedesc,
            link: link,
            imgUrl: 'http://b.fuyulove.com/ShopActity/deathbed/' + imgurl,
            type: '',
            dataUrl: '',
            success: function() {

            }
        });
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                console.log("res", res)
                var latitude = res.latitude;
                var longitude = res.longitude;
                console.log("longitude", longitude)
                sessionStorage.setItem("longitude", longitude);
                sessionStorage.setItem("latitude", latitude);

            }
        });





    });
}