(function(window) {
    var setHtmlSize = function(w) {
        var b = 750 / 100;
        var c = window.innerWidth;
        if (w) {
            c = w
        }
        var a = c / b;
        if (a < 42) {
            a = 42
        } else if (a > 60) {
            a = 60
        }
        document.querySelector("html").style.fontSize = a + "px";
        if (navigator.userAgent.indexOf("iPad") != -1) {
            document.querySelector("html").style.fontSize = "60px"
        }
    };
    setHtmlSize();
    window.onresize = function() {
        var w = window.innerWidth;
        setHtmlSize(w)
    }
}(window));
// 日期选择器
// function demoClick(now) {
   
//     var nowValue = sessionStorage.getItem("inputValue") || document.getElementById('nowValue').value;
//     var nowValue = document.getElementById('nowValue').value;
   
//     new DatePicker({
//         "type": "1", //0年, 1年月, 2月日, 3年月日
//         "title": '', //标题(可选)
//         "maxYear": "", //最大年份（可选）
//         "minYear": "", //最小年份（可选）
//         "separator": "年", //分割符(可选)
//         // "defaultValue":  nowValue.value, //默认值（可选）
//         "defaultValue": nowValue, //默认值（可选）

//         "callBack": function(val) {
//             //回调函数（val为选中的日期）
//         //    nowValue.value = val;
//         nowValue = val;

//         }
//     });
// }