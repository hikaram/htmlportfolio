/*!
 * Media5 JavaScript Library 0.3.2
 * http://media5.com/
!*/

$.fn.middle = function(type, options, callback){
	var options = $.extend({
		zindex: 1000,
		height:0,
		width:0,
		left: 0,
		top:0,
		parent:'yes',
		animate:'no',
		position:'absolute'
	},options);

	//alert(options.test);

	if(type == null) type = 'block';
	switch(type)
	{
		case 'window':
			if(!options.width)
				var this_width = $(this).outerWidth();
			else
				var this_width = options.width;

			if(!options.height)
				var this_height = $(this).outerHeight();
			else
				var this_height = options.height;

		if(options.animate == 'yes')
		{
			if($.browser.msie && options.position == 'fixed')
			{
				options.position = 'absolute';
				var el = this;
				$(window).unbind('scroll').scroll(function(){
					el.middle('window',{position:'fixed'});
				});
			}
			this.css({
				position: options.position,
				'z-index': options.zindex
				}).animate({
					top: ((($(window).height()+options.top)-this_height)/2)+$(window).scrollTop(),
					left: ((($(window).width()+options.left)-this_width)/2)+$(window).scrollLeft(),
					width: this_width,
					height: this_height
				},500,function(){
					callback();
				});
		}
		else
		{

			if($.browser.msie && options.position == 'fixed')
			{
				options.position = 'absolute';
				var el = this;
				$(window).unbind('scroll').scroll(function(){
					el.middle('window',{position:'fixed'});
				});
			}
			this.css({
				position: options.position,
				'z-index': options.zindex,
				top: ((($(window).height()+options.top)-this_height)/2)+$(window).scrollTop(),
				left: ((($(window).width()+options.left)-this_width)/2)+$(window).scrollLeft()
				});
		}

		break;
		case 'block':
			this.each(function(){
				var element = $(this).parent();
				var elementHeight = element.height();
				var elementWidth = element.width();

				if(options.height > 0) elementHeight = options.height;
				if(options.width > 0) elementWidth = options.width;

				if(options.parent == 'yes')
					element.css({position:'relative', width:elementWidth, height:elementHeight});
				else if(options.parent == 'no')
					element.css({position:'relative'});

				$(this).css({
					position: 'absolute',
					top: ((elementHeight+options.top)-$(this).outerHeight())/2,
					left: ((elementWidth+options.left)-$(this).outerWidth())/2,
					'z-index': options.zindex
				});
			});
	}

	return this;
};

$.fn.proportions = function(options){
	var options = $.extend({
		width: 0,
		height:0,
		window:'no'
	},options);
	this.each(function(){
		$(this).removeAttr('width').removeAttr('height').css({height:'auto', width:'auto'});
		var thisWidth = $(this).width();
		var thisHeight = $(this).height();
		if(options.window == 'yes')
		{
			var parentWidth = $(window).width()-options.width;
			var parentHeight = $(window).height()-options.height;
		}
		else
		{
			var parentWidth = $(this).parent().width()-options.width;
			var parentHeight = $(this).parent().height()-options.height;
		}

		if(thisWidth > parentWidth && thisHeight < parentHeight)
			$(this).css({width:parentWidth, height:'auto'});
		else
		if(thisHeight > parentHeight && thisWidth < parentWidth)
			$(this).css({height:parentHeight, width:'auto'});
		else
		if(thisWidth > thisHeight && thisWidth > parentWidth)
			{
				$(this).css({width:parentWidth, height:'auto'});
				if($(this).height() > parentHeight)
					$(this).css({height:parentHeight, width:'auto'});
			}
		else
		if(thisWidth < thisHeight && thisHeight > parentHeight)
			{
				$(this).css({height:parentHeight, width:'auto'});
				if($(this).width() > parentWidth)
					$(this).css({width:parentWidth, height:'auto'});
			}
	});
	return this;
};

$.fn.overlay = function(options){
	var thisHeight = this.outerHeight(true);
	var thisWidth = this.outerWidth(true);
	var windowHeight = $(window).height();

	var options = $.extend({
		height: function(thisHeight){return windowHeight < thisHeight ? thisHeight : windowHeight;},
		width: thisWidth,
		zindex: 999,
		opacity: 0.5,
		color: '#000',
		id: 'm5_overlay'
	},options);

	if(!$('#'+options.id).length)
		this.append('<div id="'+options.id+'" style="background:'+options.color+'; display:none; position:absolute; left:0; top:0; z-index:'+options.zindex+'; width:100%; height:'+options.height($(document).height())+'px; opacity:'+options.opacity+'; filter:alpha(opacity='+(options.opacity*100)+');"></div>');

	return $('#'+options.id);
};

$.fn.tooltip = function(options){
	var options = $.extend({
		attr: 'tooltip',
		zindex: 1000,
		left:12,
		top:12,
		fade: 0,
		delay: 0,
		id:'tooltip',
		opacity:1
	},options);
	var tooltip = $('#'+options.id);
	if(tooltip.length == 0)
	{
		$('body').append('<div id="'+options.id+'" style="display:none; opacity:0; filter: alpha(opacity=0); position:absolute;"></div>');
		tooltip = $('#'+options.id);
	}

	this.hover(function(){
		tooltip.html($(this).attr(options.attr)).css({'z-index':options.zindex}).css({display:'block'}).stop().delay(options.delay).animate({opacity: options.opacity},options.fade);
	},function(){
		tooltip.stop().css({opacity:0}).hide();
	}).mousemove(function(e){
		tooltip.css({left:e.pageX+options.left, top:e.pageY+options.top});
	});

	return $this;
};












