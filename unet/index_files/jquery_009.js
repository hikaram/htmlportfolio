jQuery.iPikaChoose={
	build:function(user_options){
		var defaults={
			show_captions:false,slide_enabled:true,auto_play:false,show_prev_next:false,slide_speed:5000,thumb_width:90,thumb_height:60,
			buttons_text:{play:"",stop:"",previous:"Previous",next:"Next"}
			,delay_caption:false,user_thumbs:false
		};
		return jQuery(this).each(function(){
			function LoadImages(){
				jQuery(this).bind("load",function(){
					jQuery(this).parent('div').prev().remove();
					images=jQuery(this).parents('ul').find('img');
					var w=jQuery(this).width();
					var h=jQuery(this).height();
					if(w===0){
						w=jQuery(this).attr("width")
					}
					if(h===0){
						h=jQuery(this).attr("height")
					}
					var rw=options.thumb_width/w;
					var rh=options.thumb_height/h;
					var ratio;
					if(rw<rh){
						ratio=rh;
						var left=((w*ratio-options.thumb_width)/2)*-1;
						left=Math.round(left);
						jQuery(this).css({left:left})
					}else{
						ratio=rw;
						var top=0;
						jQuery(this).css({top:top})
					}
					var width=Math.round(w*ratio);
					var height=Math.round(h*ratio);
					jQuery(this).css("position","relative");
					jQuery(this).width(width).height(height);
					var imgcss={width:width,height:height};
					jQuery(this).css(imgcss);
					jQuery(this).hover(
						function(){jQuery(this).fadeTo(250,1)},
						function(){
							if(!jQuery(this).hasClass("pika_selected")){
								jQuery(this).fadeTo(250,0.8)
							}
						}
					);
					jQuery(this).fadeTo(250,0.8);
					if(jQuery(this).hasClass('pika_first')){
						jQuery(this).trigger("mouseover",["auto"])
					}
				}
				);
				var newImage=jQuery(this).clone(true).insertAfter(this);
				jQuery(this).hide();
				images=ulist.children('li').children('img')
			}
			var options=jQuery.extend(defaults,user_options);
			var images=jQuery(this).children('li').children('img');
			images.fadeOut(1);
			var ulist=jQuery(this);
			images.each(LoadImages);
			
			jQuery(this).before("<div class='pika_main'></div>");
			var main_div=jQuery(this).prev(".pika_main");
			jQuery(this).before("<div class='pika_compare'><a href='' onclick='$(this).css(\"background-image\", \"url(/img/compare.jpg)\"); addCompare("+options.mit_id+"); return false;'>???????? ? ?????????</a></div>");
			if(options.slide_enabled){
				main_div.append("<div class='pika_play'></div>");
				var play_div=jQuery(this).prev(".pika_main").children(".pika_play");
				play_div.html("<a class='pika_play_button'>"+options.buttons_text.play+"</a><a class='pika_stop_button'>"+options.buttons_text.stop+"</a>");
				play_div.fadeOut(1);
				var play_anchor=play_div.children('a:first');
				var stop_anchor=play_div.children('a:last')
			}
			main_div.append("<div class='pika_subdiv'></div>");
			var sub_div=main_div.children(".pika_subdiv");
			sub_div.append("<div class='pika_back_img'><img /></div><div class='pika_main_img'><img  /></div>");
			var main_img=sub_div.children("div:last").children("img:last");
			var back_img=sub_div.children("div:first").children("img:first"); 
			sub_div.append("<div class='pika_prev_hover'></div><div class='pika_next_hover'></div>");
			var prevHover=sub_div.find('.pika_prev_hover');
			var nextHover=sub_div.find('.pika_next_hover');
			prevHover.hide();
			nextHover.hide();
			if(options.show_captions){
				main_div.append("<div class='pika_caption'></div>");
				var caption_div=main_div.children(".pika_caption")
			}
			
			jQuery(this).after("<div class='pika_navigation'></div>");
			var navigation_div=jQuery(this).next(".pika_navigation");
			navigation_div.prepend("<a>"+options.buttons_text.previous+"</a> :: <a>"+options.buttons_text.next+"</a>");
			var previous_image_anchor=navigation_div.children('a:first');
			var next_image_anchor=navigation_div.children('a:last');
			if(!options.show_prev_next){
				navigation_div.css("display","none")
			}
			var playing=options.auto_play;
			main_img.wrap("<a></a>");
			var main_link=main_img.parent("a");
			function activate(){
				images.bind("mouseover",image_click);
				if(options.slide_enabled){
					if(options.auto_play){
						playing=true;
						play_anchor.hide();
						stop_anchor.show()
					}else{
						play_anchor.show();
						stop_anchor.hide()
					}
				}
				ulist.children("li:last").children("img").addClass("pika_last");
				ulist.children("li:first").children("img").addClass("pika_first");
				ulist.children("li").each(
					function(){jQuery(this).children("span").hide()}
				);
				var divcss={width:options.thumb_width+"px",height:options.thumb_height+"px","list-style":"none",overflow:"hidden"};
				var licss={"list-style":"none",overflow:"hidden"};
				images.each(function(){
					jQuery(this).parent('li').css(licss);
					jQuery(this).wrap(document.createElement("div"));
					jQuery(this).parent('div').css(divcss);
					if(jQuery(this).attr('complete')===true&&jQuery(this).css('display')=="none"){
						jQuery(this).css({display:'inline'})}
				});
				previous_image_anchor.bind("mouseover",previous_image);
				prevHover.bind("mouseover",previous_image);
				next_image_anchor.bind("mouseover",next_image);
				nextHover.bind("mouseover",next_image);
				sub_div.mousemove(function(e){
					var w=sub_div.width();
					var x=e.pageX-sub_div.offset().left;
					if(x<w*0.3){
						prevHover.fadeIn('fast')
					}else{
						prevHover.fadeOut('fast')
					}
					if(x>w*0.7){
						nextHover.fadeIn('fast')
					}else{
						nextHover.fadeOut('fast')
					}
				});
				sub_div.mouseleave(function(){
					prevHover.fadeOut('fast');
					nextHover.fadeOut('fast')
				})
			}
			function image_click(event,how){
				if(how!="auto"){
					if(options.slide_enabled){
						stop_anchor.hide();
						play_anchor.show();
						playing=false
					}
					main_img.stop();
					main_img.dequeue();
					if(options.show_captions){
						caption_div.stop();
						caption_div.dequeue()
					}
				}
				if(options.user_thumbs){
					var image_source=jQuery(this).attr("ref")
				}else{
					var image_source=this.src
				}
				var image_link=jQuery(this).attr("rel");
				var image_caption=jQuery(this).parent().next("span").html();
				images.filter(".pika_selected").fadeTo(250,0.8);
				images.filter(".pika_selected").removeClass("pika_selected");
				jQuery(this).fadeTo(250,1);
				jQuery(this).addClass("pika_selected");
				if(options.show_captions){
					if(options.delay_caption){
						caption_div.fadeTo(800,0)
					}
					caption_div.fadeTo(500,0,function(){
						caption_div.html(image_caption);
						caption_div.fadeTo(800,1)
					})
				}
				var delay=100;
				if(main_img.attr('opacity')<0.8){
					delay=500
				}
				back_img.attr("src",main_img.attr("src"));
				main_img.fadeTo(delay,0.00,function(){
					main_img.unbind('load');
					main_img.bind('load',function(){
						main_img.fadeTo(800,1,function(){
							if(playing){
								jQuery(this).animate({opactiy:1},options.slide_speed,
									function(){
										if(playing){
											next_image_anchor.trigger("mouseover",["auto"])
										}
									})
							}
							back_img.attr("src",main_img.attr("src"))
						})
					});
					main_img.attr("src",image_source);
					main_link.attr("href",image_link)
				})
			}
			function next_image(event,how){
				if(images.filter(".pika_selected").hasClass("pika_last")){
					images.filter(":first").trigger("mouseover",how)
				}else{
					images.filter(".pika_selected").parents('li').next('li').find('img').trigger("mouseover",how)
				}
			}
			function previous_image(event,how){
				if(images.filter(".pika_selected").hasClass("pika_first")){
					images.filter(":last").trigger("mouseover",how)
				}else{
					images.filter(".pika_selected").parents('li').prev('li').find('img').trigger("mouseover",how)
				}
			}
			function play_button(){
				main_div.hover(
					function(){play_div.fadeIn(400)}
					,function(){play_div.fadeOut(400)}
				);
				play_anchor.bind("mouseover",function(){
					main_img.stop();
					main_img.dequeue();
					if(options.show_captions){
						caption_div.stop();
						caption_div.dequeue()
					}
					playing=true;
					next_image_anchor.trigger("mouseover",["auto"]);
					jQuery(this).hide();
					stop_anchor.show()
				});
				stop_anchor.bind("mouseover",function(){
					playing=false;
					jQuery(this).hide();
					play_anchor.show()
				})
			}
			if(options.slide_enabled){
				play_button()
			}
			activate()
		})
	}
};
jQuery.fn.PikaChoose=jQuery.iPikaChoose.build;