/* scripts */
$(function(){

	$('#popup_bg').width($('body').width()).height($('body').height());
	
	
	$('#popup_bg, .popup_close').click(function(){
		$('#popup_bg, .p_act').fadeOut(100);	
	});
	
	$('.popup_input, .popup_textarea').focus(function(){
		$(this).addClass('popup_input_outline');	
	});

	$('.popup_input, .popup_textarea').blur(function(){
		$(this).removeClass('popup_input_outline');	
	});

	function get_case()
	{
		var c =  Math.floor(Math.random()*3);
		var case_id = $('.case_image img');
		var case_size = case_id.size();
		var case_arr = Array();
		case_arr[0] = 0;
		case_arr[1] = 3;
		case_arr[2] = 6;
		function animate_case(id,type)
		{
			if(type == 'first') case_time = 0; else case_time = 2500;
			if(c < case_size)
			{
				setTimeout(function(){
					case_id.fadeOut(case_time/3);
					case_id.eq(id).fadeIn(case_time/3,function(){
						c = id+1;
						animate_case(c);	
					});
				},case_time);
			}else if(c == case_size)
				{
					c = Math.floor(Math.random()*3);
					animate_case(case_arr[c]);
				}
		}
		animate_case(case_arr[c], 'first');
	}
	get_case();


/****************************************************************************/
	if($('#faq_slider').length)
	{
		var i = 0;
		var getID = $('#faq_slider');
		var getHTML = '';
	
		$.each(f_vopros, function(key, value) { 
			getHTML += '<h3>'+value+'</h3><p>'+f_otvet[key]+'</p>';
		});
		getID.html(getHTML);
		getID.find('h3:eq('+i+'), p:eq('+i+')').show();
		
		$('#faq_next').click(function(){
			if(i < f_vopros.length-1)
				{
					getID.find('h3:eq('+i+'), p:eq('+i+')').hide();
					i++;
					getID.find('h3:eq('+i+'), p:eq('+i+')').show();
					$('#faq_prev').removeClass('actv_left');
					if(i == f_vopros.length-1)$(this).addClass('actv_right');
				}
			return false;	
		});
		
		$('#faq_prev').click(function(){
			if(i > 0)
				{
					getID.find('h3:eq('+i+'), p:eq('+i+')').hide();
					i--;
					getID.find('h3:eq('+i+'), p:eq('+i+')').show();
					$('#faq_next').removeClass('actv_right');
					if(i == 0)$(this).addClass('actv_left');
				}
			return false;	
		});
	}

	if($('#faq_list').length)
	{
		var i = 0;
		var getID = $('#faq_list');
		var getHTML = '';
	
		$.each(f_vopros, function(key, value) { 	
			getHTML += '<div class="faq_div"><a href="javascript:void(0);" id="faq_'+i+'" class="faq_a">'+value+'</a></div><p class="faq_p" rel="faq_'+i+'">'+f_otvet[key]+'</p>';
			i++;				
		});
		getID.html(getHTML);
	}

	$('.faq_a').click(function(){
		if($(this).attr('class') == 'faq_a')
		{
			$(this).addClass('faq_a_open');
			$('p[rel='+$(this).attr('id')+']').show();
		}
		else
		{
			$(this).removeClass('faq_a_open');
			$('p[rel='+$(this).attr('id')+']').hide();
		}
	});	
	
/****************************************************************************/


$('.otziv_more').click(function(){
	if($(this).attr('rel') == 'hide')
	{
		$(this).parent().find('.sam_otziv').height('auto');
		$(this).attr('rel','open');
	}
	else
	{
		$(this).parent().find('.sam_otziv').height(34);
		$(this).attr('rel','hide');
	}
	return false;
});




/****************************VSKOLY*********************************/

$('.vl_1').click(function(){
	$('body').css('overflow','hidden');
	$('#popup_bg2').height($(window).height()).width($('body').width()).show();
	$('#print_bg').show();
	$('#cls').click(function(){
		$('#popup_bg2, #print_bg').hide();
		$('body').css('overflow','auto');
	});
});

$('#prt').click(function(){
	$('#popup_bg2').addClass('wht');
	$('#print_bg ul').hide();
	
	setTimeout(function(){
		window.print();
	},100);

	setTimeout(function(){
		$('#popup_bg2').removeClass('wht');
		$('#print_bg ul').show();
	},300);
});

function anm_v1()
	{
		$('.vl_1').animate({top:23},300)
			.animate({top:15},100)
			.animate({top:23},100)
			.animate({top:18},100)
			.animate({top:23},100);
	}

function anm_v2()
	{
		$('.vl_2').animate({top:1},300)
			.animate({top:-10},100)
			.animate({top:1},100)
			.animate({top:-5},100)
			.animate({top:1},100);
	}

function anm_v()
	{
		$('.vl_1').animate({top:15},100)
			.animate({top:23},100)
			.animate({top:17},90)
			.animate({top:23},90)
			.animate({top:19},80)
			.animate({top:23},80)
			.animate({top:21},70)
			.animate({top:23},70);

		setTimeout(function(){
			$('.vl_2').animate({top:-10},100)
				.animate({top:1},100)
				.animate({top:-8},90)
				.animate({top:1},90)
				.animate({top:-5},80)
				.animate({top:1},80)
				.animate({top:-3},70)
				.animate({top:1},70)
		},1000);
	}

	setTimeout(function(){anm_v1();},300);
	setTimeout(function(){anm_v2();},600);

	



$(window).load(function(){
	setInterval(function(){anm_v();},5000);

	function m1_show()
	{
		$('.m_1').animate({
			left:($('.chel').width()/2) - $('.m_1').width()-50
		},400,function(){
			$('.p_1').animate({top:143},500)
					 .animate({top:153},80)
					 .animate({top:146},80)
					 .animate({top:153},80)
					 .animate({top:149},80)
					 .animate({top:153},80);
		});
	}
	
	function m2_show()
	{
		$('.m_2').css('left',($('.chel').width()/2) - $('.m_2').width()+80).animate({
			top:-46
		},400,function(){
			$('.p_2').animate({top:143},500)
					 .animate({top:153},80)
					 .animate({top:146},80)
					 .animate({top:153},80)
					 .animate({top:149},80)
					 .animate({top:153},80);
		});
	}
	
	function m3_show()
	{
		$('.m_3').animate({
			left:($('.chel').width()/2) - $('.m_3').width()-50
		},400,function(){
			$('.p_3').animate({top:143},500)
					 .animate({top:153},80)
					 .animate({top:146},80)
					 .animate({top:153},80)
					 .animate({top:149},80)
					 .animate({top:153},80);
		});
	}

	function m4_show()
	{
		$('.m_4').css('left',($('.chel').width()/2) - $('.m_4').width()+80).animate({
			top:-90
		},400,function(){
			$('.p_2').animate({top:143},500)
					 .animate({top:153},80)
					 .animate({top:146},80)
					 .animate({top:153},80)
					 .animate({top:149},80)
					 .animate({top:153},80);
		});
	}

	function m1_hide()
	{
		$('.m_1').animate({left:-$('.m_1').width()});
		$('.p_1').animate({top:464},300);
	}
	
	function m2_hide()
	{
		$('.m_2').animate({top:464});
		setTimeout(function(){
			$('.p_2').animate({top:464},300);
		},200);
	}

	function m3_hide()
	{
		$('.m_3').animate({left:-$('.m_3').width()});
		$('.p_3').animate({top:464},300);
	}

	function m4_hide()
	{
		$('.m_4').animate({top:464});
		setTimeout(function(){
			$('.p_2').animate({top:464},300,function(){
				setTimeout(function(){m_animate();},200);
			});
		},200);
	}
	
	function m_list_1_show(){
		$('.item_list_1').css('left','-955px').animate({
			left:($(window).width()-955)/2
		},400);
	}
	function m_list_1_hide(){
		$('.item_list_1').animate({
			left:$(window).width()
		},400);
	}
	
	function m_list_2_show(){
		$('.item_list_2').css('left',$(window).width()).animate({
			left:($(window).width()-955)/2
		},400);
	}
	function m_list_2_hide(){
		$('.item_list_2').animate({
			left:-955
		},400);
	}
	

	function m_animate(){
		m1_show();	
		
		setTimeout(function(){
			m1_hide();	
		},5000);
		
		setTimeout(function(){
			m_list_1_show();	
		},6000);
		
		setTimeout(function(){
			m_list_1_hide();	
		},10000);
		
		
		setTimeout(function(){
			m2_show();	
		},11000);
		
		setTimeout(function(){
			m2_hide();	
		},16000);

		setTimeout(function(){
			m_list_2_show();	
		},17000);
		
		setTimeout(function(){
			m_list_2_hide();	
		},22000);

		setTimeout(function(){
			m3_show();	
		},23000);
		
		setTimeout(function(){
			m3_hide();	
		},28000);

		setTimeout(function(){
			m_list_1_show();	
		},29000);
		
		setTimeout(function(){
			m_list_1_hide();	
		},34000);

		setTimeout(function(){
			m4_show();	
		},35000);
		
		setTimeout(function(){
			m4_hide();	
		},40000);

	}


	m_animate();
	
	var tov = $('#tov_slide');
	var tov_bg = $('#tov_slide .bg');
	var tov_center = tov.width()/2;
	
	$('.anim_left').hover(function(){
		tov_bg.stop();	
		anm(1800,0,'right');
	},function(){
		tov_bg.stop();	
	});
	
	
	$('.anim_right').hover(function(){
		tov_bg.stop();	
		anm(1800,0,'left');
	},function(){
		tov_bg.stop();	
	});
	
	function anm(tov_speed, time_out, type, c)
	{
		if(type == 'left')
		{
			var left = -(tov_bg.width()-tov.width());
			var right = 0;
		}
		else if(type == 'right')
		{
			var left = 0;
			var right = -(tov_bg.width()-tov.width());
		}
		
		setTimeout(function(){
			tov_bg.animate({
				left:left
			},tov_speed,'linear',function(){
				if (c == 2)
				{
					setTimeout(function(){
						tov_bg.animate({
							left:right	
						},tov_speed,'linear',function(){
							anm();	
						});
					},time_out);
				}
			});
		},time_out);
	}
	anm(20000, 0, 'left', 2);
	
});


/****************************VSKOLY*********************************/

});
