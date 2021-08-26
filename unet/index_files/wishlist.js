function deleteList(id,user_login) {
	$('#jMessage').html('Вы хотите удалить смету! Вы уверены?');
	$('#jMessage').dialog({
		bgiframe: true,
		modal: false,
		title: 'Сообщение',
		buttons: {
			'Нет': function() {
				$(this).dialog('close');
				return false;
			},
			'Да': function() {
				$(this).dialog('close');
				$.ajax({
					url:'/json/deleteList/'+id+'/',
					success: function(data, textStatus) {
						window.location.href='/smeta/';
					},
					error: function(data) {
						 showMessage('Ошибка. Не удалось удалить смету.');
					}
				});
			}
		},
		close: function() {
			$(this).dialog('destroy');
		}
	});
}

function createList(user_login) {
	$(function() {
		if (false && user_login == '') {
			var html = '';
			html+= '<div style="color:brown;padding-bottom:10px;font-weight:bold;">Списки желаний могут иметь только зарегистрированные позьзователи!</div>';
			html+= '<div style="padding:0 26px 15px 0;text-align:right;"><a href="/smeta/" title="подробнее о Смете">подробнее о Смете</a></div>';
			$('#login_form_tips').html(html);
			showLoginForm(document.URL);
			$('#login_form').css('height', '147px');
			$('#login_form_wrap_wrap').css('height', '255px');
			return false;
		} else {
			$('#jMessage').dialog({
				bgiframe: true,
				modal: true,
				height: 300,
				width: 270,
				title: 'Новая смета',
				position: 'center',
				buttons: {
					'Добавить': function() {
						$('#wishlist_form').submit();
					},
					'Отмена': function() {
						$(this).dialog('close');
					}
				},
				open: function() {
					html = '';
					html += '<form name="wishlist_form" id="wishlist_form" action="/json/createList/" method="POST"><table class="form"><tr><td>';
					html += '<strong>Название списка: <span class="star" id="lst_title_info">*</span></strong><br><input class="input" name="lst_title" id="lst_title_new" value="" style="width: 200px;">';
					html += '</td></tr><tr><td>';
					html += '<strong>Описание: </strong><br><textarea class="input" name="lst_description" id="lst_description_new" value="" style="width:200px;height:40px;"></textarea>';
					html += '</td></tr><tr><td>';
					html += '<strong>Актуален до: <span class="star" id="lst_relevance_info">*</span></strong><br><input class="input" name="lst_relevance" id="lst_relevance_new" value="" style="width: 200px; z-index: 100;">';
					html += '</td></tr><tr><td>';
					html += '<span class="star">*</span> - Обязательное поле для заполнения</td></tr></table></form>';
					$('#jMessage').html(html);
					$.datepicker.setDefaults({changeMonth: true, changeYear: true});
					$.datepicker.setDefaults($.datepicker.regional['ru']);
					$('#lst_relevance_new').datepicker();
	
					$('#wishlist_form').submit(function() {
						$(this).ajaxSubmit({
							dataType: 'json',
							beforeSubmit: function(formData, jqForm, options) {
								if ($('#lst_title_new').val() == '')	{
									$('#lst_title_info').html('не может быть пустым');
									$("#lst_title_new").effect("highlight",{},1500);
								} else {
									$('#lst_title_info').html('*');
								}
								if ($('#lst_relevance_new').val() == '') {
									$('#lst_relevance_info').html('не может быть пустым');
									$("#lst_relevance_new").effect("highlight",{},1500);
								} else {
									$('#lst_relevance_info').html('*');
								}
		
								var pleaseletmeenter = true;
								if ($('#lst_title_new').val() == '') {
									pleaseletmeenter = false;
									$("#lst_title_new").focus();
								} else if ($('#lst_relevance_new').val() == '') {
									pleaseletmeenter = false;
									$("#lst_relevance_new").focus();
								}
								return pleaseletmeenter;
							},
							success: function(data, textStatus) {
								if (textStatus == 'success') {
									if ($('#jMessage').dialog('isOpen'))  {
										$('#jMessage').dialog('destroy');
										showMessage('Спасибо. Новая смета создана.');
										window.location.href='/smeta/'+parseInt(data)+'/';
									}
								} else {
									if ($('#jMessage').dialog('isOpen'))  {
										$('#jMessage').dialog('destroy');
										showMessage('Ошибка. Попробуйте создать позже.');
									}
								}
							}
						});
						return false;
					});
				},
				error: function(data) {
					if ($('#jMessage').dialog('isOpen'))  {
						$('#jMessage').dialog('destroy');
						showMessage('Ошибка. Не удалось отобразить карзину.');
					}
				},
				close: function() {
					$(this).dialog('destroy');
				}
			});
		}
	});
	return false;
}

