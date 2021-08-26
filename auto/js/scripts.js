$(function() {
  $('.showsearch').click(function() {
	$('.autocomplit').slideToggle("normal");
	$(this).toggleClass('active');          
  });
  $('.autocomplit li').click(function() {
	$('.autocomplit').slideToggle("normal");
	$('#searchtop input[type="text"]').val($(this).text());
	$('.showsearch').toggleClass('active');
	$('div.placeholder').remove();
  });
});