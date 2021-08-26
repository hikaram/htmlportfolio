$(document).ready(function() {
	if ($('.js_nud_left').length == 0)return;
	$('.js_nud_left').live('click', function() {
		var val = parseFloat($(this).parent().find('.js_nud_val').val());
		val = (!isNaN(val)) ? val - 1 : 0;
		val = (val < 0) ? 0 : val;
		$(this).parent().find('.js_nud_val').val(val.toFixed(2));
			
		return false;
	});
	
	$('.js_nud_right').live('click', function() {
		var val = parseFloat($(this).parent().find('.js_nud_val').val());
		val = (!isNaN(val)) ? val + 1 : 0;
		val = (val < 0) ? 0 : val;
		$(this).parent().find('.js_nud_val').val(val.toFixed(2));
		
		return false;
	});
	
	$('.js_nud_val').live('change', function() {
		var val =  parseFloat($(this).val());
		val = (!isNaN(val)) ? val : 0;
		val = (val < 0) ? 0 : val;
		$(this).parent().find('.js_nud_val').val(val.toFixed(2));
	});
	
	$('.js_nud_avg_change').live('change', function() {
		avgChange($(this).attr('id').slice(11));
	});
	
	$('.js_nud_avg_change_a').bind('click', function() {
		var obj = $(this).parent().find(".js_nud_val")[0];
		setTimeout('avgChange("'+$(obj).attr('id').slice(11)+'")', 100);
	});
	
	$('.js_sf_info').live('change', function() {
		var filter = '';
		$('.js_sf_info:checked').each(function() {
			var val = $(this).parent().parent().find('.js_nud_val');
			val = (val.val() != '1.00') ? '$'+enBASE64(val.val()) : '';
			filter += ((filter != '') ? ':' : '') + $(this).val() + val;
		});
		filter = (filter != '') ? filter+'/' : '';
		var get = '';
		if ($('#main_search').val()){
			get+= '?q='+ $('#main_search').val();
		}
		if ($('#j_prevcomplex').val()){
			get+= '?prevcomplex='+ $('#j_prevcomplex').val();
		}
		document.location = '/'+$('#j_category').val()+'/1/'+filter+get;
	});
	
	$('.js_show_select_position').bind('click', function() {
		if ($(this).text() == 'Показать выбранные позиции') {
			$($(this).attr('href')).show();
			$(this).text('Скрыть выбранные позиции');
		} else if ($(this).text() == 'Скрыть выбранные позиции') {
			$($(this).attr('href')).hide();
			$(this).text('Показать выбранные позиции');
		}
		
		return false;
	});
	
	$('.js_set_estimate').bind('change', function() {
		var list = $(this).parent().parent().parent().parent().parent().find('.js_set_estimate:checked');
		var total = 0;
		$(list).each(function() {
			total += parseFloat($(this).parent().parent().parent().find('.js_pos_val').text());
		})
		var id = $(this).val();
		var rate = $('#j_currency_rate').val();
		var total_rate = total / rate;
		$('#estimate_total_val_rate_'+id).text(total_rate.toFixed(2));
		$('#estimate_total_val_'+id).text(total.toFixed(2));
	});
	
	// DEPRECATED
	/*$('.js_blue_arrow').live
	(
		'click',
		function()
		{
			if($(this).hasClass('close_arrow'))
			{
				$("#" + ($(this).attr("href"))).show();
				$(this).removeClass('close_arrow');
			}
			else
			{
				$("#" + ($(this).attr("href"))).hide();
				$(this).addClass('close_arrow');
			}
			return false;
		}
	);*/
	
	$('.j_features_toogle').bind('click', function() {
		var id = $(this).attr('href');
		if ($(this).text() == 'подробнее') {
			$(id+'_shot').hide();
			$(id+'_all').show();
		} else {
			$(id+'_shot').show();
			$(id+'_all').hide();
		}
	})
});

