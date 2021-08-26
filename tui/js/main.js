$(function() {
$('.fix_height_show').click(function(){
	$(this).parent('.tui_article__txt').animate({height : '100%'},300);
	$(this).hide();
	$(this).prev().hide();
	$(this).next().show();
	return false;
});

$('.fix_height_hide').click(function(){
	$(this).parent().stop().animate({height:'165px'},300);
	$(this).hide();
	$('.gradd').show();
	$('.fix_height_show').show();
	return false;
});

});	