function ppList(id, type) {
	$.ajax({
		url:'/json/ppList/'+id+'/',
		success: function(data, textStatus) {
			if (textStatus == 'success') {
				$('#wishlist_type_title_'+id).removeClass();
				if (type == 'private') {
					$('#wishlist_type_'+id).html('<span class="wishlist_private"></span><strong style="font-weight:bold;">Приватный</strong><span style="padding:0 20px;">Только Вы видите эту смету</span><a href="javascript:void(0);" onclick="return ppList('+id+',\'public\');" style="color:grey;">сделать публичным</a>');
					$('#wishlist_type_title_'+id).addClass('wishlist_private_title');
					$('#wishlist_type_title_'+id).attr('title','Приватная смета');
					
					$('.div_private').append( $('.title_menu_'+id) );
					
					$('#lists_accordion').accordion('activate',1);
					$('.count_private').html(parseInt($('.count_private').html())+1);
					$('.count_public').html(parseInt($('.count_public').html())-1);
				} else if (type == 'public') {
					$('#wishlist_type_'+id).html('<span class="wishlist_public"></span><strong style="font-weight:bold;">Публичный</strong><span style="padding:0 20px;">Эту смету видят Ваши друзья</span><a href="javascript:void(0);" onclick="return ppList('+id+',\'private\');" style="color:grey;">сделать приватным</a></span>');
					$('#wishlist_type_title_'+id).addClass('wishlist_public_title');
					$('#wishlist_type_title_'+id).attr('title','Публичная смета');

					$('.div_public').append( $('.title_menu_'+id) );
					$('#lists_accordion').accordion('activate',0);
					$('.count_private').html(parseInt($('.count_private').html())-1);
					$('.count_public').html(parseInt($('.count_public').html())+1);
				}
			}
		},
		error: function(data) {
			 showMessage('Ошибка. Не удалось поменять cтатус списка желаний.');
		}
	});
	return false;
}