function toggleArrowFeatureGroup(_mfg_id)
{
	if($("#js_blue_arrow_" + _mfg_id).hasClass('close_arrow'))
	{
		$("#js_blue_arrow_" + _mfg_id + "_div").show();
		$("#js_blue_arrow_" + _mfg_id).removeClass('close_arrow');
	}
	else
	{
		$("#js_blue_arrow_" + _mfg_id + "_div").hide();
		$("#js_blue_arrow_" + _mfg_id).addClass('close_arrow');
	}
}

function formatPrice(price)
{
	price = Math.round(price*100);
	len = (price+'').length;
	price = price/100;
	price = price+'';
	if (price.indexOf( '.' ) == -1){
		price+= ',00';
	} else if (price.length == len+1){
		price = price.replace('.', ',');
	}
	return price;
}

function avgChange(id)
{
	var feature_id = id;
	var price = $('#j_avg_price_'+feature_id).val();
	var price_from = $('#j_price_from_'+feature_id).val();
	var price_to = $('#j_price_to_'+feature_id).val();
	var rate = $('#j_currency_rate').val();
	var count = $('#feature_id_'+id).val();
	var avg_prcie = parseFloat(price * count);
	var avg_prcie_rate = parseFloat(avg_prcie / rate);
	$('#avg_prcie_'+feature_id).text(avg_prcie.toFixed(2));
	$('#avg_prcie_rate_'+feature_id).text(avg_prcie_rate.toFixed(2));
	
	
	$('#price_from_'+feature_id).text(parseFloat(price_from * count).toFixed());
	$('#price_to_'+feature_id).text(parseFloat(price_to * count).toFixed());
	
	
	if ($('#feature_id_'+id).hasClass('estimate_update')) {
		$('#feature_id_'+id).parent().parent().parent().find('.js_set_estimate').change();
	} else if ($('#feature_id_'+id).hasClass('in_total_update')) {
		$('.features_update_'+id).val(count);
		$('.features_update_'+id).change();
		
		var in_total = 0;
		$('.js_sf_info:checked').each(function() {
			in_total += $(this).parent().parent().find('.js_nud_val').val() * $(this).parent().parent().find('input:hidden').val();
		});
		var in_total_rate = in_total / rate;
		
		$('#in_total .price_green:first').text(in_total_rate.toFixed(2));
		$('#in_total .price_red:first').text(in_total.toFixed(2));
		$('#in_total').show();
	}
	
	
}

var flashtextcolours = Array( '#FFCC00', '#FF6600', '#EBB700');
function flashText(id, interval)
{
	if (empty(interval)) {
		interval = 600;
	}
	setInterval('flashObj(\''+id+'\')', interval);
}
function flashObj(id)
{
	var colour = Math.round(flashtextcolours.length * Math.random());
	if ($('#'+id).length > 0) {
		$('#'+id).css('color', flashtextcolours[colour]);
	}
}

function empty( mvar ) { if (mvar === "" || mvar === 0 || mvar === "0" || mvar === null || mvar === false || mvar === undefined) return true; if (typeof mvar == 'object') {var key; for (key in mvar) {return false;} return true;}  return false;}

function getDomain(full)
{
	var loc = $($(document).attr('location'));
	if (loc.length > 0) {
		if (empty(full)) {
			loc = loc.attr('host');
			loc = loc.split('.');
			if (loc[loc.length-1] == 'lan' && loc.length > 2) {
				return loc[loc.length-3]+'.'+loc[loc.length-2]+'.'+loc[loc.length-1];
			} else if (loc.length > 1) {
				return loc[loc.length-2]+'.'+loc[loc.length-1];
			} else {
				return '';
			}
		} else {
			return loc.attr('href');
		}
	}
	return '';
}

function setDomainCookie(name, value)
{
	$.cookie(name, value, {expires: 14, path: '/', domain: getDomain(), secure: false});
	return true;
}

function getAjaxGifLoader(size, align)
{
	if (empty(size)) {
		size = 16;
	}
	if (empty(align)) {
		align = 'center';
	}
	return '<div style="text-align:'+align+';"><img border="0" src="/img/ajax-loader_'+size+'.gif"></div>';
}

