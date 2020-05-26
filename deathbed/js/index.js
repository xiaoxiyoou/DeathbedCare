var isreceive //是否领取过补贴金
var timeFlag = true; //防止重复点击获取验证码
var userSex = 1 //性别
var reg
var subsidieShow //是否设置补贴金
var AdId
var shopId
var shopMobile
userId = localStorage.getItem("UserId");
$(function () {
    Sence()
});
// 遮罩层禁止滑动
$('.zhezhao').bind("touchmove", function (e) {
    e.preventDefault();
});
// 取到商家和广告id
var searchUrl = getUrlParam("shopId")

function getStr(string, str) {
    if (string) {
        shopId = string.split(str)[0];
        AdId = string.split(str)[1];
    }
    // console.log("shopId", shopId)
    // console.log("AdId", AdId)


}
// 取到经纬度
// var latitude = sessionStorage.getItem("latitude");
// var longitude = sessionStorage.getItem("longitude");

// 渲染补贴金领取相关信息

function envelopes() {
    var data = {
        action: "shopallowance",
        sysUserId: userId,
        shopId: shopId,
    }

    httpRequestt("Action/Deathed/DeathedShopAction.ashx", "get", data).then(function (res) {
        console.log("惠民补贴金", res);
        var code = res.code;

        $("#use-btm-href").attr("href", "http://wx.fuyulove.com/Merch/detail.aspx?sid=" + shopId)
        if (code === 1) {
            var data = res.data.data;
            isreceive = data.isreceive
            reg = data.isreg
            if (data.shopMobile) {
                shopMobile = data.shopMobile
                $(".shopMobile").attr("href", "tel:" + shopMobile)
            }
            console.log("reg", reg)
            if (isreceive == 1) {
                $(".videoReceive").css("display", "none") // 已经领取
                $(".use-btm").css("display", "block")
                $(".use-get").css("display", "none")
            } else if (reg && isreceive == 0) {
                $(".videoReceive").css("display", "none") // 已经填  未领取
                $(".use-btm").css("display", "none")
                $(".use-get").css("display", "block")
            } else if (isreceive == 0 && reg == 0) {
                $(".videoReceive").css("display", "block") //未领取  未填写
                $(".use-btm").css("display", "none")
                $(".use-get").css("display", "block")

            }
            var ShopAllowanceAmount = data.ShopAllowanceAmount;
            if (ShopAllowanceAmount > 0) {
                var receiveTotal = data.receiveTotal
                isreceive = data.isreceive;
                console.log("ShopAllowanceAmount", ShopAllowanceAmount)
                $(".cashNOum").text(' 已有' + (500 + receiveTotal) + '人领取')
                $(".num").text(ShopAllowanceAmount)
                subsidieShow = 1;
            }
        } else {
            //商家补贴金设置为0的时候
            subsidieShow = 2;
        }

    })
}



// 绑定商家和用户

function shopAdimin() {
    var data = {
        action: "shopviewuser",
        sysUserId: userId,
        shopId,
    }

    httpRequestt("Action/Deathed/DeathedShopAction.ashx", "get", data).then(function (res) {
        console.log("绑定商家和用户", res);


    })
}

// 请求文章列表
function Sence() {
    var data = {
        UserID: userId,
        pageIndex: 1,
        pageSize: 100,
        orderCate: 0,
        cateId: 12,
        dateStr: null
    }
    $.ajax({
        type: 'GET',
        url: codeurl + '/DeathbedConcernApi/DeathbedConcernList.ashx',
        dataType: 'json',
        async: false,
        data: data,
        success: function (res) {
            console.log("文章列表", res)
            list = res.Data;
            Id = list.map(function (item) {
                return item.Id;
            });
            var link = list[0].link
            console.log("lik", link)
            html = "";
            for (var i = 0; i < list.length; i++) {
                html += '<div class="line"></div>'
                if (list[i].link) {
                    html += '<a href = "' + list[i].link + '" > '
                } else {
                    html += '<a href = "./detail.html?articleId=' + list[i].Id + '" > '
                }
                html += '<div class="article-item-con c-row j-b a-c">'
                html += '<img class="article-img" src="' + list[i].Photo + '" alt="">'
                html += '<div class="article-item c-col j-b">'
                html += '<div class="article-title">' + list[i].Title + '</div>'
                html += '<div class="article-text">' + list[i].Description + '</div>'
                html += '<div class="article-see c-row a-c">'
                html += '<img class="article-see-img" src="./img/index/look.png" alt="">'
                html += '<div class="article-see-num">' + list[i].Look + '</div>'
                html += '</div>'
                html += ' </div>'
                html += '</div>'
                html += '</a>'

            }
            $(".articleCon").append(html);
            setTimeout(function () {
                $(".more-con").css("dispaly", "block")
            }, 2000);

        },
        error: function (res) {
            // alert(res.Info)
        }
    });
}
// 展示商家广告
function advert() {
    if (AdId) {
        var data = {
            action: "shopadview",
            shopId: shopId,
            shopAdId: AdId,
            sysUserId: userId
        }

    } else {
        var data = {
            action: "shopadview",
            shopId: shopId,
            sysUserId: userId
        }

    }

    console.log("data", data)
    $.ajax({
        type: 'GET',
        url: codeurlLoca + '/Action/Deathed/DeathedShopAction.ashx',
        dataType: 'json',
        async: false,
        data: data,
        success: function (res) {
            console.log("商家广告展示", res)
            var code = res.code
            if (code == 1) {
                var adevrt = res.data.data.AdImg
                var adeverLink = res.data.data.AdLink
                $(".advertiseCon").css("display", "block")
                $(".advertise").attr("src", adevrt)
                if (adeverLink) {
                    $(".adeverLink").attr("href", adeverLink)
                }
            } else if (code == 0) {
                // 当没有广告时候显示默认图片
                $(".advertiseCon").css("display", "block")
                $(".advertise").attr("src", "./img/index/advertises.jpg")
                // 展示商家电话
                if(shopMobile){

                    $(".adeverLink").attr("href", "tel:" + shopMobile)
                }
            }

        }
    })

}