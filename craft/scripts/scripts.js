(function ($) {
  // VERTICALLY ALIGN FUNCTION
  $.fn.haAlign = function() {
	var width = $(window).width();
	$("#other_links").css("width", (width-300)+"px");
  };
})(jQuery);

function projectRailScroll() {
	
  var firstProjectID = $(".item:first").attr("id");
  firstProjectID =  "#"+firstProjectID;
		
		
  var feedHeaderHeight = $(".feed_header").height() - 1;

  //var feedHeaderHeight = 500;
  var previousProject = activeProjectHeight = activeProject = activeRailHeight = activeRailTop = activeProjectTop = "";				
  $(".item:in-viewport").each(function() {
	activeProject = "#"+$(this).attr("id");
  });
        
  activeProjectHeight = $(activeProject).height();
  activeProjectTop = ($(activeProject).length > 0) ? $(activeProject).offset().top : false;
  activeRailTop = $(activeProject+ " .container_left").offset().top;
  activeRailHeight = $(activeProject+ " .container_left").height();
                        	
  $(activeProject+ " .container_left").css({
	"position":"fixed",
	"top":feedHeaderHeight
  });
  $('#logo').css({
	"position":"absolute",
	"top":"0"
  });
  // When projects are below the scroll, set them to position top
  if(activeProjectTop-activeProjectHeight <= $(window).scrollTop() + feedHeaderHeight) {
	$(".container_left").each(function() { 
	  if($(this).offset().top >= $(window).scrollTop() + feedHeaderHeight) {
		$(this).css({
		  "position":"absolute",
		  "top":"0"
		});
	  }
	});
  }
        
  // if this is the first project, set to the top
  if(activeProject == firstProjectID){
	$(firstProjectID+ " .container_left").css({
	  "position":"absolute",
	  "top":"0"
	});
	$('#logo').css({
	  "position":"absolute",
	  "top":"0"
	});
  }

  // if the active project rail hits the bottom of the project, stick there
  if(activeProjectTop && activeProjectHeight-activeRailHeight+activeProjectTop <= $(window).scrollTop() + feedHeaderHeight) {
	$(activeProject+ " .container_left").css({
	  "position":"absolute",
	  "top":(activeProjectHeight-activeRailHeight)
	  });
        
  // if the active project is within our viewport	
  } else if(activeProjectTop && activeProjectTop <= $(window).scrollTop()+ feedHeaderHeight) {
	// if the rail hits the project top, stick to the top
	if(activeRailTop <= activeProjectTop) {
	  $(activeProject+ " .container_left").css({
		"position":"absolute",
		"top":"0"
	  });
	  console.log('ok');
        	
	// otherwise, move with the scroll
	} else {
	  $(activeProject+ " .container_left").css({
		"position":"fixed",
		"top":feedHeaderHeight
	  });
	  $('#logo').css({
		"position":"absolute",
		"top":"0"
	  });
	}
  }        
}
  function showmenu() {
	$('#menulink').toggle(
	  function() {		  						
		$('#sub-menu-div').addClass('activemenu');
		$('#sub-menu-div').show();
		$("#supersize").css('margin-right', '180px');
		$("#main").css('margin-right', '180px');
		$("#supersize").css('cursor', 'pointer');
		$("#menu-div").css('left', '-75px');

	  },
	  function() {
		$('#sub-menu-div').hide();
		$('#sub-menu-div').removeClass('activemenu');
		$('#sub-menu-div').css('display', 'none');
		$("#supersize").css('margin-right', '0px');
		$("#menu-div").css('left', '0px');
		$("#main").css('margin-right', '0px');
		$("#supersize").css('cursor', 'auto');
	  }
	  );
		return false;
  }
	
$(document).ready(function(){	
  $(document).haAlign();
  $("a.gallery").lightBox({
	overlayBgColor: 		'#fff',
	activeImage: 0
  });

  $("#sub-menu-div ul li a").click(function(){
	var id = $(this).attr("href");
	var speed = $(this).attr("rev");
	$("body").scrollTo("#"+id, 700);
	return false;
  });
  $(".peramalink").click(function(){
	var id = $(this).attr("href");
	$("body").scrollTo("#"+id, 700);
	return false;
  });
  $('.bindex').click(function(){
	var id = $(this).attr("href");
	$("body").scrollTo("#"+id, 700);
	return false;
  });
  $(".bottom_right a").click(function(){
	$("body").scrollTo(0, 700);
	return false;
  });	
  $(".item").each(function(){
	var hght = $(this).find(".container_left").height();
	$(this).find(".container_right").css("min-height", hght+"px");
  });
  $.fn.supersized.options = {  
	startwidth: 1280,  
	startheight: 800,  
	minsize: 1,  
	slideshow: 1,  
	slideinterval: 5000  
  };  
  $('#supersize').supersized();
  showmenu();

  $("#supersize").click(function(){
	if($('#sub-menu-div').is(':visible')) {
	  showmenu();
	  $('#sub-menu-div').hide();
	  $('#sub-menu-div').removeClass('activemenu');
	  $('#sub-menu-div').css('display', 'none');
	  $("#supersize").css('margin-right', '0px');
	  $("#menu-div").css('left', '0px');
	  $("#main").css('margin-right', '0px');
	  $("#supersize").css('cursor', 'pointer');
	} else {
	  showmenu();
	  $("#main").css('cursor', 'auto');
	  $("#supersize").css('cursor', 'auto');
	}
	return false;
  });
  $(".b-share").hover(
	function () {
	  $(".share-link").css('display', 'none');
	  $(".share").css('display', 'block');
	},
	function () {
	  $(".share-link").css('display', 'block');
	  $(".share").css('display', 'none');
	}		  
	);
});
 
$(window).load(function(){
  var theWindow        = $(window),
  $bg              = $(".activeslide"),
  aspectRatio      = $bg.width() / $bg.height();	    			    		
  function resizeBg() {
	if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
	  $bg
	  .removeClass()
	  .addClass('bgheight');
	} else {
	  $bg
	  .removeClass()
	  .addClass('bgwidth');
	}
  }
  theWindow.resize(resizeBg).trigger("resize");
});

$(window).resize(function(){
  $(document).haAlign();
});

$(window).scroll(function(){
  var wy = $(window).scrollTop();
  var off = $("#fixed").offset().top;
  if(off > 30){
	$(".bottom_right").fadeIn();	
  }else{
	$(".bottom_right").fadeOut();			
  }
  $(".container_left").each(function(){
	if ($(this).parent().offset().top <= wy) {
	  $(this).css({
		"position":"fixed", 
		"top":"0px"
	  });
	  if (($(this).parent().offset().top + $(this).parent().height()) - ($(this).height() + 70) <= wy) {
		$(this).css({
		  "position":"absolute", 
		  "top":$(this).parent().height() - ($(this).height() + 70) + "px"
		  });

	  } else {
		$(this).css({
		  "position":"fixed", 
		  "top":"0px"
		});
	  }
	} else {
	  $(this).css({
		"position":"absolute", 
		"top":"0px"
	  });
	}
  });

  if ($(".container_left").parent().offset().top <= wy + 50) {
	$('#logo').css({
	  "position":"absolute"
	});
  } else {
	$('#logo').css({
	  "position":"fixed"
	});
  }
});



