$(function () {
    var userid = localStorage.getItem("UserId");
    if (!userid) {
        sessionStorage.setItem('path', location.href)
        location.href = "./login.html"
        return false

    }

});

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}