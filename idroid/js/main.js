var cssFix = function(){
    var u = navigator.userAgent.toLowerCase(),
        addClass = function(el,val){
            if(!el.className) {
                el.className = val;
            } else {
                var newCl = el.className;
                newCl+=(" "+val);
                el.className = newCl;
            }
        },
        is = function(t){
            return (u.indexOf(t)!=-1)
        };
    addClass(document.getElementsByTagName('html')[0],[
        (!(/opera|webtv/i.test(u))&&/msie (\d)/.test(u))?('ie ie'+RegExp.$1)
            :is('firefox/2')?'gecko ff2'
            :is('firefox/3')?'gecko ff3'
            :is('gecko/')?'gecko'
            :is('opera/9')?'opera opera9':/opera (\d)/.test(u)?'opera opera'+RegExp.$1
            :is('konqueror')?'konqueror'
            :is('applewebkit/')?'webkit safari'
            :is('mozilla/')?'gecko':'',
        (is('x11')||is('linux'))?' linux'
            :is('mac')?' mac'
            :is('win')?' win':''
    ].join(" "));
}();


var is_chrome = false, chrome_version = false;
if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    is_chrome = true;
    chrome_version = navigator.userAgent.replace(/^.*Chrome\/([\d\.]+).*$/i, '$1')
}
$('document').ready(function() {
    $('#coda-slider').codaSlider();
  /*  $('.ui-slider-handle').hover(function() {
            console.log('123111');
            $(this).slider("enable");
        },
        function() {
            console.log('11');
            $(this).slider("disable");
        });*/
    $( "#slider" ).slider({
        value: 1,
        min: 1,
        max: 10000,
        step: 1,
        stop: function(event, ui) {
            var leftslide = $(".ui-slider-handle").position().left;
            $("#slider-result").css('left', leftslide);
        },
        slide: function( event, ui ) {
            $( "#maxCost" ).val( $("#slider").slider("values",1) + ""  );
            var leftslide = $(".ui-slider-handle").position().left;
            $("#slider-result").css('left', leftslide);
            if (ui.value < 101) {
                $( "#slider-result span" ).html("55 руб.");
                $( ".pdp" ).html("55");
                $( ".pdpprice" ).html(ui.value * 55);
            }
            else if (ui.value < 501) {
                $( "#slider-result span" ).html("65 руб.");
                $( ".pdp" ).html("65");
                $( ".pdpprice" ).html(ui.value * 65);
            }
            else if (ui.value < 1001) {
                $( "#slider-result span" ).html("75 руб.");
                $( ".pdp" ).html("75");
                $( ".pdpprice" ).html(ui.value * 75);
            }
            else if (ui.value < 5001) {
                $( "#slider-result span" ).html("85 руб.");
                $( ".pdp" ).html("85");
                $( ".pdpprice" ).html(ui.value * 85);
            }
            else if (ui.value < 10000) {
                $( "#slider-result span" ).html("95 руб.");
                $( ".pdp" ).html("95");
                $( ".pdpprice" ).html(ui.value * 95);
            }

        },

        change: function(event, ui) {
            $('#hidden').attr('value', ui.value);
            var leftslide = $(".ui-slider-handle").position().left;
            $("#slider-result").css('left', leftslide);
        }

    });
    $(".enter").click(function() {
        $(".enterpopup").css('display', 'block');
        $(".regpopup").css('display', 'none');
    });
    $(".headreg").click(function() {
        $(".regpopup").css('display', 'block');
        $(".enterpopup").css('display', 'none');
    });
    $(".close").click(function() {
        $(this).parent().css('display', 'none');
    });
    addImgSlider();
    changemaxCost();
    $( "#from" ).datepicker({
        dateFormat: "dd.mm.yy",
        defaultDate: "+1w",
        numberOfMonths: 1,
        onClose: function( selectedDate ) {
            $( "#to" ).datepicker( "option", "minDate", selectedDate );
        }
    });
    $( "#to" ).datepicker({
        dateFormat: "dd.mm.yy",
        defaultDate: "+1w",
        numberOfMonths: 1,
        onClose: function( selectedDate ) {
            $( "#from" ).datepicker( "option", "maxDate", selectedDate );
        }
    });
    $(".b-carousel-button-right").click(function(){ // при клике на правую кнопку запускаем следующую функцию:
        $(".h-carousel-items").animate({left: "-222px"}, 200); // производим анимацию: блок с набором картинок уедет влево на 222 пикселя (это ширина одного прокручиваемого элемента) за 200 милисекунд.
        setTimeout(function () { // устанавливаем задержку времени перед выполнением следующих функций. Задержка нужна, т.к. эти ффункции должны запуститься только после завершения анимации.
            $(".h-carousel-items .b-carousel-block").eq(0).clone().appendTo(".h-carousel-items"); // выбираем первый элемент, создаём его копию и помещаем в конец карусели
            $(".h-carousel-items .b-carousel-block").eq(0).remove(); // удаляем первый элемент карусели
            $(".h-carousel-items").css({"left":"0px"}); // возвращаем исходное смещение набора набора элементов карусели
        }, 300);
    });

    $(".b-carousel-button-left").click(function(){ // при клике на левую кнопку выполняем следующую функцию:
        $(".h-carousel-items .b-carousel-block").eq(-1).clone().prependTo(".h-carousel-items"); // выбираем последний элемент набора, создаём его копию и помещаем в начало набора
        $(".h-carousel-items").css({"left":"-222px"}); // устанавливаем смещение набора -222px
        $(".h-carousel-items").animate({left: "0px"}, 200); // за 200 милисекунд набор элементов плавно переместится в исходную нулевую точку
        $(".h-carousel-items .b-carousel-block").eq(-1).remove(); // выбираем последний элемент карусели и удаляем его
    });
    makeTabs('statistics');
    makeTabs('graf-menu');
    $('input.b-radio').radio();
    $(".link1").click(function() {
        setTimeout(function () {
            $(".gifka").css("display", "block");
            $(".blackout").css("display", "block");
        }, 500);
        setTimeout(function () {
            location.href='lending.html';
        }, 3000);
    });
    $(".link2").click(function() {
        setTimeout(function () {
            $(".gifka").css("display", "block");
            $(".blackout").css("display", "block");
        }, 500);
        setTimeout(function () {
            location.href='promo.html';
        }, 3000);
    });
    $('#select-lend').change(function() {
       if($('#select-lend option:selected').val() == "1") {

       }
    });

});
