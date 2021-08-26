$(function() {

    $('.content .catalogue > li:nth-child(3n)').addClass('last_in_row');
    $('.content .catalogue .last_in_row').after('<li class="clear"></li>');
    $('.border').css('height',$('.main_block').height() - 70);
    $('#head_slider').jcarousel(
    {
        scroll: 1,
        auto: 7,
        wrap: 'both'
    });
    

    var compare_label = $('#compare_label');
    var cart_label = $('#cart_label');

    function show_label(label,event) {
        label.css({
            'display':'block'
        });
    }

    function hide_label(label) {
        label.css({
            'display':'none'
        });
    }

    function move_label(label,event) {
        label.css({
            'left':event.pageX + 5,
            'top':event.pageY - 35
        });
    }

    $('#catalogue .compare, .small_catalogue .compare').hover(function(event) {
        show_label(compare_label,event);
    },function() {
        hide_label(compare_label);
    }).mousemove(function(event) {
        move_label(compare_label,event);
    });

    $('#catalogue .cart, .small_catalogue .cart').hover(function(event) {
        show_label(cart_label,event);
    },function() {
        hide_label(cart_label);
    }).mousemove(function(event) {
        move_label(cart_label,event);
    });

    if ($('.popup').length && $('.popup_overlay').length) {
        
        var popup_overlay = $('.popup_overlay');

        function positionPopup(popup) {
            popup.css({
                'display':'block',
                'margin-left':0 - popup.width()/2,
                'margin-top':0 - popup.height()/2
            });
        }

        function showPopup(popup) {
            $('body').addClass('overlayed');
            popup_overlay.css('display','block');
            positionPopup(popup);
            popup.css('visibility','visible');
        }

        function hidePopup() {
            $('body').removeClass('overlayed');
            popup_overlay.css('display','none');
            $('.popup:visible').css({
                'display':'none',
                'visibility':'hidden'
            });
        }

        $(window).resize(function() {
            if ($('.popup:visible').length) {
                positionPopup($('.popup:visible'));
            }
        });

        popup_overlay.click(function() {
            hidePopup();
        });

        $('.popup_close').click(function() {
            hidePopup();
            return false;
        });

        $('#authorize').click(function() {
            showPopup($('#authorize_popup'));
            return false;
        });

        $('#forgot_pass').click(function() {
            hidePopup();
            showPopup($('#pass_recover_popup'));
            return false;
        });

        $('#authorize_submit').click(function() {
            hidePopup();
            showPopup($('#captcha_popup'));
            return false;
        });

        $('#pass_recover_submit').click(function() {
            hidePopup();
            showPopup($('#notification_popup'));
            return false;
        });
    }
  
    $('#main_menu li').each(function() {
        if ($('ul',$(this)).length) {
            $(this).addClass('submenu');
        }
    });
    
    function addbook() {
        $('#catalogue li .thumbnail').each(function() {
            $(this).hover(
                function () {
                    $(this).addClass('activethumbnail');
                },
                function () {
                    $(this).removeClass('activethumbnail');
                }
                );
        });
    }
    addbook();

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

    $('.custom_checkbox').click(function() {
        $('> a',$(this)).toggleClass('checked');
        return false;
    });


});