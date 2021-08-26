function changemaxCost() {
    $("input#maxCost").change(function(){
        console.log($("#maxCost").val());
        //$( "#slider" ).slider("values", $("#maxCost").val());
        var value2=$("input#maxCost").val();
        $("#slider").slider({ value: value2 });

        if ($("input#maxCost").val() < 101) {
            $( "#slider-result span" ).html("55 руб.");
            $( ".pdp" ).html("55");
            $( ".pdpprice" ).html($("input#maxCost").val() * 55);
        }
        else if ($("input#maxCost").val() < 501) {
            $( "#slider-result span" ).html("65 руб.");
            $( ".pdp" ).html("65");
            $( ".pdpprice" ).html($("input#maxCost").val() * 65);
        }
        else if ($("input#maxCost").val() < 1001) {
            $( "#slider-result span" ).html("75 руб.");
            $( ".pdp" ).html("75");
            $( ".pdpprice" ).html($("input#maxCost").val() * 75);
        }
        else if ($("input#maxCost").val() < 5001) {
            $( "#slider-result span" ).html("85 руб.");
            $( ".pdp" ).html("85");
            $( ".pdpprice" ).html($("input#maxCost").val() * 85);
        }
        else if ($("input#maxCost").val() < 10000) {
            $( "#slider-result span" ).html("95 руб.");
            $( ".pdp" ).html("95");
            $( ".pdpprice" ).html($("input#maxCost").val() * 95);
        }
    });
}

function addImgSlider() {
    $(".coda-nav ul li a").click(function() {
        if ($(".coda-nav ul li a").hasClass("current")) {
            $(".coda-nav ul li img.current").remove();
            $(this).parent().append("<img src='images/current.png' class='current' alt='' />");
        }  else {
            $(".coda-nav ul li img.current").remove();
        }
    });
    $(".coda-nav-left a, .coda-nav-right a").click(function() {
        if ($(".coda-nav ul li a").hasClass("current")) {
            $(".coda-nav ul li img.current").remove();
            $(".coda-nav ul li a").hasClass("current").parent().append("<img src='images/current.png' class='current' alt='' />");
        }  else {
            $(".coda-nav ul li img.current").remove();
        }
    });
}

function makeTabs(contClass) {
    var tabContainers = $('.'+contClass+' > div');
    tabContainers.hide().filter(':first').show();

    $('.'+contClass+' ul.tabNavigation a').click(function () {
        tabContainers.hide();
        tabContainers.filter(this.hash).show();
        $('.'+contClass+' ul.tabNavigation a').removeClass('selected');
        $(this).addClass('selected');
        return false;
    }).filter(':first').click();
}