function checkMBB()
{
	if ($(window).width() < 1150) {
		$('#b200_300').hide();
	} else {
		$('#b200_300').show();
	}
	return true;
}

function setDP(id, banner)
{
	var w = $('#'+id).parent().width();
	var h = $('#'+id).parent().height();
	var st = $(window).scrollTop();
	var sl = $(window).scrollLeft();
	var ww = $(window).width();
	var wh = $(window).height();
	var x,y = 0;

	if (w < ww) {
		x = ww/2-w/2;
	}
	if (h < wh) {
		y = wh/2-h/2;
	}
	// for banners
	if (!empty(banner) && st < 150 && y < 150) {
		y = 150-st;
	}
	$('#'+id).dialog('option', 'position', [x, y]);
	return true;
}

function setDialogPosition(id)
{
	return setDP(id, 1);
}

function setDialogPositionFull(id)
{
	return setDP(id, 0);
} 

function showMessage(message)
{
	if ($('#jMessage').length > 0) {
		$('#jMessage').html(message);
		$(function() {
			$('#jMessage').dialog({
				bgiframe: true,
				modal: false,
				title: 'Сообщение',
				buttons: {
					'Закрыть': function() {
						$(this).dialog('close');
					}
				},
				close: function() {
					$(this).dialog('destroy');
				}
			});
		});
		setDialogPosition('jMessage');
	}
	return false;
}

function showLoginForm(referer)
{
	if ($('#login_form').length > 0) {
		$('#login_form').dialog({
			width: 345,
			height: 182,
			resizable: false,
			bgiframe: true,
			modal: true,
			draggable: false,
			title: 'Пожалуйста, представьтесь',
			buttons: {
				'Позже': function() {
					$(this).dialog('close');
				},
				'Войти сейчас': function(bt) {
					if ($('#login_form form [name=login]').val() != '' && $('#login_form form [name=password]').val() != '') {
						if (referer != '') {
							$('#login_form form [name=redirect]').val(referer);
						}
						$(bt.target).attr('disabled', true);
						$('#login_form form').submit();
					}
				}
			},
			close: function() {
				$(this).dialog('destroy');
				$('#login_form_wrap_wrap').prev().remove();
				$('#login_form_wrap_wrap').remove();
				$('#login_form_tips').html('');
			}
		});
		$('#login_form').keyup(function(e) {
			if (e.keyCode == 13) {
				var l = $('#login_form').next().find(':button:contains(\'Войти сейчас\')');
				l.focus();
				l.trigger('click');
			}
		});
		
		var p = $('#login_form').parent();
		p.find('.ui-widget-header').css('border', 0);
		p.find('.ui-widget-header').css('background', 'transparent');
		p.find('.ui-widget-content').css('border', 0);
		p.parent().find('.ui-widget-overlay').css('opacity', '0.1');
		
		p.wrap('<div id="login_form_wrap" />');
		$('#login_form_wrap').css('margin-left', 9);
		
		$('#login_form_wrap').wrap('<div id="login_form_wrap_wrap" />');
		$('#login_form_wrap_wrap').liquidCanvas("[shadow{color:#333;width:10} border{color:#eee;width:0} fill{color:#eee;width:0} ] => roundedRect{radius:10}");
		
		setDialogPosition('login_form');
		
		var crd = p.position();
		$('#login_form_wrap_wrap').css('position', 'absolute');
		$('#login_form_wrap_wrap').css('top', crd.top);
		$('#login_form_wrap_wrap').css('left', crd.left);
		$('#login_form_wrap_wrap').css('z-index', 1001);
		$('#login_form_wrap_wrap').width(p.width()+20);
		$('#login_form_wrap_wrap').height(p.height()+10);
		p.css('position', 'relative');
		p.css('padding', 0);
		p.css('top', 0);
		p.css('left', 0);
//		$('.login_form_bottom').css('position', 'relative');
//		$('.login_form_bottom').css('padding', 0);
//		$('.login_form_bottom').css('top', 0);
//		$('.login_form_bottom').css('left', 0);

		$('#login_form input[name=login]').focus();
	}
	return false;
}

