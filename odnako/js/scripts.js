/* scripts */
var cssFix = function(){
 var u = navigator.userAgent.toLowerCase(),
 addClass = function(el,val){
    if(!el.className) {
     el.className = val;
    } else {
     var newCl = el.className;
     newCl+=(" "+val);
     el.className = newCl;
    }
 },
 is = function(t){return (u.indexOf(t)!=-1)};
 addClass(document.getElementsByTagName('html')[0],[
    (!(/opera|webtv/i.test(u))&&/msie (\d)/.test(u))?('ie ie'+RegExp.$1)
     :is('firefox/2')?'gecko ff2'
     :is('firefox/3')?'gecko ff3'
     :is('gecko/')?'gecko'
     :is('opera/9')?'opera opera9':/opera (\d)/.test(u)?'opera opera'+RegExp.$1
     :is('konqueror')?'konqueror'
     :is('applewebkit/')?'webkit safari'
     :is('mozilla/')?'gecko':'',
    (is('x11')||is('linux'))?' linux'
     :is('mac')?' mac'
     :is('win')?' win':''
 ].join(" "));
}();


var is_chrome = false, chrome_version = false;
if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
   is_chrome = true;
   chrome_version = navigator.userAgent.replace(/^.*Chrome\/([\d\.]+).*$/i, '$1')
}

$(function(){
	pages();
});

function pages()
{
	var pages_rul = $('#pages_rul');
	$('.pages a').not('.pages a.active, .pages a.prev, .pages a.next').hover(function(){
		if($(this).parent().is('.page_blog'))
		{
			var offset = $(this).offset();
			if(!pages_rul.length)
			{
				$('body').append('<img src="images/pages_rul.gif" id="pages_rul"/>');
				pages_rul = $('#pages_rul')
			}
			pages_rul.show().css({
				left:offset.left+5,
				top:offset.top+$(this).outerHeight()+4
			});
		}
	},function(){
		pages_rul.hide();
	})
}

$(document).ready( function() {
        $('.showFormLogin').click(function(){
          $('body').overlay({opacity:0.7}).show();
          $('#loginform').middle('window',{position: 'fixed'}).show();
          return false;
        });
        $('.closelogin').live('click',function(){
          $('#loginform').hide();
          $('#m5_overlay').hide();
        });

          $('.showFormReg').click(function(){
          $('body').overlay({opacity:0.7}).show();
          $('#regform').middle('window',{position: 'fixed'}).show();
          return false;
        });
        $('.closereg').live('click',function(){
          $('#regform').hide();
          $('#m5_overlay').hide();
        });
        $('#m5_overlay').live('click',function(){
          $('#loginform').hide();
          $('#regform').hide();
          $('#m5_overlay').hide();
        });


      });
     