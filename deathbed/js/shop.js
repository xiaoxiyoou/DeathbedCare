WeiXinShare("���չػ����潲��", "", "/img/loc/index_top.png", "�������������ڲ�Σʱ�̣���֪��������������5�仰��ʲô����������Ҫ������3������ʲô��");
var message = getRequest();
console.log("message", message);
if (JSON.stringify(message) != "{}") {
    var name = message.name;
    if (name == "�ҵ�λ��") {
        $(".address-show").text(localStorage.getItem("address"))

    } else {
        $(".address-show").text(name);

    }
    var latng = message.latng;
    var latitude = latng.split(",")[0];
    var longitude = latng.split(",")[1];
} else {
    var latitude = localStorage.getItem("latitude");
    var longitude = localStorage.getItem("longitude");
    var locationString = latitude + "," + longitude;
    parseAddress(locationString)


}


$(function() {

    shop();

});
// ����ҳ������
function shop() {
    var data = {

        distance: 5,
        pageIndex: 1,
        pageSize: 1000,
        lat: latitude,
        lot: longitude
    }
    console.log("data", data)
    httpRequest("DeathbedConcernApi/DeathbedShopList.ashx", "get", data).then(function(res) {
        console.log("�̼���������", res);
        var html = "";
        var data = res.Data;
        if (data != null) {
            for (var i = 0; i < data.length; i++) {

                html += '<div class="item">';
                if (data[i].ImgUrl == "http://shangjia.zysky.xin/Upload/yixiang/6a38b38848b149eb9195308dd45c9157.jpg") {
                    html += '<img class="img" src="./img/loc/nopic.jpg" />';
                } else if (data[i].ImgLogo != "") {
                    html += '<img class="img" src="' + data[i].ImgLogo + '" />';
                } else if (data[i].ImgUrl != "") {
                    html += '<img class="img" src="' + data[i].ImgUrl + '" />';
                } else {
                    html += '<img class="img" src="./img/loc/nopic.jpg" />';
                }
                html += ' <div class="item-content">';
                html += '<div class="item-title">' + data[i].ShopName + '</div>';
                html += ' <div class="phoneCon">';
                html += '<img class="phone" src="./img/loc/phone.png" />';
                html += ' <div>��ϵ�绰 : </div>';
                if (data[i].Mobile != "") {
                    html += ' <div>' + data[i].Mobile + '</div>';
                } else {
                    html += ' <div>������ϵ��ʽ</div>';
                }
                html += '  </div>';
                html += ' <div class="location">' + data[i].Address + '</div>';
                html += ' </div>';
                html += '</div>';
            }
            $(".itemcontent").append(html)
        } else {
            $(".no").css("display", "block");
            $(".footCon").css("display", "none");


        }

    })
}


//ҳ����ȫ������
$(window).load(function() {
    $(".shop").css("display", "block");
    // ����load
    $(".loadcon").css("display", "none");

});
// ���ֲ��ֹ����
$('.zhezhao').bind("touchmove ", function(e) {
    e.preventDefault();
});

//����л�λ��
$(".address-select").click(function() {


    href = 'https://apis.map.qq.com/tools/locpicker?search=1&type=0&mapdraggable=1&radius=1500&tota=20&backurl=http://wx.fuyulove.com/info/deathbed/shop.html&key=W5MBZ-777C5-VKNI3-QIMDK-U5IIK-SJF35&referer=myapp'
        //href = 'https://apis.map.qq.com/tools/locpicker?search=1&type=0&mapdraggable=1&radius=1500&tota=20&backurl=http://localhost:34950/Info/deathbed/shop.html&key=W5MBZ-777C5-VKNI3-QIMDK-U5IIK-SJF35&referer=myapp'
    window.location.href = href;


});
//��ȡ��ַ���������Ϣ
function getRequest() {
    var url = window.location.search; //��ȡurl��"?"������ִ�   
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            //������������
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            //֮ǰ����unescape()
            //�Ż��������  
        }
    }
    return theRequest;
}


//���ַ����

function parseAddress(locationString) {
    $.ajax({
        type: 'get',
        url: 'http://apis.map.qq.com/ws/geocoder/v1',
        dataType: 'jsonp',
        data: {
            key: "W5MBZ-777C5-VKNI3-QIMDK-U5IIK-SJF35", //������Կ
            location: locationString, //λ������
            get_poi: "1", //�Ƿ񷵻��ܱ�POI�б���1.���أ�0������(Ĭ��)
            coord_type: "1", //�����locations����������,1 GPS����
            parameter: { "scene_type": "tohome", "poi_num": 20 }, //���ӿ��ƹ���
            output: "jsonp"
        },
        success: function(data, textStatus) {
            if (data.status == 0) {
                console.log("���ַ����", data)
                var address = data.result.formatted_addresses.recommend;
                localStorage.setItem("address", address)
                $(".address-show").text(address)

            }
        },
        error: function() {
            alert("ϵͳ��������ϵ����Ա��")
        }
    });
}