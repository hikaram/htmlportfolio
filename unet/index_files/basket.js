$(document).ready(function() {
	$('.add_to_lists').bind('click', function() {
		var obj_id = $(this).parents('tr:first').next('tr').find('div:only-child').attr('id');
		
		$('#'+obj_id).show();
		
		var first = $('#'+obj_id).find('input:checked:first');
		var id = $(first).parent().parent().find('.item_id').text();
		var count = $(first).parent().parent().parent().find('.js_nud_val').val();

		$('#add_list_status_'+id).html('<img src="/img/ajax_loader.gif" width="43" height="11" alt="" />');
		
		$.ajax({
			type: 'GET',
			dataType:'json',
			url:'/json/addToLists/'+id+'/?count='+count,
			success: function(data, textStatus) {
				if ($.isArray(data)) {
					if (data.length == 1) {
						addServicesToList(obj_id, data[0][0]);
						$('#add_list_status_'+id).html('<span class="c_green">Уже есть в списке</span>');
					} else  {
						var title = 'Выберите список в который будут скопированы выбранные услуги:<br /><br />'
						var html = '';
						for (var i = 0; i < data.length; i++) {
							html+='<div style="padding-bottom:2px;background-color:'+data[i][4]+';color:'+data[i][5]+';" align="left">'
							if (data[i][3] == 1) {
								html+='<span class="wishlist_private_title" title="Приватный"></span>';
							} else {
								html+='<span class="wishlist_public_title" title="Публичный"></span>';
							}
							html+= '<a href="javascript:void(0)" onclick="return addServicesToList(\''+obj_id+'\','+data[i][0]+',true)" title="'+data[i][1]+'">'+data[i][1]+'</a>';
							html+='</div><br>'
						}
						$('#jMessage').html(title+html);
						$(function() {
							$('#jMessage').dialog({
								bgiframe: true,
								modal: false,
								title: 'Выберите список',
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
							
						$('#add_list_status_'+id).html('');
					}
				} else {
					$('#add_list_status_'+id).html('<span class="c_green">Добавлено в список</span>');
					addServicesToList(obj_id);
				}
			},
			error: function(data) {
				$('#add_list_status_'+id).html('<span class="c_red">Ошибка. Не удалось добавить в смету. Возможно, данная услуга уже находится в ваших списках</span>');
			}
		});
		
		return false;
	});
});

function addServicesToList(obj, lst, all) {
	$('#'+obj).find('input:checked'+((all != undefined && all) ? '' : ':not(:first)')).each(function() {
		var id = $(this).parent().parent().find('.item_id').text();
		var count = $(this).parent().parent().parent().find('.js_nud_val').val();
		
		$('#add_list_status_'+id).html('<img src="/img/ajax_loader.gif" width="43" height="11" alt="" />');
		
		$.ajax({
			type: 'GET',
			dataType:'json',
			url:'/json/addToLists/'+id+((lst != undefined) ? '/'+lst : '')+'/?count='+count,
			success: function(data, textStatus) {
				if ($.isArray(data)) {
					$('#add_list_status_'+id).html('<span class="c_green">Уже есть в списке</span>');
				} else {
					$('#add_list_status_'+id).html('<span class="c_green">Добавлено в список</span>');
				}
			},
			error: function(data) {
				$('#add_list_status_'+id).html('<span class="c_green">Уже есть в списке</span>');
			}
		});
	});
	
	return false;
}

function displayBasketForm(id) {
	if ($('#login_form_basket').dialog('isOpen'))  {
		$('#login_form_basket').dialog('destroy');
	}
	$(function() {
		$('#login_form_basket').html(getAjaxGifLoader());
		$('#login_form_basket').dialog({
			bgiframe: true,
			modal: true,
			height: 400,
			width: 570,
			title: 'Корзина',
			position: 'center',
			buttons: {
				'Оформить заказ': function() {
					$(this).dialog('close');
					orderBasket();
				},
				'Продолжить покупки': function() {
					$(this).dialog('close');
				}
			},
			open: function() {
				$.ajax({
					type: "GET",
					dataType:'json',
					url:'/json/getBasket/'+id+'/',
					success: function(data, textStatus) {
						if (textStatus == 'success') {
							if (data == 'nocookie') {
								$('#login_form_basket').dialog('destroy');
								showMessage('Ошибка. COOKIES должны быть включены.');
							} else if (data == 'false') {
								$('#login_form_basket').dialog('destroy');
								showMessage('Ошибка. Не удалось отобразить карзину.');
							} else if (data == 'empty') {
								$(this).dialog('close');
							} else {
								$('#login_form_basket').html(returnBasket(data));
								//setDialogPosition('login_form_basket');
							}
						}
					},
					error: function(data) {
						if ($('#login_form_basket').dialog('isOpen'))  {
							$('#login_form_basket').dialog('destroy');
							showMessage('Ошибка. Не удалось отобразить карзину.');
						}
					}
				});
			},
			close: function() {
				addCookieBasket();
				$(this).dialog('destroy');
			}
		});
	});
	return false;
}

function deleteBasket(id) {
	$('#login_form_basket').html(getAjaxGifLoader());
	if ($('#login_form_basket').dialog('isOpen'))  {
		$('#login_form_basket').dialog('destroy');
	}
	$(function() {
		$('#login_form_basket').dialog({
			bgiframe: true,
			modal: true,
			height: 400,
			width: 570,
			title: 'Корзина',
			position: 'center',
			buttons: {
				'Оформить заказ': function() {
					$(this).dialog('close');
					orderBasket();
				},
				'Продолжить покупки': function() {
					$(this).dialog('close');
				}
			},
			open: function() {
				$.ajax({
					type: "GET",
					dataType:'json',
					url:'/json/deleteBasket/'+id+'/',
					success: function(data, textStatus) {
						if (textStatus == 'success') {
							if (data == 'nocookie') {
								$('#login_form_basket').dialog('destroy');
								showMessage('Ошибка. COOKIES должны быть включены.');
							} else if (data == 'false') {
								$('#login_form_basket').dialog('destroy');
								showMessage('Ошибка. Не удалось отобразить карзину.');
							} else if (data == 'empty') {
								$('#login_form_basket').dialog('destroy');
							} else {
								$('#login_form_basket').html(returnBasket(data));
							}
							setDialogPosition('login_form_basket');
						}
					},
					error: function(data) {
						if ($('#login_form_basket').dialog('isOpen'))  {
							$('#login_form_basket').dialog('destroy');
							showMessage('Ошибка. Не удалось отобразить карзину.');
						}
					}
				});
			},
			close: function() {
				addCookieBasket();
				$(this).dialog('destroy');
			}
		});
	});
	return false;
}

var array_idss = [];
var array_counts = [];
function returnBasket(data) {
	if (data != '' || data != 'empty') {
		$('#login_form_basket').html(getAjaxGifLoader());
		array_idss = [];
		array_counts = [];
		var html = '';
		var summ = 0;
		html += '<div><div class="clear"></div><table class="table_info" id="basketlist" width="540"><tr><th colspan="2">Товар</th><th>Количество</th><th>Цена</th><th>Сумма</th><th>Действие</th></tr>';
		var a = '';
		for(i=0;i<data.length;i++) {
			if (i%2 == 1) {
				a = ' class="one" ';
			} else {
				a = ' ';
			}
			html += '<tr><td'+a+'align="center" width="100">';
			if (data[i][4] != '') {
				html += '<img class="image" id="main_image" src="'+data[i][4]+'" border="0" alt="'+data[i][0]+'">';
			}
			html += '</td><td'+a+'align="left" width="200"><strong>'+data[i][0]+'</strong></td>';
			html += '<td'+a+'align="center" width="60"><input id="count_'+data[i][5]+'" value="'+data[i][1]+'" size="5" maxlength="2" onkeydown="getNodeSumm('+data[i][5]+')" onkeyup="getNodeSumm('+data[i][5]+')"></td>';
			html += '<td'+a+'align="center" width="60"><input id ="price_'+data[i][5]+'" value="'+data[i][2]+'" type="hidden"><nobr>'+data[i][2]+'</nobr></td>';
			html += '<td'+a+'align="center" width="60" id="summ_'+data[i][5]+'"><input type="hidden" id="h_summ_'+data[i][5]+'" value="'+data[i][3]+'"><nobr>'+data[i][3]+'</nobr></td>';
			html += '<td'+a+'align="center" width="60"><a onclick="deleteBasket('+data[i][5]+')" href="javascript: void(0);"><img src="/img/admin/icons/delete.gif" border="0" alt="Удалить" title="Удалить"></a></td></tr>';
			summ += parseFloat(data[i][3]);
			array_idss[i] = data[i][5];
			array_counts[i] = data[i][1];
		}
		html += '<tr><td colspan="4" align="right"><strong>Итого:</strong></td><td colspan="2" id="summ_all"><nobr><strong>'+summ.toFixed(2)+'</strong><nobr></td></tr>';
		html += '</table><div class="clear"></div></div>';
		return html;
	}
}

function orderBasket() {
	if ($('#login_form_basket').dialog('isOpen'))  {
		$('#login_form_basket').dialog('destroy');
	}
	$('#login_form_basket').html(getAjaxGifLoader());
	$(function() {
		$('#login_form_basket').dialog({
			bgiframe: true,
			modal: true,
			height: 400,
			width: 570,
			title: 'Корзина',
			position: 'center',
			buttons: {
				'Оформить заказ': function() {
					$('#basket_form').submit();
				},
				'Продолжить покупки': function() {
					$(this).dialog('close');
				}
			},
			open: function() {
				$.ajax({
					type: "GET",
					dataType:'json',
					url:'/json/getRegUser/',
					success: function(data, textStatus) {
						if (textStatus == 'success') {
							var usr_name		= '';
							var mus_phone		= '';
							var usr_login		= '';
							var mus_address		= '';
							var mus_address_info= '';
							var reg = 0;
							if(data != 'nouser') {
								var usr_name		= data[0];
								var mus_phone		= data[1];
								var usr_login		= data[2];
								var mus_address		= data[3];
								var mus_address_info= data[4];
								var reg = 1;
							}
							var html = '';
							html += '<table><tr><td>';
							html += '<form name="basket_form" id="basket_form" action="/json/sendBasket/" method="POST"><table class="form"><tr><td style="padding-left:0px"><strong>Контактное лицо: <span class="star" id="mus_name_info">*</span></strong><br>';
							html += '<input class="input" name="mus_name" id="mus_name" value="'+usr_name+'" style="width: 250px;">';
							html += '</td></tr><tr><td style="padding-left:0px"><strong>Контактный телефон: <span class="star" id="mus_phone_info">*</span></strong><br>';
							html += '<input class="input" name="mus_phone" id="mus_phone" value="'+mus_phone+'" style="width: 250px;">';
							html += '</td></tr><tr><td style="padding-left:0px"><strong>Контактный e-mail: <span class="star" id="mus_email_info">*</span></strong><br>';
							html += '<input class="input" name="mus_email" id="mus_email" value="'+usr_login+'@budsvit.com.ua" style="width: 250px;">';
							html += '</td></tr><tr><td style="padding-left:0px"><strong>Адрес доставки:</strong><br>';
							html += '<input class="input" name="mus_address" id="mus_address" value="'+mus_address+'" style="width: 250px;">';
							html += '</td></tr><tr><td style="padding-left:0px"><strong>Комментарий:</strong><br>';
							html += '<textarea class="textarea" name="mus_address_info" id="mus_address_info" value="'+mus_address_info+'?>" style="width: 250px; height: 45px;" onkeyup="get_count();" onchange="get_count();"></textarea><br><input style="width:50px" disabled class="input" size="2" value="300" name="cound" id="cound" onkeyup="get_count();" onchange="get_count();">';
							html += '</td></tr><tr><td><span class="star">*</span> - Обязательное поле для заполнения</td></tr></table></form>';
							html += '</td>';
							
							if (reg == 0) {
								html += '<td valign="top" style="padding:5px 0 0 20px;"><a href="">Зайти в мой ТУТ</a> | <a href="">Регистрация</a></td>';
							}
							html += "</tr></table>";
							$('#login_form_basket').html(html);
							$('#basket_form').submit(function() {
								$(this).ajaxSubmit({
									dataType: 'json',
									beforeSubmit: function(formData, jqForm, options) {
										if ($('#mus_name').val() == '') {
											$('#mus_name_info').html('не может быть пустым');
											$("#mus_name").effect("highlight",{},1500);
										} else {
											$('#mus_name_info').html('*');
										}
										if ($('#mus_phone').val() == '')	{
											$('#mus_phone_info').html('не может быть пустым');
											$("#mus_phone").effect("highlight",{},1500);
										} else {
											$('#mus_phone_info').html('*');
										}
										if (!isType($('#mus_email').val(), "email")) {
											$('#mus_email_info').html('не может быть пустым');
											$("#mus_email").effect("highlight",{},1500);
										} else {
											$('#mus_email_info').html('*');
										}

										var pleaseletmeenter = true;
										if ($('#mus_name').val() == '') {
											pleaseletmeenter = false;
											$("#mus_name").focus();
										} else if ($('#mus_phone').val() == '') {
											pleaseletmeenter = false;
											$("#mus_phone").focus();
										} else if ($('#mus_email').val() == ''){
											pleaseletmeenter = false;
											$("#mus_email").focus();
										}
										return pleaseletmeenter;
									},
									success: function(data, textStatus) {
										if (textStatus == 'success' && data == 'success') {
											if ($('#login_form_basket').dialog('isOpen'))  {
												$('#login_form_basket').dialog('destroy');
												showMessage('Спасибо. Ваш заказ отправлен.');
											}
										} else {
											if ($('#login_form_basket').dialog('isOpen'))  {
												$('#login_form_basket').dialog('destroy');
												showMessage('Ошибка. Попробуйте заказать позже.');
											}
										}
									}
								});
								return false;
							});
						}
					},
					error: function(data) {
						if ($('#login_form_basket').dialog('isOpen'))  {
							$('#login_form_basket').dialog('destroy');
							showMessage('Ошибка. Не удалось отобразить карзину.');
						}
					}
				});
			},
			close: function() {
				$(this).dialog('destroy');
			}
		});
	});
	return false;
}

function getNodeSumm(id, rate) {
	var count = Number($("#count_"+id)[0].value);
	var price = Number($("#price_"+id)[0].value);
	if($("#price_sk_"+id).val() == undefined){
		var price_sk = null;
	} else {
		var price_sk = Number($("#price_sk_"+id).val().replace(',', '.'));
		var count_sk = Number($("#count_sk_"+id).val());
	}
	if (count <= 0 || isNaN(count)) {
		count = 1;
	}
	
	if (price_sk != null){
		if (count_sk <= 1 || count_sk<= count){
			price = price_sk;
		}
	}
	var summ = count*price;
	$("#summ_h_"+id).html(summ.toFixed(2)+' грн.<input type="hidden" id="h_summ_'+id+'" value="'+summ.toFixed(2)+'">');
	$("#summ_u_"+id).html('$ '+formatPrice(summ.toFixed(2)/rate));
	$("#h_summ_"+id)[0].value = summ.toFixed(2);
	getAllSumm(rate);
}
function getAllSumm(rate) {
	var summ = 0;
	var arra = array_idss;
	for (i=0;i<arra.length;i++) {
		summ += parseFloat($("#h_summ_"+arra[i])[0].value.replace(',', '.'));
		array_counts[i] = parseFloat($("#count_"+arra[i])[0].value);
	}
	$("#summ_all").html('$ '+formatPrice(summ.toFixed(2)/rate));
	$("#summ_all_h").html(formatPrice(summ.toFixed(2))+' грн.');
}

function get_count() {
	var maxLen=300;
	if ($gid('mus_address_info').value.length > maxLen) {
		$gid('mus_address_info').value = $gid('mus_address_info').value.substring(0,maxLen);
	}
	$gid('cound').value = (maxLen - $gid('mus_address_info').value.length);
	$gid('mus_address_info').focus();
}

function addCookieBasket() {
	var valueid = '';
	var valuec = '';
	if (array_idss.length != 0) {
		for (i=0;i<array_idss.length;i++) {
			valueid += array_idss[i]+'/';
			valuec 	+= array_counts[i]+'/';
		}
	}
	$.ajax({
		type: 'POST',
		dataType:'json',
		url: '/json/saveBasket/',
		data: 'valueid='+valueid+"&valuec="+valuec,
		success: function(data, textStatus) {},
		error: function(data) {}
	});
}

function addToLists(id, count) {
	if (count == undefined){
		count = 1;
	}
	$(function() {
		$.ajax({
			type: 'GET',
			dataType:'json',
			url:'/json/addToLists/'+id+'/?count='+count,
			success: function(data, textStatus) {
				if (textStatus == 'success') {
					if ($.isArray(data)) {
						var title = 'Выберите список в который будет скопирован выбранный товар:<br>'
							var html = '';
							for (var i = 0; i < data.length; i++) {
								html+='<div style="padding-bottom:2px;background-color:'+data[i][4]+';color:'+data[i][5]+';" align="left">'
								if (data[i][3] == 1) {
									html+='<span class="wishlist_private_title" title="Приватный"></span>';
								} else {
									html+='<span class="wishlist_public_title" title="Публичный"></span>';
								}
								if (data[i][2] == 1) {
									html+= '<a href="javascript:void(0)" onclick="return addToListsAndId('+id+','+data[i][0]+', '+count+')" title="'+data[i][1]+'">'+data[i][1]+'</a>';
								} else {
									html+= '<span style="color:grey">'+data[i][1]+'<small>(уже есть в этом списке)</small></span>';
								}
								html+='</div><br>'
							}
							$('#jMessage').html(title+html);
							$(function() {
								$('#jMessage').dialog({
									bgiframe: true,
									modal: false,
									title: 'Выберите список',
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
					} else {
						if (data == 'nouser') {
							var html = '';
							html+= '<div style="color:brown;padding-bottom:10px;font-weight:bold;">Списки желаний могут иметь только зарегистрированные позьзователи!</div>';
							html+= '<div style="padding:0 26px 15px 0;text-align:right;"><a href="/smeta/" title="подробнее о смете">подробнее о смете</a></div>';
							$('#login_form_tips').html(html);
							showLoginForm(document.URL);
							$('#login_form').css('height', '147px');
							$('#login_form_wrap_wrap').css('height', '255px');
							return false;
						} else {
							if (show_type=='images') {
								$('#lists_'+id).html('<span class="images left ic_wish-"></span>');
							} else if (show_type == 'text') {
								$('#lists_'+id).html('Добавлено в смету');
							} else {
								$('#lists_'+id).html('<div style="margin-left: 35px;"><span class="images left ic_wish-"></span><span class="left">В смете</span></div>');
							}
							if (window.wishblock != undefined){
								wishblock();
							}
						}
					}
				}
			},
			error: function(data) {
				showMessage('Ошибка. Не удалось добавить в список желаний. Возможно, данный товар уже находится в ваших списках');
			}
		});
	});
	return false;
}

function addToListsAndId(id,lst, count) {
	$('#jMessage').dialog('destroy');
	$(function() {
		$.ajax({
			type: 'GET',
			dataType:'json',
			url:'/json/addToLists/'+id+'/'+lst+'/?count='+count,
			success: function(data, textStatus) {
				if (textStatus == 'success') {
					if (show_type=='images') {
						$('#lists_'+id).html('<span class="images left ic_wish-"></span>');
					} else {
						$('#lists_'+id).html('<span class="images left ic_wish-"></span><span class="menu12 font_green">В смете</span>');
					}
				}
			},
			error: function(data) {
				showMessage('Ошибка. Не удалось добавить в список желаний. Возможно, данный товар уже находится в ваших списках');
			}
		});
	});
	return false;
}

function createItemCookie(mit_id,mit_title) {
	$(function() {$.ajax({url:'/json/createItemCookie/'+mit_id+'/'+mit_title+'/'});});
	return false;
}

function createCompareCookie(mcg_id,mcg_title,mit_for_cookie,items) {
	$(function() {$.ajax({type: 'POST',url:'/json/createCompareCookie/',data: 'mcg_id='+mcg_id+"&mcg_title="+mcg_title+"&mit_for_cookie="+mit_for_cookie+"&items="+items});});
	return false;
}