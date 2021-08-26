var compare_request = new ajaxLib();
var compare_minimized = false;
var compare_item = false;
function addCompare(mit_id)
{
	compare_minimized = 0;	
	$.ajax({
		type: "GET",
		dataType:'json',
		url:'/mjson/addcompare/'+mit_id+'/',
		success: function(data, textStatus) {
			if (textStatus == 'success') {
				if (data == 'nomore') {
					showMessage('Может быть выбрано не более 10 товаров!');
				} else {
					if (!compare_item){
						compareResult(data);
					} else {
						compareResultItem(data);
					}
				}
			}
		},
		error: function(data) {
			if ($('#login_form_basket').dialog('isOpen'))  {
				showMessage('Ошибка.');
			}
		}
	});
	if (show_type=='images') {
		$('#item_compare_'+mit_id).html('<span class="images ic_compar- left"></span>');
	} else {
		$('#item_compare_'+mit_id).html('<span class="images ic_compar- left"></span><span class="menu12 font_green">В списке сравнения</span>');
	}
	if (jQuery.browser.msie){
		event.returnValue = false;
	}
	return false;
}
function delCompare(mit_id)
{
	$.ajax({
		type: "GET",
		dataType:'json',
		url:'/mjson/delcompare/'+mit_id+'/',
		success: function(data, textStatus) {
			if (textStatus == 'success') {
				if (data == 'nomore') {
					showMessage('Может быть выбрано не более 10 товаров!');
				} else {
					if (!compare_item){
						compareResult(data);
					} else {
						compareResultItem(data);
					}
				}
			}
		},
		error: function(data) {
			if ($('#login_form_basket').dialog('isOpen'))  {
				showMessage('Ошибка.');
			}
		}
	});
	if (show_type=='images') {
		$gid("item_compare_"+mit_id).html('<a href="javascript:void(0)" onclick="return addCompare('+mit_id+');" title="Сравнить"><span class="images ic_compar"></span></a>');
	} else {
		$gid("item_compare_"+mit_id).html('<a class="menu12 font_green" href="javascript:void(0)" onclick="return addCompare('+mit_id+');" title="Сравнить"><span class="images ic_compar left"></span><span>Сравнить</span></a>');
	}
	return false;
}
function getCompare(mcg_id, minimized)
{
	compare_minimized = minimized;
	$.ajax({
		type: "GET",
		dataType:'json',
		url:'/mjson/getcompare/'+mcg_id+'/',
		success: function(data, textStatus) {
			if (textStatus == 'success') {
				if (data == 'nomore') {
					showMessage('Может быть выбрано не более 10 товаров!');
				} else {
					compareResult(data)
				}
			}
		},
		error: function(data) {
			if ($('#login_form_basket').dialog('isOpen'))  {
				showMessage('Ошибка.');
			}
		}
	});
	return false;
}
function getCompareItem(mcg_id, minimized)
{
	compare_minimized = minimized;
	$.ajax({
		type: "GET",
		dataType:'json',
		url:'/mjson/getcompare/'+mcg_id+'/',
		success: function(data, textStatus) {
			if (textStatus == 'success') {
				if (data == 'nomore') {
					showMessage('Может быть выбрано не более 10 товаров!');
				} else {
					compareResultItem(data)
				}
			}
		},
		error: function(data) {
			if ($('#login_form_basket').dialog('isOpen'))  {
				showMessage('Ошибка.');
			}
		}
	});
	return false;
}
function compareState(state){
	if (state == 1){
		compare_minimized = 0;
		$('#compare_open').css('display', 'none');
		$('#compare_close').css('display', 'block');
		$('#compare_content').css('display', 'block');
	} else {
		compare_minimized = 1;
		$('#compare_open').css('display', 'block');
		$('#compare_close').css('display', 'none');
		$('#compare_content').css('display', 'none');
	}
}
function compareResult(words)
{
	var html = '';
	if (words != '') {
		var ids = words.ids;
		var result = words.items;
		
		var mcg_id = 0;
		var mcgs_id = 0;
		if (result.length > 0) {
			for(i=0;i<result.length;i++) {
				if (result[i]['title'] == undefined) {
					continue;
				}
				mcg_id = result[i]['mcg_id'];
				html+= '<div class="left hidden" style="width:140px;height:140px;"><div class="right"><a href="javascript:void(0)" onclick="delCompare('+ result[i]['id'] +'); return false;"><span class="images ic_dell static" title="Удалить из Сравнения">&nbsp;</span></a></div><div><a href="' + result[i]['href'] + '"><img src="' + result[i]['image'] + '" class="center"></a></div><div class="font_green bold" style="padding:5px 10px;"><a href="' + result[i]['href'] + '">' + result[i]['title'] + '</a></div></div>';
				if (i != result.length-1) {html+= '<div class="left vert1px" style="height:140px;">&nbsp;</div>';} 

				//html+= '<div style="padding: 5px 10px;">' + result[i]['description'] + '</div>';

				if ($('#item_compare_'+result[i]['id']).id != null) {
					if (show_type=='images') {
						$('#item_compare_'+result[i]['id']).html('<span class="images ic_compar-"></span>');
					} else {
						$('#item_compare_'+result[i]['id']).html('<span class="images ic_compar-"></span><span class="font_green">В списке сравнения</span>');
					}
				}
			}
		}
	}
	if (html != '') {
		header = '<div class="down10"><div class="s_box_t"><em class="s_box_em_t_l"><b class="s_box_b_t_l">&bull;</b><b class="s_box_b_t_l_w">&bull;</b></em><em class="s_box_em_t_r"><b class="s_box_b_t_r">&bull;</b><b class="s_box_b_t_r_w">&bull;</b></em></div><div class="main_block">Выбраны товары для сравнения ('+result.length+').';
		html = header + '<div id="compare_content" style="display: '+(compare_minimized ? 'none': 'block')+'; height:140px;overflow:hidden;margin: 0 0 10px 0;">' + html + '<div class="clear"></div></div>';
		html+= '<div><div id="compare_close" style="display: ' + (compare_minimized ? 'none': 'block') + ';padding-left:5px;"  class="left"><a class="button" href="javascript:void(0);" onclick="compareState(0); return false;">свернуть</a></div><div id="compare_open" style="display: ' + (compare_minimized ? 'block': 'none') + ';padding-left:5px;" class="left"><a class="button" href="javascript:void(0);" onclick="compareState(1); return false;">развернуть</a></div><div class="left" style="padding-left:5px;text-align:right;"><a class="button" href="/compare/'+mcg_id+'/'+ids+'/">сравнить</a></div><div class="clear"></div></div>'
		html+= '</div><div class="s_box_b"><em class="s_box_em_b_l"><b class="s_box_b_b_l">&bull;</b><b class="s_box_b_b_l_w">&bull;</b></em><em class="s_box_em_b_r"><b class="s_box_b_b_r">&bull;</b><b class="s_box_b_b_r_w">&bull;</b></em></div></div>';

	}

	$('#compare_block').html(html);
}