var mm_services = new Object(); mm_services = {'photo':'Фото', 'video':'Видео', 'blog':'Блоги'};
var mm_all_services = new Object(); mm_all_services = {'blog':'Блоги', 'photo':'Фото', 'video':'Видео', 'board':'Объявления', 'job':'Работа', '559':'Справка'};
var mm_time = new Object(); mm_time = {'week':'за неделю', 'month':'за месяц', 'all':'за все время'};

function mv_dell (serv, dell)
{
	serv = empty(serv) ? 'photo' : serv;
	dell = empty(dell) ? 'week' : dell;
	for (var tD in mm_time) {
		if (tD == dell) {
			$('#'+serv + '_' + tD).show();
			$('#dell_' + serv + '_' + tD).html(mm_time[tD] + ' <font style="font-family: serif;">&darr;<\/font>');
		} else {
			$('#'+serv + '_' + tD).hide();
			$('#dell_' + serv + '_' + tD).html('<a href="#' + tD + '" onClick="mv_dell (\'' + serv + '\',\'' + tD + '\');return false;">' + mm_time[tD] + '<\/a>');
		}
	}
	return true;
}

function mv_tab (serv, dell, marker)
{
	serv = empty(serv) ? 'photo' : serv;
	dell = empty(dell) ? 'all' : dell;
	marker = empty(marker) ? 'pvt' : marker;
	var i = last_i = 0;
	for (var service in mm_services) {
		i++;
		if (serv == service) {
			$('#'+service + 'tab').show();
			var dclass = empty(last_i) ? "b_corner_l" : "b_corner_l_s";
			$('#'+marker + '0').attr('className', dclass);
			if (i > 1) {
				$('#'+marker + (i-1)).attr('className', 'bm_base_news bm_sosed');
			}
			$('#'+marker + i).attr('className', 'bm_base_news bm_s');
			$('#'+marker + i).html('<span style="display: block; padding: 5px 0;" class="red_h">' + mm_services[service] + '<\/span>');
		} else {
			last_i = i;
			$('#'+service + 'tab').hide();
			$('#'+marker + i).attr('className', 'bm_base_news bm_main');
			$('#'+marker + i).html('<a style="display: block; padding: 7px 0;" href="http://' + service + '.' + getDomain() + '/">' + mm_services[service] + '<\/a>');
		}
	}
	mv_dell(serv, dell);
	return true;
}

function mv_all_tab (serv, marker)
{
	serv = empty(serv) ? 'blog' : serv;
	marker = empty(marker) ? 'pvt' : marker;
	var i = last_i = 0;
	for (var service in mm_all_services) {
		i++;
		if (serv == service) {
			$('#'+service + 'tab').show();
			var dclass = empty(last_i) ? "b_corner_l" : "b_corner_l_s";
			$('#'+marker + '0').attr('className', dclass);
			if (i > 1) {
				$('#'+marker + (i-1)).attr('className', 'bm_base_news bm_sosed');
			}
			$('#'+marker + i).attr('className', 'bm_base_news bm_s');
			$('#'+marker + i).html('<span style="display: block; padding: 5px 0;" class="red_h">' + mm_all_services[service] + '<\/span>');
		} else {
			last_i = i;
			$('#'+service + 'tab').hide();
			$('#'+marker + i).attr('className', 'bm_base_news bm_main');
			$('#'+marker + i).html('<a style="display: block; padding: 7px 0;" href="http://' + service + '.' + getDomain() + '/">' + mm_all_services[service] + '<\/a>');
		}
	}
	return true;
}

