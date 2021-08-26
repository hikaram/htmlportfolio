$(document).ready(function(){				 
	$(".ul_small a, .ul_middle a").click(function(){ showPupop(this); });					
	$(".shadow").click(function(){ hidePupop();	});
	var Hbody = $("body").height();
	$(".shadow").css({ height: Hbody+'px' });
});
  
function showPupop(option){
	$(".shadow").toggle();
	var rel = $(option).attr('rel');
	$(".big_ph, .big_ph img#"+rel).fadeIn(500);	
}
function hidePupop(){
	$(".shadow").hide();
	$(".big_ph, .big_ph img").fadeOut(500);
}
  
  