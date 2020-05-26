jQuery(document).ready(function($) {
    // 第一次加载设置input宽度
    $('.input_auto').each(function(index, el) {
        textWidth($(this))
    });
    // 改变文本内容时重置宽度
    $('.input_auto').bind('input oninput', function() {
        textWidth($(this))
    });

    function textWidth($this) {
        // 获取当前input的value值和字体大小
        var inputVal = $this.val();
        var font = $this.css('font-size');
        //获取容器的宽度
        $(".spanw").text(inputVal).css('font-size', font);;
        var width = $(".spanw").width();
        // 清空容器
        $(".spanw").text('');
        // 设置input宽度
        $this.css('width', width);
    };

});