function setLoginTab(id)
{
	if (empty(id)) {
		id = 'ltab1';
	}
	if (id.indexOf('ltab') == -1) {
		return false;
	}
	var current_tab = new String(id);
	current_tab = parseInt(current_tab.substring(4))+0;

	if ($('#ltab'+current_tab+'_data').css('display') == 'block') {
		return false;
	}
	var max_tab = 1;
	for (var i=max_tab;i<=10;i++) {
		if ($('#ltab'+i).length == 0) {
			max_tab = i-1;
			break;
		}
	}
	if (max_tab < current_tab) {
		return false;
	}
	var title = '';
	for (var i=1;i<=max_tab;i++) {
		title = $.trim($('#ltab'+i).text());
		if (current_tab == i) {
			setDomainCookie('login_tab', id);
			$('#ltab'+i+'_data').show();
			$('#ltab'+i).html('<span class="bold">'+title+'</span>');

			if (current_tab == 1) {
				$('#ltab'+i).attr('className', 'font12 font_green block left');
			} else if (current_tab == max_tab) {
				$('#ltab'+i).attr('className', 'font12 font_green block left');
			} else {
				$('#ltab'+i).attr('className', 'font12 font_green block left');
			}
		} else {
			$('#ltab'+i+'_data').hide();
			$('#ltab'+i).html('<a href="javascript:void(0)">'+title+'</a>');
			if (current_tab-i == 1) {
				$('#ltab'+i).attr('className', 'font12 font_green block left');
			} else if (i == max_tab) {
				$('#ltab'+i).attr('className', 'font12 font_green block left');
			} else {
				$('#ltab'+i).attr('className', 'font12 font_green block left');
			}
		}
	}

	return false;
}

function createBasketCookie() {
	$(function() {$.ajax({url:'/json/createBasketCookie/'});});
	return false;
}

function switchCompanyRating(type)
{
	var types = Array('week', 'month');
	if ($('#rating_table_'+types[0]).length > 0) {
		for (var i=0;i<types.length;i++) {
			if (types[i] == type) {
				$('#rating_table_'+types[i]).show();
				$('#rating_tab_'+types[i]).removeClass('font_white');
				$('#rating_tab_'+types[i]).addClass('images fon_reyt_button');
				$('#rating_tab_'+types[i]).html('<b>'+$('#rating_tab_'+types[i]).text()+'</b>');
			} else {
				$('#rating_table_'+types[i]).hide();
				$('#rating_tab_'+types[i]).removeClass('images fon_reyt_button');
				$('#rating_tab_'+types[i]).addClass('font_white');
				$('#rating_tab_'+types[i]).html('<a onclick="return switchCompanyRating(\''+types[i]+'\');" href="javascript:void(0)">'+$('#rating_tab_'+types[i]).text()+'</a>');
			}
		}
	}
	return false;
}

function addBookmark()
{
	var url = location.hostname;
	var title = document.title;
	
	if (!url) {
		url = 'http://www.budsvit.com.ua/';
	}
	if (!title) {
		title = 'Budsvit';
	}
	
	$('#AddFav').attr('href',url);
	$('#AddFav').attr('title',title);

	if (jQuery.browser.msie) {
		window.external.AddFavorite(url, title);
		return false;
	} else if (jQuery.browser.safari) {
		alert('Что бы добавить в закладки\nНажмите "Ctrl + D" (или "CMD + D" если Mac)');
		return false;
	}

	return true;
}

