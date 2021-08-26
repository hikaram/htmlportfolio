function settime2() {
    setTimeout(function () {
        $(".c_wrapper6-new").css("display", "block");
        $(".logotxt").attr("src", "images/logo2.jpg");
    }, 3000);
}
$(document).bind('ready', function(){
    setTimeout(function () {
        $(".c_wrapper6-new").css("display", "block");
        $(".c_wrapper6").css("display", "none");
        $(".logotxt").attr("src", "images/logo2.jpg");
    }, 3000);
});
