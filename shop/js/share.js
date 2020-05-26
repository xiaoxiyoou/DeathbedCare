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
    // var link = location.href
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
WeiXinShare("临终关怀商家后台", "http://b.fuyulove.com/ShopActity/shop/index.html", "img/index/share.jpg", "当您的亲人正在病危时刻，您知道亲人最想听的5句话是什么吗？亲人最需要您做的3件事是什么吗？");