function setStartPage(obj)
{
	var url = location.protocol + '//' + location.hostname + '/';
	if (!url) {
		url = 'http://www.budsvit.com.ua/';
	}

	if (jQuery.browser.msie) {
		obj.style.behavior='url(#default#homepage)';
        obj.setHomePage(url);
	} else {
		$('#popupcontent .popupcontent_1 strong').html(url);
		
		br = navigator.userAgent.toLowerCase();
		var html2 = 'В меню вашего браузера ';
		var html3 = '';
		var html4 = '';
		if(br.indexOf('chrome') != -1) {
			html2 += 'выберите <b>Параметры</b> (Options)';
			html3 += 'В открытом окне, выберите вкладку <b>Основные</b> (Basics)';
			html4 += 'Добавьте скопированную ссылку в<br /><b>Открыть эту страницу</b> (Open this pages)';
			$('#popupcontent .popupcontent_5 strong').html('Закрыть');
        } else if(br.indexOf('safari') != -1) {
        	html2 += '<b>Правка</b> (Edit)<br />выберите <b>Настройки</b> (Preferences)';
        	html3 += 'В открытом окне, выберите вкладку <b>Основные</b> (General)';
        	html4 += 'Вставьте скопированную ссылку в строку<br /><b>Домашняя страница</b> (Home page)';
        	$('#popupcontent .popupcontent_5 strong').html('Закрыть');
        } else if(br.indexOf('opera') != -1) {
        	html2 += '<b>�?нструменты\/Сервис</b> (Tools)<br />выберите <b>Настройки</b> (Preferences)';
        	html3 += 'В открытом окне, выберите вкладку <b>Основные</b> (General)';
        	html4 += 'Вставьте скопированную ссылку в строку<br /><b>Домашняя страница</b> (Home page)';
        } else {
        	html2 += '<b>�?нструменты</b> (Tools)<br />выберите <b>Настройки</b> (Options)';
        	html3 += 'В открытом окне, выберите вкладку <b>Основные</b> (General)';
        	html4 += 'Вставьте скопированную ссылку в строку<br /><b>Домашняя страница</b> (Home page)';
        }
		$('#popupcontent .popupcontent_2').html(html2);
		$('#popupcontent .popupcontent_3').html(html3);
		$('#popupcontent .popupcontent_4').html(html4);
		
		$('#popupcontent').dialog({
			title: 'Сделать стартовой',
			modal: true,
			width: 400,
			buttons: {
				"Закрыть": function() {
					$(this).dialog("close");
				}
			},
			close: function () {
				$(this).dialog("destroy");
			}
		});
	}
	
	return false;
}

function showFeatureInfo(obj)
{
	$('#info_window').html(obj.getAttribute('info'));
	$('#info_window').css('top', $(obj).offset().top+'px');
	//$('#info_window').css('left', ($(obj).offset().left+20)+'px');
	$('#info_window').css('left', ($(obj).offset().left+$(obj).width()+10)+'px');
	$('#info_window').show();
}
function hideFeatureInfo()
{
	$('#info_window').hide();
}

jQuery.fn.thumbsImg = function(width, height)
{
	return this.each(
		function()
		{
		    var _img = jQuery(this);
		    if (width >= _img.width() && height >= _img.height()){
		    	return;
		    }
            var x_ratio = width / _img.width();
            var y_ratio = height / _img.height();
            
            var ratio = Math.min(x_ratio, y_ratio);
            var use_x_ratio = x_ratio<y_ratio ? 1 : 0;
            
            var w = use_x_ratio ? width : Math.ceil(_img.width() * ratio);
            var h = !use_x_ratio ? height : Math.ceil(_img.height() * ratio);

            _img.css({width: w, height: h});
		}
	)
}

function chooseTenderList(index)
{
	$(function()
	{
		$.ajax({
			type: 'GET',
			dataType:'json',
			url:'/json/getLists/',
			success: function(data, textStatus)
				{
					if(textStatus == 'success')
					{
						if($.isArray(data))
						{
							var title = 'Выберите смету, которая будет добавлена к тендеру:<br/><br/>'
							var html = '';
							
							for (var i = 0; i < data.length; i++)
							{
								html += '<div style="padding-bottom:2px;background-color:#FFFFFF;color:#000000;" align="left">'
								html += '<span class="wishlist_public_title" title="Публичный"></span>';
								html += '<a href="javascript:void(0)" onclick="setTenderList(' + data[i]["lst_id"] + ', ' + index + ');">'+data[i]["lst_title"]+'</a>';
								html += '</div><br>'
							}
							
							$('#jMessage').html(title+html);
							
							$(function()
								{
									$('#jMessage').dialog(
										{
											bgiframe: true,
											modal: false,
											title: 'Выберите список',
											buttons:
												{
													'Закрыть': function()
													{
														$(this).dialog('close');
													}
												},
											close: function()
												{
													$(this).dialog('destroy');
												}
										});
								});
							
							setDialogPosition('jMessage');
						}
					}
				},
				
		error: function(data)
			{
				showMessage('Ошибка. Не удалось получить список смет.');
			}
		});
	});
}

