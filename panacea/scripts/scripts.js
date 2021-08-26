// JavaScript Document
jQuery.fn.extend({
    disableSelection : function() {
            this.each(function() {
                    this.onselectstart = function() { return false; };
                    this.unselectable = "on";
                    jQuery(this).css('-moz-user-select', 'none');
            });
    },
    enableSelection : function() {
            this.each(function() {
                    this.onselectstart = function() {};
                    this.unselectable = "off";
                    jQuery(this).css('-moz-user-select', 'auto');
            });
    }
});

(function ($) {
$.fn.hAlign = function() {
	return this.each(function(i){
	var ah = $(this).width();
	var ph = $(this).parent().width();
	var mh = (ph - ah) / 2;
	$(this).css('margin-left', mh);
	});
};
})(jQuery);

(function ($) {
$.fn.vAlign = function() {
	return this.each(function(i){
	var ah = $(this).height() + parseInt($(this).css('paddingTop')) + parseInt($(this).css('paddingBottom'));
	var ph = $(this).parent().height() + parseInt($(this).parent().css('paddingTop')) + parseInt($(this).parent().css('paddingBottom'));
	var mh = (ph - ah) / 2;
	if (mh < 0) {
		mh = 0;
	}
	$(this).css('margin-top', mh);
	});
};
})(jQuery);

jQuery(function( $ ){
	//$.scrollTo( 0 );
	$("#menu .nav a, .head .nav a, .banner_02 a").click(function(){
		$.scrollTo( this.hash, 800, { easing:'swing' });
		return false;
	});
	$(".up").click(function(){
		$.scrollTo( 0, 800, { easing:'swing' } );
		return false;
	});
});

