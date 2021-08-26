$(function(){
	mainAnimate();
});

	function start_animate()
	{
		animate_cord($('#icon1,#icon2,#icon3,#icon4,#icon5,#icon6,#icon7,#icon8'),{
				center:$('body').width()/2-100,
				bottom_start : -50,
				bottom_end : 40,
				bottom_center : 80,
				left_start : $('body').width(),
				left:-250,
				speed: 5000,
				time_out : 2300
		});
	}
	
	function animate_cord(a,b)
	{
		var i = 0;
		var int = setInterval(function(){
			if(i < a.size())
			{
				ab(a.eq(i),b)
				i++;
			} else { clearInterval(int); }
		},b['time_out']);
		
		function ab(a,b)
		{
			a.show().css({left:b['left_start'],bottom:b['bottom_start']}).stop()
			.rotate(10).animate({left:b['center'],bottom:b['bottom_center'],rotate:5},b['speed'],'linear')
			.animate({left:b['left'],bottom:b['bottom_end'],rotate:-10},b['speed'],'linear',function(){
				setTimeout(function(){
					ab(a,b);
				},8400);
			})
		}
	}
		
	function procent(a,b,c)
	{
		if(c == 'procent')
			return a/b*100;
		else
			return a*b/100;
	}
		
		
	function resize_img(znak_, bw, bh, znak_left_pr)
	{	
		var r = {
			z1 : procent(bw,znak_left_pr['z1'])	,
			z2 : procent(bw,znak_left_pr['z2'])	,
			z3 : procent(bw,znak_left_pr['z3'])	,
			z4 : procent(bw,znak_left_pr['z4'])	,
			z5 : procent(bw,znak_left_pr['z5'])	,
			z6 : procent(bw,znak_left_pr['z6'])	
		}
		return r;
	}
	
	function loading(array)
	{
		for(var i=0; i<array.length; i++ )
		{
			array[i].show();
		}
		$('#load').hide();
	}
		
	function mainAnimate(){
		var bw = $('body').width();
		var bh = $('body').height();
		
		var layer_ = {bg : $('#bg1'),l0 : $('#bigbonus'),l1 : $('#lug1'),l2 : $('#lug2'),l3 : $('#lug3')}
		var layer_width = {bg : layer_['bg'].width()/2,l0 : layer_['l0'].width()/2,l1 : layer_['l1'].width()/2,l2 : layer_['l2'].width()/2,l3 : layer_['l3'].width()/2}
		var znak_ = {z1 : $('#znak1'),z2 : $('#znak2'),z3 : $('#znak3'),z4 : $('#znak4'),z5 : $('#znak5'),z6 : $('#znak6')}
		var znak_left_pr = {z1 : -49.251111,z2 : -20.379111,z3 :  14.054111,z4 :  37.245111,z5 : -35.137111,z6 :  23.190111}
		var znak_left = resize_img(znak_, bw, bh, znak_left_pr);
		var x = 0;
		
		function get_scene(x)
		{
			layer_['bg'].css({marginLeft:((layer_width['bg'])+procent(110,x*2))*-1});
			layer_['l3'].css({marginLeft:((layer_width['l3'])+procent(60,x*2))*-1});
			layer_['l1'].css({marginLeft:((layer_width['l1'])+procent(40,x*2))*-1});
			layer_['l2'].css({marginLeft:((layer_width['l2'])-procent(20,x*2))*-1});
			layer_['l0'].css({marginLeft:((layer_width['l0'])-procent(10,x*2))*-1});
			znak_['z1'].css({marginLeft:(znak_left['z1']-procent(40,x*2))*1});
			znak_['z2'].css({marginLeft:(znak_left['z2']-procent(40,x*2))*1});
			znak_['z3'].css({marginLeft:(znak_left['z3']-procent(40,x*2))*1});
			znak_['z4'].css({marginLeft:(znak_left['z4']-procent(40,x*2))*1});
			znak_['z5'].css({marginLeft:(znak_left['z5']+procent(20,x*2))*1});
			znak_['z6'].css({marginLeft:(znak_left['z6']+procent(20,x*2))*1});
		}
		
		$(document).mousemove(function(e){
			x = (e.pageX-(bw/2))*100/bw;
			get_scene(x);
		});
		
		$(window).load(function(){
			var loading_obj = [znak_['z1'],znak_['z2'],znak_['z3'],znak_['z4'],znak_['z5'],znak_['z6'],$('.title'),layer_['l0']];
			loading(loading_obj);
			get_scene(x);	
			start_animate();
			
		}).resize(function(){
			znak_left = resize_img(znak_, $('body').width(), bh, znak_left_pr);	
			get_scene(x);
		});
	}
	
