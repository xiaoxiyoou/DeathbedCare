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

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
    var link = location.protocol + '//' + location.host + location.pathname
    var articleId = getUrlParam("articleId")
    console.log("articleId", articleId)
    link = link + '?articleId=' + articleId;
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






    });
}