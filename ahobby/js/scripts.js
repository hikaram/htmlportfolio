$(function() {
  if ($('.leftmenu').length) {

    var left_menu = $('.leftmenu > ul');
    var left_menu_visible_area_height = $('.leftmenu').height();
    var up_slide = $('.lb-menu a.up');
    var down_slide = $('.lb-menu a.down');
    var left_menu_slide_ready = true;
    var LEFT_MENU_SLIDE_SPEED = 300;
    var LEFT_MENU_SLIDE_OFFSET = 100;

    function setLeftMenuButtons() {
      menu_top_offset = parseInt(left_menu.css('top'));
      menu_bottom_offset = left_menu.height() - left_menu_visible_area_height - Math.abs(parseInt(left_menu.css('top')));
      if (menu_top_offset == 0) {
        up_slide.addClass('disabled');
      } else {
        up_slide.removeClass('disabled');
      }
      if (menu_bottom_offset <= 0) {
        down_slide.addClass('disabled');
      } else {
        down_slide.removeClass('disabled');
      }
    }

    setLeftMenuButtons();

    function getLeftMenuSlideTopSpace() {
      menu_top_offset = Math.abs(parseInt(left_menu.css('top')));
      if (menu_top_offset >= LEFT_MENU_SLIDE_OFFSET) {
        return LEFT_MENU_SLIDE_OFFSET;
      } else {
        return menu_top_offset;
      }
    }

    function getLeftMenuSlideBottomSpace() {
      menu_bottom_offset = left_menu.height() - left_menu_visible_area_height - Math.abs(parseInt(left_menu.css('top')));
      if (menu_bottom_offset >= LEFT_MENU_SLIDE_OFFSET) {
        return LEFT_MENU_SLIDE_OFFSET;
      } else {
        return menu_bottom_offset;
      }
    }

    up_slide.click(function() {
      if (!$(this).hasClass('disabled') && left_menu_slide_ready) {
        left_menu_slide_ready = false;
        left_menu.animate({
          top: '+=' + getLeftMenuSlideTopSpace()
        }, LEFT_MENU_SLIDE_SPEED, function() {
          setLeftMenuButtons();
          left_menu_slide_ready = true;
        });
      }
      return false;
    });

    down_slide.click(function() {
      if (!$(this).hasClass('disabled') && left_menu_slide_ready) {
        left_menu_slide_ready = false;
        left_menu.animate({
          top: '-=' + getLeftMenuSlideBottomSpace()
        }, LEFT_MENU_SLIDE_SPEED, function() {
          setLeftMenuButtons();
          left_menu_slide_ready = true;
        });
      }
      return false;
    });

    if ($('>li > ul',left_menu).length) {
        $('>li > ul',left_menu).each(function() {
            $(this).closest('li').addClass('collapsed').append('<span></span>');
        });
    }

    var menu_items = $('.leftmenu > ul > li > span');
    var MENU_ITEM_OPENED_CLASS = 'expanded';
    var MENU_ITEM_CLOSED_CLASS = 'collapsed';

    menu_items.click(function() {
      if ($('> ul', $(this).parent()).length) {
        if ($(this).parent().hasClass(MENU_ITEM_CLOSED_CLASS)) {
          $(this).parent().removeClass(MENU_ITEM_CLOSED_CLASS).addClass(MENU_ITEM_OPENED_CLASS);
        } else if ($(this).parent().hasClass('expanded')) {
          $(this).parent().removeClass(MENU_ITEM_OPENED_CLASS).addClass(MENU_ITEM_CLOSED_CLASS);
        }
        setLeftMenuButtons();
        return false;
      } else {
        return true;
      }

    });

  }

  if ($('#carouseltop').length) {

    var TOP_MENU_SLIDE_SPEED = 300;
    var TOP_MENU_SLIDE_OFFSET = 210;
    var top_menu = $('#carouseltop');
    var top_menu_items = top_menu.find('> li');
    var top_menu_width = TOP_MENU_SLIDE_OFFSET * top_menu_items.length;
    top_menu.css('width',top_menu_width);
    var top_menu_visible_area = top_menu.closest('.cartop');
    var prev_slide = top_menu.closest('.c-slider').find('> a.back');
    var next_slide = top_menu.closest('.c-slider').find('> a.next');
    var top_menu_slide_ready = true;

    function setTopMenuButtons() {
      menu_left_offset = parseInt(top_menu.css('left'));
      menu_right_offset = top_menu.width() - top_menu_visible_area.width() - Math.abs(parseInt(top_menu.css('left')));
      if (menu_left_offset == 0) {
        prev_slide.addClass('disabled');
      } else {
        prev_slide.removeClass('disabled');
      }
      if (menu_right_offset <= 0) {
        next_slide.addClass('disabled');
      } else {
        next_slide.removeClass('disabled');
      }
    }

    setTopMenuButtons();

    $(window).resize(function() {
      setTopMenuButtons();
    });

    function getTopMenuSlideLeftSpace() {
      menu_left_offset = Math.abs(parseInt(top_menu.css('left')));
      if (menu_left_offset >= TOP_MENU_SLIDE_OFFSET) {
        return TOP_MENU_SLIDE_OFFSET;
      } else {
        return menu_left_offset;
      }
    }

    function getTopMenuSlideRightSpace() {
      menu_right_offset = top_menu.width() - top_menu_visible_area.width() - Math.abs(parseInt(top_menu.css('left')));
      if (menu_right_offset >= TOP_MENU_SLIDE_OFFSET) {
        return TOP_MENU_SLIDE_OFFSET;
      } else {
        return menu_right_offset;
      }
    }

    prev_slide.click(function() {
      if (!$(this).hasClass('disabled') && top_menu_slide_ready) {
        top_menu_slide_ready = false;
        top_menu.animate({
          left: '+=' + getTopMenuSlideLeftSpace()
        }, TOP_MENU_SLIDE_SPEED, function() {
          setTopMenuButtons();
          top_menu_slide_ready = true;
        });
      }
      return false;
    });

    next_slide.click(function() {
      if (!$(this).hasClass('disabled') && top_menu_slide_ready) {
        top_menu_slide_ready = false;
        console.log(getTopMenuSlideRightSpace())
        top_menu.animate({
          left: '-=' + getTopMenuSlideRightSpace()
        }, TOP_MENU_SLIDE_SPEED, function() {
          setTopMenuButtons();
          top_menu_slide_ready = true;
        });
      }
      return false;
    });

  }


  $('.showFormLogin').click(function(){
    $('body').overlay({
      opacity:0.7
    }).show();
    $('#loginform').middle('window',{
      position: 'fixed'
    }).show();
    return false;
  });
  $('.close').live('click',function(){
    $('#loginform').hide();
    $('#m5_overlay').hide();
  });
        
        
  $('.ShowPreorder').click(function(){
    $('body').overlay({
      opacity:0.7
    }).show();
    $('#preorder').middle('window',{
      position: 'fixed', 
      top: 0
    }).show();
    return false;
  });
  $('.close').live('click',function(){
    $('#preorder').hide();
    $('#m5_overlay').hide();
  });
        
  $('.ShowThank').click(function(){
    $('body').overlay({
      opacity:0.7
    }).show();
    $('#thanks').middle('window',{
      position: 'fixed', 
      top: 0
    }).show();
    return false;
  });
  $('.close').live('click',function(){
    $('#thanks').hide();
    $('#m5_overlay').hide();
  });
        
        
  $('.ShowForgot').click(function(){
    $('body').overlay({
      opacity:0.7
    }).show();
    $('#forgotpass').middle('window',{
      position: 'fixed', 
      top: 0
    }).show();
    return false;
  });
  $('.close').live('click',function(){
    $('#forgotpass').hide();
    $('#m5_overlay').hide();
  });
        
  $('.ShowRobot').click(function(){
    $('body').overlay({
      opacity:0.7
    }).show();
    $('#robot').middle('window',{
      position: 'fixed', 
      top: 0
    }).show();
    return false;
  });
  $('.close').live('click',function(){
    $('#robot').hide();
    $('#m5_overlay').hide();
  });  
  
  
  $('.ShowBigPhoto').click(function(){
    $('body').overlay({
      opacity:0.7
    }).show();
    $('#bigphoto').middle('window',{
      position: 'fixed', 
      top: 0
    }).show();
    
     $('.bigphotocar').jCarouselLite({
            btnNext: ".pw-photo .next",
            btnPrev: ".pw-photo .back",
            visible: 1
        });
        
    return false;
  });
  $('.close').live('click',function(){
    $('#bigphoto').hide();
    $('#m5_overlay').hide();
  });


    
  $(".smallslider").jCarouselLite({
    btnNext: ".small-slider a.next",
    btnPrev: ".small-slider a.back",
    visible: Math.ceil($(".smallslider").width() / 84)
  });
  
  $(".ssin").jCarouselLite({
    btnNext: ".ss-in a.next",
    btnPrev: ".ss-in a.back",
    visible: Math.ceil($(".smallslider").width() / 150) 
  });
  

if ($('#slider').length) {
    $("#slider").slider({
        min: 0,
        max: 99000,
        values: [0,99000],
        range: true,
        stop: function(event, ui) {
            $("input#minCost").val($("#slider").slider("values",0));
            $("input#maxCost").val($("#slider").slider("values",1));

        },
        slide: function(event, ui){
            $("input#minCost").val($("#slider").slider("values",0));
            $("input#maxCost").val($("#slider").slider("values",1));
        }
    });

    $("input#minCost").change(function(){

        var value1=$("input#minCost").val();
        var value2=$("input#maxCost").val();

        if(parseInt(value1) > parseInt(value2)){
            value1 = value2;
            $("input#minCost").val(value1);
        }
        $("#slider").slider("values",0,value1);
    });


    $("input#maxCost").change(function(){

        var value1=$("input#minCost").val();
        var value2=$("input#maxCost").val();

        if (value2 > 99000) {value2 = 99000;$("input#maxCost").val(99000)}

        if(parseInt(value1) > parseInt(value2)){
            value2 = value1;
            $("input#maxCost").val(value2);
        }
        $("#slider").slider("values",1,value2);
    });
}

  if ($('#tabs_container').length) {
    tabs = $('#tabs li');
    tabs_content = $('#tabs_content > li');
    tabs_container = $('#tabs_container');

    tabs.click(function() {
      if (!$(this).hasClass('active')) {
        $('#tabs li.active').removeClass('active');
        $(this).addClass('active');
        $('#tabs_content > li.active').removeClass('active');
        tabs_content.eq($(this).index()).addClass('active');
        if ($(this).is(':last-child')) {
          tabs_container.addClass('last_active');
        } else if ($(this).is(':first-child')) {
          tabs_container.removeClass('last_active');
          tabs_container.addClass('first_active');
        } else {
          tabs_container.removeClass('last_active first_active');
        }
        return false;
      } else {
        return false;
      }
    });

  }


});