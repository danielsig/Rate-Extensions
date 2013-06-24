function iconClicked()
{
	chrome.management.getBriefExtensionList( apiCallback );
}

function apiCallback(extensions)
{
	console.log("Sending first 3 extensions...");
	console.log( postAjax( [extensions[0], extensions[1], extensions[2]], webServiceCallback) );
	console.log("Done sending!");
}
function webServiceCallback(response)
{
	console.log("Response: " + response);
}
function postAjax(json, handler) {
	var request =
	{
  		type: "POST"
  		,url: 'http://google.com/'
  		,data: {
  			"json": json
  			,success: handler
  		}
	};
	$.ajax( request );
	return request;
}


chrome.browserAction.onClicked.addListener( iconClicked );
