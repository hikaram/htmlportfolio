(function($) {
	/**
	 * $ is an alias to jQuery object
	 *
	 */
	$.fn.vscroll = function(settings) {
		settings = jQuery.extend({
			// Configuration related to overlay
			scroll: 		'horisontal',
			vbar: 		'horisontal',
			sh: 0,
			count: 0,
		},settings);
		
		if ( this[0].addEventListener ) {
            this.find('#vscroll')[0].addEventListener('DOMMouseScroll', wheel, false);
        } 
        this.find('#vscroll')[0].onmousewheel = wheel;

        var vscroll = this;
        this.find('#vscroll_left').click(function(){wheel(false, -1)});
        this.find('#vscroll_right').click(function(){wheel(false, 1)});
        
        function wheel(event, wDelta) {
			if (event !== false){
			   // опять забота о кроссбраузерности
			   if (event.wheelDelta)  {
			        wDelta = event.wheelDelta/120;
			    }   else if (event.detail)   {     
			        wDelta = -event.detail/3;
			    } else {
			    	wDelta = 0;
			    }
			}
		    // тут обрабатываем результат, например:
		   obj = vscroll.find('#vscroll').find('#vcontent');
		   if (settings.scroll == 'horisontal'){
			   if ((wDelta > 0 && obj.position().left < 0) || (wDelta < 0 && ((settings.sh * settings.count + obj.position().left) > vscroll.find('#vscroll').width()+20) )){
				   obj.css('left', (obj.position().left + wDelta * settings.sh) + 'px' );
				   
				   vsh = settings.sh * settings.count - vscroll.find('#vscroll').width();
				   pos = -obj.position().left;
			   }
			}
			if (settings.scroll == 'vertical'){
			   if ((wDelta > 0 && obj.position().top < 0) || (wDelta < 0 && ((settings.sh * settings.count + obj.position().top) > vscroll.find('#vscroll').height()+20) )){
				   obj.css('top', (obj.position().top + wDelta * settings.sh) + 'px' );
				   
				   vsh = settings.sh * settings.count - vscroll.find('#vscroll').height();
				   pos = -obj.position().top;
			   }
			}
			if (settings.vbar == 'horisontal'){
				vsb = vscroll.find('#vscroll_bar').width()-20;
			    proc = Math.ceil(pos*100/vsh);
			    vscroll.find('#vscroll_bar').find('div').css('margin-left', proc*vsb/100);
			}
			if (settings.vbar == 'vertical'){
				vsb = vscroll.find('#vscroll_bar').height()-20;
			    proc = Math.ceil(pos*100/vsh);
			    vscroll.find('#vscroll_bar').find('div').css('margin-top', proc*vsb/100);
			}
		   // и заботимся о том, чтобы прокручивание колесика над элементом, не прокручивала скроллы страницы или еще что
		    if (event.preventDefault)
		    {
		        event.preventDefault();
		    }
		    event.returnValue = false;
		}
	}
})(jQuery);