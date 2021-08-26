$(function(){
			

		var anim_table;
		var fadeBg = $('.fadeBg');
		var i = 0;
		var size;
		$(window).load(function(){setTimeout(function(){anim_img(1);},700)});
		slide23();
		
		function blink23()
		{
			$('.case_art_23_blink .rel23 img').animate({left:565},500,'linear',function(){
				$(this).css({left:-213});	
			})
		}

		function slide23()
		{			
			var slide = $('.slide_23');
			var prev = slide.find('.prev23');
			var next = slide.find('.next23');
			var table = slide.find('table');
			size = slide.find('td').size();
			var shag = 300;
			var speed = 500;
			
			prev.click(function(){if(i != 0){i++;anim_table(shag,i,speed);/*set_but();*/}});
			next.click(function(){if(i*-1 < size-1){i--;anim_table(shag,i,speed);/*set_but();*/}});
			anim_table = function(shag,i,speed,cullback){table.stop().animate({left:shag*i},speed,function(){
				if(typeof cullback == 'function')
					cullback();	
			});}
			function set_but()
			{
				prev.css({opacity:1,cursor:'pointer'});
				next.css({opacity:1,cursor:'pointer'});
				if(i != 0) next.css({opacity:0.5,cursor:'default'});
				if(i*-1 < size-1) prev.css({opacity:0.5,cursor:'default'});
			}
		}

		function rotation(cullback)
		{
			var table = $('.slide_23 table');
			var speed = 400;
			table.unbind('animate').animate({left:300*-1},speed,function(){
				table.unbind('animate').animate({left:300*-2},speed,function(){
					table.unbind('animate').animate({left:300*-3},speed,function(){
						table.unbind('animate').animate({left:300*-4},speed,function(){
							table.unbind('animate').animate({left:300*-5},speed,function(){
									table.css({left:0});
									//if(typeof cullback == 'function') cullback();
									i = 0;
							});
						});
					});
				});
			});
			if(typeof cullback == 'function') cullback();
		}
									
																
			var case_art_23  = $('.case_art_23');
			var int1;
			var slogan23 = $('.slogan_23_1, .slogan_23_2');
			var new_case = $('.new_case23');
			var case_navi23 = $('.case_navi23');
			var case_navi23_li = case_navi23.children('li');
			var case_navi23_a = case_navi23_li.children('a');
			case_navi23_a.click(function(){
				return false;	
			});
			
		function anim_img(a)
		{
			
			switch(a)
			{
				case 1 :
					var switch_vars = {
						item_left : $('.img_23_1'),
						item_right : $('.img_23_2'),
						fade_right : $('.img_23_3_2'),
						fade_left : $('.img_23_3_1')
					}
					var switch_params = {
						class_name : 'case_bg_23_1',
						item_right : 430,
						item_left : -57,
						cart : {
							width:74,
							left:265,
							top:100
						}
					}
				break;
				case 2 :
					var switch_vars = {
						item_left : $('.img_23_2_2'),
						item_right : $('.img_23_1_2'),
						fade_right : $('.img_23_3_2_2'),
						fade_left : $('.img_23_3_1_2')
					}
					var switch_params = {
						class_name : 'case_bg_23_2',
						item_right : 408,
						item_left : 43,
						cart : {
							width:45,
							left:110,
							top:95
						}
					}
				break;
				case 3 :
					var switch_vars = {
						item_left : $('.img_23_2_3'),
						item_right : $('.img_23_1_3'),
						fade_right : $('.img_23_3_2_3'),
						fade_left : $('.img_23_3_1_3')
					}
					var switch_params = {
						class_name : 'case_bg_23_3',
						item_right : 524,
						item_left : 49,
						cart : {
							width:60,
							left:315,
							top:134
						}
					}
				break;
			}
			
			new_case.removeClass('case_bg_23_1').removeClass('case_bg_23_2').removeClass('case_bg_23_3').addClass(switch_params['class_name']);
			
			case_navi23_li.removeClass('active').eq(a-1).addClass('active');

			switch_vars['item_left'].unbind('animate').unbind('load');
			switch_vars['item_right'].unbind('animate').unbind('load');
			switch_vars['fade_left'].unbind('animate').unbind('load');
			switch_vars['fade_right'].unbind('animate').unbind('load');
			case_art_23.unbind('animate').unbind('load');
			clearInterval(int1);
						
				if(a == 1)
				{
					var item_left_css = 'left';
					var item_right_css = 'right';
					var item_left_animate = {left:switch_params['item_left']};
					var item_right_animate = {right:switch_params['item_right']};
					var cart_animate = {top:-375};
					var delay_animate = 0;
					var item_css_param = -$(window).width();
				} else if (a == 2) {
					var item_left_css = 'right';
					var item_right_css = 'left';
					var item_right_animate = {left:switch_params['item_left']};
					var item_left_animate = {right:switch_params['item_right']};
					var cart_animate = {left:$(window).width()};
					var delay_animate = 1410;
					var item_css_param = -$(window).width();
				}
				 else if(a == 3) {
					var item_left_css = 'right';
					var item_right_css = 'top';
					var item_left_animate = {right:switch_params['item_right']};
					var item_right_animate = {top:35};
					var cart_animate = {top:-375};
					var delay_animate = 1100;
					var item_css_param = $(window).height();
				}
				
				if(a == 2)
					var gggggg = 1200;
				else
					var gggggg = 600;
					
			
				if($.browser.msie)
					slogan23.hide();
				else
					slogan23.fadeOut(600);
				
			case_art_23.delay(delay_animate).animate(cart_animate,400,'linear');
				int1 = setTimeout(function(){
						switch_vars['item_right'].delay(500).css(item_right_css,item_css_param).show().animate(item_right_animate,600,function(){
						if($.browser.msie)
							fadeBg.hide();
						else
							fadeBg.fadeOut(800);
								switch_vars['item_left'].delay(700).css(item_left_css,-$(window).width()).show().animate(item_left_animate,500,function(){
									if(a == 2) $('.img_23_2_2_2').delay(750).fadeIn(850);
									setTimeout(function(){
										if($.browser.msie) var mspeed = 0; else var mspeed = 1000;
										switch_vars['fade_left'].delay(800).fadeIn(mspeed,function(){
											setTimeout(function(){
												if($.browser.msie) var mspeed = 0; else var mspeed = 1000;
												switch_vars['fade_right'].delay(800).fadeIn(mspeed,function(){
													case_art_23.css({width:switch_params['cart']['width'],top:-400,left:switch_params['cart']['left'],height:'auto'}).attr('src','img/case_cart23_small.png');
													setTimeout(function(){
														case_art_23.stop()
														.animate({top:switch_params['cart']['top']+3},500)
														.animate({top:switch_params['cart']['top']},100)
														.animate({top:switch_params['cart']['top']+3},80)
														.animate({top:switch_params['cart']['top']+2},60)
														.animate({top:switch_params['cart']['top']+3},40,function(){
															
																/*
																if(i != (size-1)*-1)
																{
																	i = (size-1)*-1;
																	anim_table(300,i,2000);
																}else{
																	i = 0;
																	anim_table(300,i,2000);
																}
																*/
																rotation(function(){
																	setTimeout(function(){
																		case_art_23.attr('src','img/case_cart23.png').animate({
																			width:583,
																			height:371,
																			top:121,
																			left:-30
																		},1000,function(){
																			
																			slogan23.eq(0).css({top:135}).show().animate({top:85},650);
																			slogan23.eq(1).css({top:448}).show().animate({top:501},650);
																			setTimeout(function(){
																				blink23();
																			},800);
																			
																			setTimeout(function(){
																				
																				if (a == 3) a = 0;
																				anim_img(a+1);	
																			},3000);
																		});
																		if($.browser.msie)
																		{
																			setTimeout(function(){
																				if(a == 2) $('.img_23_2_2_2').hide();
																				 switch_vars['item_left'].hide();
																				 switch_vars['item_right'].hide();
																				 switch_vars['fade_left'].hide();
																				 switch_vars['fade_right'].hide();	
																				 fadeBg.show();
																			 },800);
																		}
																		else
																		{
																			 fadeBg.fadeIn(500);
																			 if(a == 2) $('.img_23_2_2_2').fadeOut(1000);
																			 switch_vars['item_left'].fadeOut(1000);
																			 switch_vars['item_right'].fadeOut(1000);
																			 switch_vars['fade_left'].fadeOut(1000);
																			 switch_vars['fade_right'].fadeOut(1000);
																		}
																	},250);
																});
														});
														
													},600);
												});
											},200);
										});
									},gggggg);
								});
							
						});
				},500);
				
			//});
			
		}
});