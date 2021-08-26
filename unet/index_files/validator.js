function isType(val, type){
	var format = new Array();
	format["date"] = "dd-mm-yyyy";
	format["short_time"] = "hh:mm";
	format["time"] = "hh:mm:ss";
	format["translit"] = "charset from 'a' to 'z', '_' and '-'";
	if (window.RegExp) {
		switch (type){
			case "date": query = "^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$"; break;
			case "email": query = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-\.])+\.)+([a-zA-Z0-9]{2,4})+$"; break;
			case "short_time": query = "^[0-9]{1,2}:[0-9]{2}$"; break;
			case "time": query = "^[0-9]{1,2}:[0-9]{2}:[0-9]{2}$"; break;
			case "translit": query = "^[a-zA-Z0-9-_]+$"; break;
			default: query = ".*";
		}
		var r = new RegExp(query);
		if (r.test(val)){
			return true;
		} else {
			//alert("Incorect "+type+" format ("+format[type]+")");
			return false;
		}
	} else {
		if (val == ''){
			//alert("Incorect "+type+" format ("+format[type]+")");
			return false;
		}
	}
	return true;
}