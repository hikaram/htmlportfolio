$(document).ready(function() {
	MarketStat.send();
})

MarketStat = {
	data: new Array(),
	addItemStat: function(mit_id, type){
		if (this.data[type] == undefined){
			this.data[type] = new Array();
		}
		this.data[type].push(mit_id);
	},
	send: function(){
		var post_data = {};
		for (i in MarketStat.data){
			for (n in MarketStat.data[i]){
				post_data['data['+i+']['+n+']'] = MarketStat.data[i][n];
			}
		}
		post_data.referer = document.referrer;
		$.ajax({
			type: "POST",
			cache: false,
			dataType:'json',
			url: '/json/stat/',
			data: post_data,
			success: function(data) {
				//alert(MarketStat.data);
			},
			error: function(data) {
				//alert(data.data);
			}
		});
	}
}