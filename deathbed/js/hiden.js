function videoShow() {
    console.log("只显示视频")
    $(".video").css("display", "block")
    $(".fake").css("display", "none")
    $(".fakeCon").css("display", "none")
    $(".loadFake").css("display", "none")
}

function fakeShow() {
    console.log("显示灰色图片")
    $(".fake").css("display", "block")
    $(".video").css("display", "none")
    $(".fakeCon").css("display", "none")
    $(".loadFake").css("display", "none")
}

function loadFakeShow() {
    console.log("显示封面")
    $(".loadFake").css("display", "block")
    $(".fake").css("display", "none")
    $(".video").css("display", "none")
    $(".fakeCon").css("display", "none")
}

function fakeConShow() {
    console.log("切换下一集")
    $(".fakeCon").css("display", "block")
    $(".fake").css("display", "none")
    $(".video").css("display", "none")
    $(".loadFake").css("display", "none")
}