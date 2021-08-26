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
  is = function(t){
    return (u.indexOf(t)!=-1)
    };
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

$(document).ready( function() {
  $('.showFormLogin').click(function(){
    $('body').overlay({
      opacity:0.7
    }).show();
    $('#popup').middle('window',{
      position: 'fixed'
    }).show();
    return false;
  });
        
  $('.vidio').click(function(){
    $('body').overlay({
      opacity:0.7
    }).show();
    $('#popupvideo').middle('window',{
      position: 'fixed'
    }).show();
    return false;
  });

  $('#m5_overlay').live('click',function(){
    $('#popup').hide();
    $('#popupvideo').hide();
    $('#m5_overlay').hide();
  });
  
  $('ul.countries-navi li').each(function() {
    $(this).hover(
      function () {
        $(this).addClass('active');
        $('ul.countries-navi li').removeClass('active');
      }, 
      function () {
        $('ul.countries-navi li').removeClass('active');
        $(this).addClass('active');
      }
      );
    //$('ul.countries-navi li').eq(0).addClass('active');
    $('ul.countries-navi li').eq(1).removeClass('active');
    $('ul.countries-navi li').eq(2).removeClass('active');             
  });
  
  viewmap();
  
  

});

function viewmap() {
  $('.map div').each(function() {
    $(this).hover(
      function () {
        $(this).addClass('activemap');
      }, 
      function () {
        $(this).removeClass('activemap');
      }
      );
  });
}
     