function showMoveList(id, lst_id) {
	$('#jMessage').dialog('destroy');
	if (lists_array.length > 1) {
		var title = 'Выберите смету в которую будет перемещён выбранный товар:<br>'
		var html = '';
		for (var i = 0; i < lists_array.length; i++) {
			if (lists_array[i][0] != lst_id) {
				html+= '<a href="javascript:void(0)" onclick="return moveToList('+id+','+lists_array[i][0]+', '+lst_id+')" title="'+lists_array[i][1]+'">'+lists_array[i][1]+'</a><br>'
			}
			$('#jMessage').html(title+html);
			$(function() {
				$('#jMessage').dialog({
					bgiframe: true,
					modal: false,
					title: 'Выберите смету',
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
	}
	return false;
}

function showCopyList(id,lst_id) {
	$('#jMessage').dialog('destroy');
	if (lists_array.length > 1) {
		$(function() {
			$.ajax({
				type: 'GET',
				dataType:'json',
				url:'/json/showCopyList/'+id+'/',
				success: function(data, textStatus) {
					if (textStatus == 'success') {
						if ($.isArray(data)) {
							var title = 'Выберите смету в которую будет скопирован выбранный товар:<br>'
							var html = '';
							for (var i = 0; i < data.length; i++) {
								if (data[i][0] != lst_id) {
									if (data[i][2] == 1) {
										html+= '<a href="javascript:void(0)" onclick="return copyToList('+id+','+data[i][0]+', '+lst_id+')" title="'+data[i][1]+'">'+data[i][1]+'</a><br>';
									} else {
										html+= '<span style="color:grey">'+data[i][1]+'<small>(уже есть в этом списке)</small></span><br>';
									}
								}
							}
							$('#jMessage').html(title+html);
							$(function() {
								$('#jMessage').dialog({
									bgiframe: true,
									modal: false,
									title: 'Выберите смету',
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
							showMessage('Ошибка. Не удалось скопировать в выбранную смету. Возможно, данный товар уже находится в этом списке');
						}
					}
				},
				error: function(data) {
					showMessage('Ошибка. Не удалось скопировать в выбранную смету. Возможно, данный товар уже находится в этом списке');
				}
			});
		});
	}
	return false;
}

function moveToList(mit_id,lst_new,lst_old) {
	$('#jMessage').dialog('destroy');
	$(function() {
		$.ajax({
			type: 'POST',
			dataType:'json',
			url:'/json/moveToList/',
			data: 'mit_id='+mit_id+"&lst_new="+lst_new+"&lst_old="+lst_old,
			success: function(data, textStatus) {
				if (textStatus == 'success') {
					$('#item_'+lst_old+'_'+mit_id).remove();
					$('#count_wishlist_items_'+lst_new).html(parseInt($('#count_wishlist_items_'+lst_new).html())+1);
					$('#count_wishlist_items_'+lst_old).html(parseInt($('#count_wishlist_items_'+lst_old).html())-1);
					showMessage('Товар перенесён');
				}
			},
			error: function(data) {}
		});
	});
	return false;
}

function copyToList(mit_id,lst_new,lst_old) {
	$('#jMessage').dialog('destroy');
	$(function() {
		$.ajax({
			type: 'POST',
			dataType:'json',
			url:'/json/copyToList/',
			data: 'mit_id='+mit_id+"&lst_new="+lst_new+"&lst_old="+lst_old,
			success: function(data, textStatus) {
				if (textStatus == 'success') {
					$('#count_wishlist_items_'+lst_new).html(parseInt($('#count_wishlist_items_'+lst_new).html())+1);
					showMessage('Товар скопирован');
				}
			},
			error: function(data) {
				showMessage('Ошибка. Не удалось скопировать в выбранную смету. Возможно, данный товар уже находится в этом списке');
			}
		});
	});
	return false;
}

function deleteListItem(mit_id,lst_id) {
	$('#jMessage').dialog('destroy');
	$(function() {
		$.ajax({
			type: 'POST',
			dataType:'json',
			url:'/json/delListItem/'+mit_id+'/'+lst_id+'/',
			success: function(data, textStatus) {
				if (textStatus == 'success') {
					$('#item_'+lst_id+'_'+mit_id).remove();
					$('#count_wishlist_items_'+lst_id).html(parseInt($('#count_wishlist_items_'+lst_id).html())-1);
					showMessage('Выбранный товар удалён');
				}
			},
			error: function(data) {
				showMessage('Ошибка. Не удалось удалить выбранный товар');
			}
		});
	});
	return false;
}

function editInPlaceItem(lst_id,mit_id) {
	var text = textold = $('#div_lsti_description_'+lst_id+'_'+mit_id+' a').html();
	var emptytext = 'Нажмите сюда, что бы добавит текст';
	if (text == emptytext) {
		text = '';
	}
	var html = '';
	html+= '<form id="form_lsti_description_'+lst_id+'_'+mit_id+'" action="/json/updateListItem/'+mit_id+'/'+lst_id+'/"  method="POST">';
	html+= '<textarea class="textarea" id="lsti_description_'+lst_id+'_'+mit_id+'" name="lsti_description" style="width: 99%;">'+text+'</textarea>';
	html+= '<input type="submit" class="button" value="Добавить" style="font-weight:bold;"></form>';
	$('#div_lsti_description_'+lst_id+'_'+mit_id).html(html);

	$('#form_lsti_description_'+lst_id+'_'+mit_id).submit(function() {
		$(this).ajaxSubmit({
			dataType: 'json',
			beforeSubmit: function(formData, jqForm, options) {
				$('#div_lsti_description_'+lst_id+'_'+mit_id).html(getAjaxGifLoader(16,'left'));
			},
			success: function(data, textStatus) {
				if (textStatus == 'success' && data == 'empty') {
					$('#jMessage').dialog('destroy');
					$('#div_lsti_description_'+lst_id+'_'+mit_id).html('<a href="javascript:void(0)" onclick="return editInPlaceItem('+lst_id+','+mit_id+');">'+emptytext+'</a>');
				} else if (textStatus == 'success' && data != 'false') {
					$('#jMessage').dialog('destroy');
					$('#div_lsti_description_'+lst_id+'_'+mit_id).html('<a href="javascript:void(0)" onclick="return editInPlaceItem('+lst_id+','+mit_id+');">'+data+'</a>');
				} else {
					$('#jMessage').dialog('destroy');
					showMessage('Ошибка. Попробуйте прокомментировать позже');
					$('#div_lsti_description_'+lst_id+'_'+mit_id).html('<a href="javascript:void(0)" onclick="return editInPlaceItem('+lst_id+','+mit_id+')">'+textold+'</a>');
				}
			}
		});
		return false;
	});
	return false;
}

function editInPlace(lst_id, type, name) {
	var text = textold = $('#div_'+name+'_'+lst_id+' span').html();

	var html = '';
	html+= '<form id="form_'+name+'_'+lst_id+'" action="/json/updateList/'+lst_id+'/" method="POST">';
	if (type == 'input') {
		html+= '<input class="textarea" name="'+name+'" style="width: 30%;" value="'+text+'" /><br />';
	}
	html+= '<input type="submit" class="button" value="Применить" style="font-weight:bold;"></form>';

	$('#'+name).before('<div />');
	$('#'+name).css('display','none');
	$('#'+name+'_edit').css('display','none');
	$('#div_'+name+'_'+lst_id+' div').html(html);


	$('#form_'+name+'_'+lst_id).submit(function() {
		$(this).ajaxSubmit({
			dataType: 'json',
			beforeSubmit: function(formData, jqForm, options) {
				$('#div_'+name+'_'+lst_id+' div').html(getAjaxGifLoader(16,'left'));
			},
			success: function(data, textStatus) {
				$('#div_'+name+'_'+lst_id+' div').remove();
				$('#'+name).css('display','');
				if (textStatus == 'success') {
					$('#jMessage').dialog('destroy');
					if (name == 'lst_title' && data == 'empty') {
						$('#'+name).html(textold);
					} else {
						if (name == 'lst_title') {
							$('.title_menu_'+lst_id+' a').html(data);
						}
						$('#'+name).html(data);
					}
				} else {
					$('#jMessage').dialog('destroy');
					$('#'+name).html(textold);
				}
			}
		});
		$('#'+name+'_edit').css('display','');
		return false;
	});

	return false;
}

function editListAction(lst_id){
	$('#lst_description_node').accordion('activate', 0);
	$(function() {
		$.ajax({
			dataType:'json',
			url:'/json/getList/'+lst_id+'/',
			success: function(data, textStatus) {
				$('#lst_title_edit').val(data.lst_title);
				$('#lst_description_edit').val(data.lst_description);
				$('#lst_relevance_edit').val(data.lst_relevance);
				$.datepicker.setDefaults({changeMonth: true, changeYear: true});
				$.datepicker.setDefaults($.datepicker.regional['ru']);
				$('#lst_relevance_edit').datepicker({dateFormat: 'yy-mm-dd'});
				$('#edit_list').dialog({
					bgiframe: true,
					modal: true,
					width: 300,
					title: 'Редактирование Сметы',
					buttons: {
						'Применить': function() {
							$.ajax({
								type: "POST",
								dataType:'json',
								url:'/json/updateList/'+lst_id+'/',
								data:'lst_description='+$('#lst_description_edit').val()+'&lst_relevance='+$('#lst_relevance_edit').val()+'&lst_title='+$('#lst_title_edit').val(),
								success: function(data, textStatus) {
									document.location = document.location;
								},
								error: function(data) {}
							});
							$(this).dialog('close');
						},
						'Отмена': function() {
							$(this).dialog('close');
						}
					},
					close: function() {
						$(this).dialog('destroy');
					}
				});
			}
			});
	});
	setDialogPosition('lst_description_node');

	return false;
}

function copyList(_fromUserId, _fromListId, _toUserId)
{
	$.ajax({
		type: "POST",
		dataType:"json",
		url:"/json/copyList/",
		data:"fromUserId=" + _fromUserId + "&fromListId=" + _fromListId + "&toUserId=" + _toUserId,
		success: function(data, textStatus)
			{
				showMessage('Смета успешно скопирована!');
			},
		error: function(data)
			{
				showMessage('Смету не удалось скопировать или она была скопирована некорректно!');
			}
	});
	
	return false;
}

function pickColor(lst_id) {
	$('#jMessage').dialog('destroy');
    $('#jMessage').html('<div id="picker"></div>');
    $('#picker').farbtastic('.lst_color_'+lst_id);
    $('#jMessage').dialog({
		bgiframe: true,
		modal: false,
		title: 'Цвет',
		width: 218,
		buttons: {
			'Применить': function() {
				$(this).dialog('close');
			}
		},
		close: function() {
			$(this).dialog('destroy');
		}
	});
	setDialogPosition('jMessage');
	return false;
}

function vote(id, rate, type){
	$(function() {
		$.ajax({
			dataType:'json',
			url:'/json/voteWishlist/'+id+'/'+rate+'/'+type+'/',
			success: function(data, textStatus) {
				if (textStatus == 'success' && data == 'ok') {
					$('#loading_place').html('<span class="yes">Спасибо, Ваш голос принят.</span>');
					$('#showvotes').html(parseInt($('#showvotes').html())+1);
					if (parseInt($('#rate').val()) == 0) {
						$('#ul_place').css('width',20*rate+'%');
					} else {
						$('#ul_place').css('width',10*(parseInt($('#rate').val())+rate)+'%');
					}
				} else {
					$('#loading_place').html('<span class="no">Голосовать можно только один раз в день.</span>');
				}
			},
			error: function(data) {
				showMessage('Ошибка. Не удалось проголосовать.');
			}
		});
	});
	return false;
}

function listViewed(id){
	$(function() {
		$.ajax({
			dataType:'json',
			url:'/json/listViewed/'+id+'/',
			success: function(data, textStatus) {},
			error: function(data) {}
		});
	});
	return false;
}

function runEffect(lst_id) {
	$(function() {
		$('#effect_'+lst_id).dialog({
			bgiframe: true,
			modal: true,
			width: 300,
			title: 'Выберите ссылки',
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
	setDialogPosition('effect_'+lst_id);

	return false;
}

function getOtherPrice(mit_id, lst_id)
{
	$.ajax({
		dataType:'json',
		url:'/json/getOtherPrice/'+mit_id+'/'+lst_id+'/',
		success: function(data) {
			$('#addon_'+mit_id).html(data);
			$('#other_prices_'+mit_id).hide();
			$('#other_prices_'+mit_id+'_hide').show();
		},
		error: function(data) {}
	});
}

function getOtherService(mit_id)
{
	$.ajax({
		dataType:'json',
		url:'/json/getOtherService/'+mit_id+'/',
		success: function(data) {
			$('#addon_'+mit_id).html(data);
			$('#other_services_'+mit_id).hide();
			$('#other_services_'+mit_id+'_hide').show();
		},
		error: function(data) {}
	});
}

function hideOther(mit_id, type){
	$('#addon_'+mit_id).html('');
	$('#other_'+type+'_'+mit_id).show();
	$('#other_'+type+'_'+mit_id+'_hide').hide();
}

function getLikeLists(lst_id, mit_id)
{
	$.ajax({
		dataType:'json',
		url:'/json/getLikeLists/'+lst_id+'/',
		success: function(data)
			{
				$('#addon_'+mit_id).html(data);
				$('#likeListsSwitch_' + mit_id).html("Свернуть");
			},
		error: function(data) {}
	});
}

function hideLikeList(mit_id)
{
	$('#addon_' + mit_id).html("");
	$('#likeListsSwitch_' + mit_id).html("Похожие сметы");
}

function switchLikeList(lst_id, mit_id)
{
	switch($('#likeListsSwitch_' + mit_id).html())
	{
		case "Похожие сметы":
			getLikeLists(lst_id, mit_id);
		break;
		
		case "Свернуть":
			hideLikeList(mit_id);
		break;
	}
}

/*
function pickColor(lst_id, name, background, color) {
	$('#jMessage').dialog('destroy');
	var html = '';
	html+='<input value="'+background+'" class="lst_color_'+lst_id+'" />'
	$('#div_'+name+'_'+lst_id).html(html);
    $('#jMessage').html('<div id="picker"></div>');
    $('#picker').farbtastic('.lst_color_'+lst_id);
    $('#jMessage').dialog({
		bgiframe: true,
		modal: false,
		title: 'Цвет',
		width: 218,
		buttons: {
			'Применить': function() {
				$.ajax({
					type: "POST",
					dataType:'json',
					url:'/json/updateList/'+lst_id+'/',
					data:'lst_background='+$('input.lst_color_'+lst_id).val()+'&lst_color='+$('.lst_color_'+lst_id).css('color'),
					success: function(data, textStatus) {
						$('#div_'+name+'_'+lst_id).html('<a href="javascript:void(0);" onclick="return pickColor('+lst_id+', \''+name+'\', \''+$('input.lst_color_'+lst_id).val()+'\', \''+data+'\');">'+$('input.lst_color_'+lst_id).val()+'</a>');
					},
					error: function(data) {
						$('#div_'+name+'_'+lst_id).html('<a href="javascript:void(0);" onclick="return pickColor('+lst_id+', \''+name+'\', \''+$('input.lst_color_'+lst_id).val()+'\', \''+color+'\');">'+$('input.lst_color_'+lst_id).val()+'</a>');
					}
				});
				$('#jMessage').dialog('destroy');
			},
			'Отмена': function() {
				$(this).dialog('close');
			}
		},
		close: function() {
			$('.lst_color_'+lst_id).css('background-color',background);
			$('.lst_color_'+lst_id).css('color',color);
			$('#div_'+name+'_'+lst_id).html('<a href="javascript:void(0);" onclick="return pickColor('+lst_id+', \''+name+'\', \''+background+'\', \''+color+'\');">'+background+'</a>');
			$(this).dialog('destroy');
		}
	});
	setDialogPosition('jMessage');
	return false;
}*/