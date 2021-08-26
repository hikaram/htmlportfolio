<!--
SSS_faq = {
	init : function() {
		$('div.faq .punk2').click(function() { SSS_faq.toggle(this) });
	},
	
	toggle : function(elt) {
		$(elt).toggleClass('punk1');
		$(elt).siblings('.answer').slideToggle('fast');
	}
}

$(function() { 
	SSS_faq.init();
});

SSS_faq_main = {
	init : function() {
		$('div.faq_main .question_main').click(function() { SSS_faq_main.toggle(this) });
	},
	
	toggle : function(elt) {
		$(elt).toggleClass('active_faq_main');
		$(elt).siblings('.answer_main').slideToggle('fast');
	}
}

$(function() { 
	SSS_faq_main.init();
});
//-->