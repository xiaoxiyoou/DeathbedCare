var codeurl = "https://wxappapi.fuyulove.com/"
    // var codeurl = "http://192.168.8.150:2000/"

function httpRequest(url, type, params) {
    return $.ajax({
        type: type,
        url: codeurl + url,
        dataType: 'json',
        async: false,
        data: params

    });

}
// var codeurlLoca = "http://192.168.8.150:8085/ShopActity/"
var codeurlLoca = "http://b.fuyulove.com/"

function httpRequestt(url, type, params) {
    return $.ajax({
        type: type,
        url: codeurlLoca + url,
        dataType: 'json',
        async: false,
        data: params

    });

}