function compareResultItem(words)
{
	var html = '';
	if (words != '') {
		var ids = words.ids;
		var result = words.items;
		
		var mcg_id = 0;
		var mcgs_id = 0;
		if (result.length > 0) {
			for(i=0;i<result.length;i++) {
				if (result[i]['title'] == undefined) {
					continue;
				}
				mcg_id = result[i]['mcg_id'];
				html+= '<div style="float: left; width: 64px; height: 64px; background: white; margin: 2px;"><a href="javascript:void(0)" onclick="delCompare('+ result[i]['id'] +'); return false;"><div class="del_compare"></div><img style="margin: 6px;" src="' + result[i]['image'] + '" width="50px" class="center"></a></div>';
				//if (i != result.length-1) {html+= '<div class="left vert1px" style="height:140px;">&nbsp;</div>';} 

				//html+= '<div style="padding: 5px 10px;">' + result[i]['description'] + '</div>';

				if ($('#item_compare_'+result[i]['id']).id != null) {
					if (show_type=='images') {
						$('#item_compare_'+result[i]['id']).html('<span class="images ic_compar-"></span>');
					} else {
						$('#item_compare_'+result[i]['id']).html('<span class="images ic_compar-"></span><span class="font_green">В списке сравнения</span>');
					}
				}
			}
		}
	}
	if (html != '') {
		header = '<div style="float: left; width: 100px; margin: 4px 4px 0px 0px;">';
		header += '<a href="/compare/'+mcg_id+'/'+ids+'/" style="color: black;">СРАВНИТЬ</a><br><span class="c_gray">К сравнению</span><br><div style="font-weight: 14px; padding: 4px 0px 4px 0px">'+result.length+'</div><a href="javascript:void(0)" onclick="return delCompare(\'all\');">очистить все</a></div>';
		//header = '<div class="down10"><div class="s_box_t"><em class="s_box_em_t_l"><b class="s_box_b_t_l">&bull;</b><b class="s_box_b_t_l_w">&bull;</b></em><em class="s_box_em_t_r"><b class="s_box_b_t_r">&bull;</b><b class="s_box_b_t_r_w">&bull;</b></em></div><div class="main_block">Выбраны товары для сравнения ('+result.length+').';
		html = header + '<div id="compare_content" style="height:60px;overflow:hidden;margin: 0 0 10px 0;">' + html + '<div class="clear"></div></div>';
		//html+= '<div><div class="left relative" style="width:49%;padding-right:5px;text-align:right;"><a href="/compare/'+mcg_id+'/'+ids+'/"><button type="submit" class="buttons"><span><span>сравнить</span></span></button></a></div><div id="compare_close" style="display: ' + (compare_minimized ? 'none': 'block') + ';width:49%;padding-left:5px;"  class="left relative"><a href="javascript:void(0);" onclick="compareState(0); return false;"><button type="submit" class="buttons"><span><span>свернуть</span></span></button></a></div><div id="compare_open" style="display: ' + (compare_minimized ? 'block': 'none') + ';width:49%;padding-left:5px;" class="left relative"><a href="javascript:void(0);" onclick="compareState(1); return false;"><button type="submit" class="buttons"><span><span>развернуть</span></span></button></a></div><div class="clear"></div></div>'
		//html+= '</div><div class="s_box_b"><em class="s_box_em_b_l"><b class="s_box_b_b_l">&bull;</b><b class="s_box_b_b_l_w">&bull;</b></em><em class="s_box_em_b_r"><b class="s_box_b_b_r">&bull;</b><b class="s_box_b_b_r_w">&bull;</b></em></div></div>';
		$('#minmax').show();
		$('#compare_block_item').show();
	} else {
		$('#compare_block_item').hide();
		html = 'Список сравнения пуст';
	}
	$('#compare_block_item').html(html);
}