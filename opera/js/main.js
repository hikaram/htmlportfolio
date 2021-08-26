function settime2() {
    setTimeout(function () {
        var img2;
        img2 = $(".img1").attr("src", "images/end.jpg");
    }, 3000);
}
$(document).bind('ready', function(){
    setTimeout(function () {
        settime2()
    }, 3000);
    setTimeout(function () {
        $(".img1").attr("src", "images/opera.gif");
    }, 3000);
});