$(document).ready(function(){
	$("#slider").anythingSlider();
	$(".anythingControls ul").hAlign();
	
	$("#music .mp3 .small_player_icon").disableSelection();
	$("#music .mp3 .small_player_icon").live('click', function(){
		$(".on .small_player").stop().animate({"width":"53px"}, 300);
		$(".on .body").stop().animate({"width":"1px"}, 300, function(){
			$(".on .small_player").hide();
			$("#music .mp3 .small_player_icon").removeClass("on");
		});
		$(this).find(".small_player").show();
		$(this).find(".small_player").stop().animate({"width":"212px"}, 350);
		$(this).find(".body").stop().animate({"width":"160px"}, 350, function(){
			$(this).parent().parent().addClass("on");
		});
		return false;
	});
	$("#music .mp3").live('click', function(){
		$("#music .player").removeClass("on");
		$("#music .play").removeClass("pause");
		try {
			audio.pause();
			audio.currentTime = 0;
			$("#music .more div.left .player div strong").css({"width":"0px"});
		}
		catch(err) {
		}
		if ($(this).is(".on")) {
			$(this).removeClass("on")
			$(this).next().slideUp();
			return false;
		}
		$("#music .mp3").each(function(){
			if ($(this).is(".on")) {
				$(this).removeClass("on")
				$(this).next().slideUp();
			}
		});
		$(this).addClass("on");
		$(".on .small_player").stop().animate({"width":"53px"}, 300);
		$(".on .body").stop().animate({"width":"1px"}, 300, function(){
			$(".on .small_player").hide();
			$("#music .mp3 .small_player_icon").removeClass("on");
		});
		$(this).next().slideDown(function(){
			var top = $(this).prev().offset().top + 1;
			$.scrollTo( top, 800, { easing:'swing' } );
		});
		$("#music .more div.right div p").hAlign();
		$("#music .more div.right div p").vAlign();
		return false;
	});
	$("#music .mp3 .close").live('click', function(){
		try {
			audio.pause();
		}
		catch(err) {
		}
		$(this).parent().removeClass("on")
		$(this).parent().next().slideUp();
		return false;
	});
	$("#music .volume").each(function(){
		$(this).append('<span class="v25 on"></span><span class="v50 on"></span><span class="v75 on"></span><span class="v100 on"></span>')
	});
	$("#music .player .play").each(function(){
		$(this).append('<img src="images/player_control.png" alt="" />')
	});
	$("#music .mp3 .small_player_icon .small_player .body").each(function(){
		$(this).append('<div><strong></strong></div>')
	});
	$("#music .more div.left .player").each(function(){
		$(this).append('<div><strong><em></em></strong></div>')
	});
	
	var clicking = false;
	var progres = false;
	var v1 = 0;
	var v2 = 0;
	var v3 = 0;
	var v4 = 0;
	var interval = false;
	var controls = {
		audio: $("audio"),
		progress: true,
		buffered: true,
		duration: true,
		currentTime: true,
		playpause: $(".small_player_icon, .player")                 
	};
	var audio = controls.audio[0];
	$(".small_player_icon").live('click', function(){
		if ($(this).hasClass("on")) {
		} else {
			try {
				audio.currentTime = 0;
			}
			catch(err) {
			}
		}
		clearTimeout(interval);
		var obj = $(this).find("strong");
		$("#music .player").removeClass("on");
		$("#music .play").removeClass("pause");
		$("#music .more div.left .player div strong").css({"width":"0px"});
		$("#music .more div.left .player div strong em").html("00:00");
		try {
			audio.pause();
			controls = {
				audio: $(this).find("audio"),
				playpause: $(this)
			};
			audio = controls.audio[0];
			audio.play();
			interval = setInterval(function() {
				var ad = audio.duration;
				var ac = audio.currentTime;
				obj.css({"width":(154*ac) / ad + "px"});
				if (audio.ended) {
					obj.css({"width":"0px"});
					audio.currentTime = 0;
					audio.pause();
					$(".on .small_player").stop().animate({"width":"53px"}, 300);
					$(".on .body").stop().animate({"width":"1px"}, 300, function(){
						$(".on .small_player").hide();
						$("#music .mp3 .small_player_icon").removeClass("on");
					});
				}
			}, 100);
		}
		catch(err) {
		}
		return false;
    });
	$(".small_player_icon .body div").live('mousedown', function(e){
		progres = true;
		clearTimeout(interval);
		var x = e.pageX;
		var tx = $(this).offset().left;
		var ad = audio.duration;
		$(this).find("strong").css({"width":(x - tx) + "px"});
		audio.currentTime = ((x - tx)*ad) / 154;
		return false;
    });
	$(".small_player_icon .body div").live('mouseup', function(e){
		progres = false;
		var obj = $(this).find("strong");
		var x = e.pageX;
		var tx = $(this).offset().left;
		var ad = audio.duration;
		interval = setInterval(function() {
			var ad = audio.duration;
			var ac = audio.currentTime;
			obj.css({"width":(154*ac) / ad + "px"});
		}, 100);
		audio.currentTime = ((x - tx)*ad) / 154;
		return false;
	});
	$(".small_player_icon .body div").live('mouseleave', function(e){
		progres = false;
		return false;
	});
	$(".small_player_icon .body div").live('mousemove', function(e){
		if (progres == true) {
			var x = e.pageX;
			var tx = $(this).offset().left;
			$(this).find("strong").css({"width":(x - tx) + "px"});
		}
		return false;
	});
	$(".play").live('click', function(){
		if ($(this).is(".pause")) {
			return false;
		} else {
			var obj = $(this).parent().parent().find("div strong");
			$(this).addClass("pause");
			$(this).parent().parent().addClass("on");
			$(".on .small_player").stop().animate({"width":"53px"}, 300);
			$(".on .body").stop().animate({"width":"1px"}, 300, function(){
				$(".on .small_player").hide();
				$("#music .mp3 .small_player_icon").removeClass("on");
			});
			audio.pause();
			controls = {
				audio: $(this).parent().parent().find("audio"),
				playpause: $(this)
			};
			audio = controls.audio[0];
			audio.play();
			interval = setInterval(function() {
				var ad = audio.duration;
				var ac = audio.currentTime;
				obj.css({"width":(312*ac) / ad + "px"});
				obj.find("em").html(formatTime(audio.currentTime, controls.hasHours));
				if (audio.ended) {
					$("#music .more div.left .player").removeClass("on");
					$("#music .more div.left .player .play").removeClass("pause");
					audio.currentTime = 0;
					audio.pause();
				}
			}, 100);
		}
		if ($(this).parent().parent().hasClass("small_player_icon")) {
			audio.pause();
		}
		return false;
    });
	$(".pause").live('click', function(){
		clearTimeout(interval);
		$(this).removeClass("pause");
		audio.pause();
		return false;
    });
	$("#music .more div.left .player div").live('mousedown', function(e){
		progres = true;
		clearTimeout(interval);
		var x = e.pageX;
		var tx = $(this).offset().left;
		var ad = audio.duration;
		$(this).find("strong").css({"width":(x - tx) + "px"});
		return false;
    });
	$("#music .more div.left .player div").live('mouseup', function(e){
		progres = false;
		var obj = $(this).find("strong");
		var x = e.pageX;
		var tx = $(this).offset().left;
		var ad = audio.duration;
		interval = setInterval(function() {
			var ad = audio.duration;
			var ac = audio.currentTime;
			obj.css({"width":(312*ac) / ad + "px"});
			obj.find("em").html(formatTime(audio.currentTime, controls.hasHours));
			if (audio.ended) {
				$("#music .more div.left .player").removeClass("on");
				$("#music .more div.left .player .play").removeClass("pause");
				audio.currentTime = 0;
				audio.pause();
			}
		}, 100);
		audio.currentTime = ((x - tx)*ad) / 312;
		return false;
	});
	$("#music .more div.left .player div").live('mouseleave', function(e){
		progres = false;
		return false;
	});
	$("#music .more div.left .player div").live('mousemove', function(e){
		if (progres == true) {
			var x = e.pageX;
			var tx = $(this).offset().left;
			$(this).find("strong").css({"width":(x - tx) + "px"});
		}
		return false;
	});
	$("#music .volume").live('mousedown', function(e){
		if ($(this).parent().parent().is(".player.on")) {
			var x = e.pageX;
			clicking = true;
			v1 = $(this).find(".v25").offset().left;
			v2 = $(this).find(".v50").offset().left;
			v3 = $(this).find(".v75").offset().left;
			v4 = $(this).find(".v100").offset().left;
			$(this).find("span").removeClass("on");
			if (x < v1) {
				$(this).find("span").removeClass("on");
				audio.volume = 0;
			} else if (x < v2) {
				$(this).find(".v25").addClass("on");
				audio.volume = 0.25;
			} else if (x < v3) {
				$(this).find(".v25, .v50").addClass("on");
				audio.volume = 0.50;
			} else if (x < v4) {
				$(this).find(".v25, .v50, .v75").addClass("on");
				audio.volume = 0.75;
			} else {
				$(this).find("span").addClass("on");
				audio.volume = 1;
			}
		} else if ($(this).parent().is(".small_player")) {
			var x = e.pageX;
			clicking = true;
			v1 = $(this).find(".v25").offset().left;
			v2 = $(this).find(".v50").offset().left;
			v3 = $(this).find(".v75").offset().left;
			v4 = $(this).find(".v100").offset().left;
			$(this).find("span").removeClass("on");
			if (x < v1) {
				$(this).find("span").removeClass("on");
				audio.volume = 0;
			} else if (x < v2) {
				$(this).find(".v25").addClass("on");
				audio.volume = 0.25;
			} else if (x < v3) {
				$(this).find(".v25, .v50").addClass("on");
				audio.volume = 0.50;
			} else if (x < v4) {
				$(this).find(".v25, .v50, .v75").addClass("on");
				audio.volume = 0.75;
			} else {
				$(this).find("span").addClass("on");
				audio.volume = 1;
			}
		} else {
			return false;
		}
		return false;
	});
	$("#music .volume").live('mouseup', function(e){
		clicking = false;
		return false;
	});
	$("#music .volume").live('mouseleave', function(e){
		clicking = false;
		return false;
	});
	$("#music .volume").live('click', function(e){
		return false;
	});
	$("#music .volume").live('mousemove', function(e){
		if ($(this).parent().parent().is(".player.on")) {
			if (clicking == true) {
				var x = e.pageX;
				$(this).find("span").removeClass("on");
				if (x < v1) {
					$(this).find("span").removeClass("on");
					audio.volume = 0;
				} else if (x < v2) {
					$(this).find(".v25").addClass("on");
					audio.volume = 0.25;
				} else if (x < v3) {
					$(this).find(".v25, .v50").addClass("on");
					audio.volume = 0.50;
				} else if (x < v4) {
					$(this).find(".v25, .v50, .v75").addClass("on");
					audio.volume = 0.75;
				} else {
					$(this).find("span").addClass("on");
					audio.volume = 1;
				}
			}
		} else if ($(this).parent().is(".small_player")) {
			if (clicking == true) {
				var x = e.pageX;
				$(this).find("span").removeClass("on");
				if (x < v1) {
					$(this).find("span").removeClass("on");
					audio.volume = 0;
				} else if (x < v2) {
					$(this).find(".v25").addClass("on");
					audio.volume = 0.25;
				} else if (x < v3) {
					$(this).find(".v25, .v50").addClass("on");
					audio.volume = 0.50;
				} else if (x < v4) {
					$(this).find(".v25, .v50, .v75").addClass("on");
					audio.volume = 0.75;
				} else {
					$(this).find("span").addClass("on");
					audio.volume = 1;
				}
			}
		} else {
			return false;
		}
		return false;
	});
	
	function formatTime(time, hours) {
		if (hours) {
			var h = Math.floor(time / 3600);
			time = time - h * 3600;
						
			var m = Math.floor(time / 60);
			var s = Math.floor(time % 60);
						
			return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2);
		} else {
			var m = Math.floor(time / 60);
			var s = Math.floor(time % 60);
						
			return m.lead0(2) + ":" + s.lead0(2);
		}
	}
				
	Number.prototype.lead0 = function(n) {
		var nz = "" + this;
		while (nz.length < n) {
			nz = "0" + nz;
		}
		return nz;
	};
	
	$("#menu .nav a, .head .nav a, .banner_02 a").hover(function(){
		$(this).stop().animate({"color":"#32baf6"}, 350);
	}, function(){
		$(this).stop().animate({"color":"#aeb1b4"}, 350);
	});
	
	/*$("#info_block .left .right  #gallery img:first").show();
	$("#info_block .left .right  #gallery img").live('click', function(){
		if ($(this).next().is("img")) {
			$(this).fadeOut(function(){
				$(this).next().fadeIn();
			});
		} else {
			$(this).fadeOut(function(){
				$("#info_block .left .right  #gallery img:first").fadeIn();
			});
		}
	});*/
	$('#music .more div.right center > a').click(function(){
		$(this).next().fadeToggle("normal");
		$(this).toggleClass('active');
		return false;
	});
	$("#music .more div.right center span").hide();
	$("#gallery a").fancybox({
		cyclic: true,
		overlayOpacity:0.9,
		overlayColor:"#000"
	});

});

$(window).load(function(){
});

$(window).resize(function(){
});