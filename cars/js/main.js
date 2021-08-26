$(window).load(function() {
    $('.flexslider').flexslider({
        slideshow: false
    });
    $('.info').click(function(){
        $('.infobox').css('display', 'block');
        $('.price').css('display', 'none');
        $('.info').css('display', 'none');
        $('.flex-caption').css('display', 'none');
        $('.flex-direction-nav').css('display', 'none');
    });
     $('.close').click(function(){
        $('.infobox').css('display', 'none');

         $('.price').css('display', 'block');
         $('.info').css('display', 'block');
         $('.flex-caption').css('display', 'block');
         $('.flex-direction-nav').css('display', 'block');
    });
  });
