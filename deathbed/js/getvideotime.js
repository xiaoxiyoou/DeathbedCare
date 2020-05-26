// 监听视频实时播放
function myFunction(event) {
    var timeDisplay = Math.floor(event.currentTime);
    sessionStorage.setItem("timeDisplay", timeDisplay)





}
//监听视频结束
function videoPause() {
    // console.log("视频播放暂停")
    var timeDisplay = (sessionStorage.getItem("timeDisplay", timeDisplay) / 60).toFixed(2);
    var ArticleId = videoIdCon[videoIndex]
    videoview(timeDisplay, ArticleId)

}
// 统计观看视频
function videoview(videotime, ArticleId) {
    var data = {
        action: "videoview",
        shopId: shopId,
        videotime,
        sysUserId: userId,
        ArticleId
    }
    $.ajax({
        type: 'GET',
        url: 'http://b.fuyulove.com/Action/Deathed/DeathedShopAction.ashx?',
        dataType: 'json',
        async: false,
        data: data,
        success: function(res) {
            // console.log("统计观看视频", res)


        }
    })

}