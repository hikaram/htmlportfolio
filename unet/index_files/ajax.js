
function ajaxLib()
{
	this.req = null;
	this.READY_STATE_COMPLETE = 4;
	
	function initRequest()
	{
		var xRequest = null;
		
		if (window.XMLHttpRequest)
		{ xRequest = new XMLHttpRequest(); }
		else if (window.ActiveXObject)
		{
			var a_objects = [
							'MSXML2.XMLHTTP.6.0',
							'MSXML2.XMLHTTP.5.0',
							'MSXML2.XMLHTTP.4.0',
							'MSXML2.XMLHTTP.3.0',
							'MSXML2.XMLHTTP',
							'Microsoft.XMLHTTP'
							];
			for (var i = 0, length = a_objects.length; i < length; ++i) {
				try
				{ xRequest = new ActiveXObject(a_objects[i]); break; }
				catch(e) {}
			}
		}
		
		return xRequest;
	}

	this.sendRequest = function(url, onReadyState, params, httpMethod)
	{
		if (!httpMethod)
		{ httpMethod = "GET"; }
		
		this.req = initRequest();
		if (this.req)
		{
			if (onReadyState != '')
			{ this.req.onreadystatechange = eval(onReadyState); }
			this.req.open(httpMethod,url,true);
			this.req.setRequestHeader("Content-Type","text/xml");
			this.req.send(params);
		}
	}
}