function setTenderList(lst_id, index)
{
	$('#jMessage').dialog('close');
	
	if(lst_id == 0)
	{
		lists = $('#tnd_lists').val().split(",");
		lists[index] = lst_id + "";
		
		$('#tnd_list' + index).html('<span class="c_orange">Ничего не выбрано</span>');
		
		$('#tnd_lists').val(lists[0] + ","  + lists[1] + "," + lists[2]);
		
		return;
	}
	
	$(function()
	{
		$.ajax({
			type: 'GET',
			dataType:'json',
			url:'/json/getList/' + lst_id,
			success: function(data, textStatus)
				{
					lists = $('#tnd_lists').val().split(",");
					lists[index] = lst_id + "";
					
					$('#tnd_list' + index).html('<span class="c_green">' + data["lst_title"] + '</span><a href="javascript:void(0);" onclick="setTenderList(0, ' + index + ');" title="Удаление"><img src="/img/admin/icons/delete.gif" width="15" height="15" alt="Удалить" border="0"/></a>');
					
					$('#tnd_lists').val(lists[0] + ","  + lists[1] + "," + lists[2]);
				},
			error: function(data)
			{
				showMessage('Ошибка. Не удалось прикрепить смету.');
			}
		});
	});
}

function getSelText()
{
	var txt = "";
	
	if(window.getSelection)
	{
		txt = window.getSelection().toString();
	}
	else if(document.getSelection)
	{
		txt = document.getSelection();                
	}
	else if(document.selection)
	{
		txt = document.selection.createRange().text;
	}
	
	return txt;
}

function validateVal(_target, _patternToDel)
{
	var value = _target.value;
	
	if(_patternToDel.test(value))
	{
		value = value.replace(_patternToDel, '');
		_target.value = value;
	}
}

function symbolsLimit(_target, _length, _text)
{
	_text = _text || "Максимальная длина поля - " + _length + " символов.\nВведите текст меньше максимальной длины.";
	
	if(_target.value.length > _length)
	{
		_target.value = _target.value.substring(0, _length);
		
		if(_text != "")
		{
			alert(_text);
		}
	}
}

function showRemainingSymbols(_targetId, _fieldId, _maxLength)
{
	var remainingSymbols = (_maxLength - $("#" + _targetId).val().length);
	if(remainingSymbols < 0) remainingSymbols = 0;
	
	$("#" + _fieldId).html("Осталось символов: " + remainingSymbols);
}

function showHelper(_helperId, _parent, _text)
{
	var mytop = 0, myleft = 0;
	var htmlContent =
		"<div id='" + _helperId + "'>" +
			"<div style='width:330px; height:100px; font-size:10pt; background-image:url(/img/helper.png);'>" +
				"<div style='float:left; width:284px; height:65px; overflow:hidden; padding:10px;'>" +
					_text +
				"</div>" +
				"<div style='float:left; padding-top:10px; padding-right:10px;'>" +
					"<a href='javascript:void(0);' onclick='clearHelper(\"" + _helperId + "\")'>" +
						"<img src='/img/close_ico.png'/>" +
					"</a>" +
				"</div>" +
			"</div>" +
		"</div>";
	
	$("#helperBody").append(htmlContent);
	mytop = _parent.offset().top;
	myleft = _parent.offset().left;
	
	$("#" + _helperId).css("position", "absolute");
	$("#" + _helperId).css("z-index", "100");
	$("#" + _helperId).offset({top:mytop - 95, left:myleft + 5});
}

function clearHelper(_helperId)
{
	$("#" + _helperId).remove();
}

