/**
 * ������ jQuery ��� �������� ���������� ������� � ��������.
 * ��������� �� ������������� �� ��������� � ������������� �������.
 * ������ ����� ���������� ����� ��� ������ �� ��������� ����������� ��������. 
 * 
 * �������������:
 * 1) ���������� ���������� jQuery � ������ (� ������� ����� <script>)
 * 2) �������� �� �������� ��� <div> � ����� ������ � ��������� ��� ���������� id
 * ��������,
 * <div id="twitter_widget"><script type="text/javascript" src="http://tweetmeme.com/i/scripts/button.js"></script></div>
 * ����� ������ �������� �������� Tweetmeme (http://tweetmeme.com/about/retweet_button),
 * �� ������ ������������ ����� ������ ������ ��� ������� ��������.
 * 3) ���������� ������
 * $('#twitter_widget').floating_panel();
 * 4) ����� �������� ��������� ���������
 * fromCenter - ���������� �� �������� �������� �� ������ ���� �������
 * fromTop - ���������� �� ������� �� ������� ������� ������� ����� ��������
 * minTop - ���������� �� ������� �� ������ ��������
 * location - ���������� ������� (left ��� right)
 * 
 * ������������ ��������� ��������� �������
 * $('#twitter_widget').floating_panel({
 *  		'fromCenter': 520,
 *  		'fromTop': 50,
 *  		'minTop': 200,
 *  		'location': 'left'
 *  	});
 *  
 *  �������� ��������
 *  http://www.simplecoding.org/
 */
(function($) {
    $.fn.floating_panel = function(settings) {
    	//�������� ��-���������
    	var config = {
    		'fromCenter': 580,
    		'fromTop': 50,
    		'minTop': 200,
    		'location': 'left'
    	};
    	//���� ������������ ������ ���� ���������, �� ���������� ��
        if (settings) $.extend(config, settings);

    	var element = $(this);
    	
    	var curWindow = $(window);
    	//������������ �������� �� ������ ���� ���� ��������
    	if ('left' == config.location) {
    		var elementLeft = curWindow.width() / 2 - config.fromCenter;
    	}
    	else {
    		var elementLeft = curWindow.width() / 2 + config.fromCenter;
    	}
		element.css({'left':elementLeft});
    	updateElement();
    	
    	//�������� ��������� ������� ��� ��������� �������� 
    	curWindow.scroll(function() {
   			updateElement();
    	});
    	
    	function updateElement() {
    		//���������� �� ������ �������� �� ����� � ������� �����
    		var windowTop = curWindow.scrollTop();
    		if (windowTop + config.fromTop < config.minTop) {
    			//������ ����� ��������������� ���������
    			if ('absolute' != element.css('position')) {
    				element.css('position', 'absolute');
    				element.css({'top':config.minTop});
    			}
    		} else {
    			//������������� ������ ������������
				//ie6 �� ������������ ������������� ����������������
				if ($.browser.msie && $.browser.version.substr(0,1)<7) {
						element.css({'top': windowTop + config.fromTop + "px"});
				}
				else {
	    			if ('fixed' != element.css('position')) {
	    				element.css('position', 'fixed');
	    				element.css({'top':config.fromTop});
	    			}
				}
    		}
    	}
    };
})(jQuery);