function showDownList(_listId, _parentId, _titles, _clickFunction, _blurFunction)
{
	var title_key;
	var mytop = 0, myleft = 0;
	var curScrollTop = $(document).scrollTop();
	var htmlContent = "<div id='" + _listId + "' class='downListBody' tabindex='-1'>";
	
	for(title_key in _titles)
	{
		htmlContent += "<div id='" + _listId + "_item_" + title_key + "' class='downListItem'>" + _titles[title_key] + "</div>";
	}
	
	htmlContent += "</div>";
	
	$("#downListsContainer").append(htmlContent);
	
	mytop = $("#" + _parentId).offset().top;
	myleft = $("#" + _parentId).offset().left;
	
	$("#" + _listId).focus();
	$("#" + _listId).css("position", "absolute");
	$("#" + _listId).offset({top:mytop, left:myleft});
	
	$(document).scrollTop(curScrollTop);
	
	$("#" + _listId).on
	(
		"blur",
		function()
		{
			$("#" + _listId).remove();
			
			if(_blurFunction)
			{
				_blurFunction(_listId);
			}
		}
	);
	
	$(".downListItem").on
	(
		"click",
		function(_evnt)
		{
			title_key = _evnt.currentTarget.id.substr((_listId + "_item_").length);
			
			$("#" + _listId).remove();
			
			if(_clickFunction)
			{
				_clickFunction(_listId, title_key);
			}
		}
	);
}

function createFlatEdit(_targetId, _additionalText, _defValue, _startInput)
{
	var curVal = "";
	var prevVal = "";
	
	_defValue = _defValue || "";
	_startInput = _startInput || false;
	
	$("#" + _targetId).wrap("<span id='" + _targetId + "_flat_input_div'></span>");
	$("#" + _targetId).on
	(
		"blur",
		function()
		{
			curVal = $("#" + _targetId).val();
			
			if(curVal == "")
			{
				curVal = _defValue;
				$("#" + _targetId).val(curVal);
			}
			
			$("#" + _targetId + "_flat_text_div").html(curVal + _additionalText);
			$("#" + _targetId + "_flat_text_div").show();
			$("#" + _targetId + "_flat_input_div").hide();
		}
	)
	
	$("#" + _targetId).on
	(
		"keydown",
		function(_evnt)
		{
			if(_evnt.which == 13)
			{
				$("#" + _targetId).blur();
			}
			else if(_evnt.which == 27)
			{
				$("#" + _targetId).val(prevVal);
				$("#" + _targetId).blur();
			}
		}
	)
	
	curVal = $("#" + _targetId).val();
	
	if(curVal == "")
	{
		curVal = _defValue;
		$("#" + _targetId).val(curVal);
	}
	
	$("#" + _targetId + "_flat_input_div").after("<span id='" + _targetId + "_flat_text_div' style='cursor:pointer;'>" + curVal + _additionalText + "</span>");
	$("#" + _targetId + "_flat_text_div").on
	(
		"click",
		function()
		{
			$("#" + _targetId + "_flat_text_div").hide();
			$("#" + _targetId + "_flat_input_div").show();
			$("#" + _targetId).focus();
			
			prevVal = $("#" + _targetId).val();
		}
	)
	
	if(!_startInput)
	{
		$("#" + _targetId + "_flat_text_div").show();
		$("#" + _targetId + "_flat_input_div").hide();
	}
	else
	{
		$("#" + _targetId + "_flat_text_div").hide();
		$("#" + _targetId + "_flat_input_div").show();
	}
}

function flatEditShowInput(_targetId)
{
	$("#" + _targetId + "_flat_text_div").click();
}

function strDots(_str, _length)
{
	if(_str.length <= _length)
	{
		return _str;
	}
	
	return _str.substr(0, _length) + "...";
}

function openTreeBranch(_ulId)
{
	var liElem = $("#" + _ulId).children("li");
	var divElem = liElem.children("div");
	
	liElem.removeClass("expandable");
	liElem.removeClass("lastExpandable");
	liElem.addClass("collapsable");
	liElem.addClass("lastCollapsable");
	
	divElem.removeClass("expandable-hitarea");
	divElem.removeClass("lastExpandable-hitarea");
	divElem.addClass("collapsable-hitarea");
	divElem.addClass("lastCollapsable-hitarea");
	
	liElem.children("ul").show();
}

function showDiscountWindow(obj, id){
	$.ajax({
			type: 'POST',
			dataType:'html',
			url:'/json/companyDiscount/',
			data: 'id='+id,
			success: function(data, textStatus)
				{
					$('#dataWindow').html(data);
				},
				
		error: function(data)
			{
				
			}
		});
}