function RateExtension(){
	self = this;

	self.itsExtensions = undefined;										// Extension Json returned from Chrome
	self.itsTab = undefined;											// Tab identification info
	self.itsResult = undefined;											// Web result Json
	self.itsPath = "http://rate-extension.appspot.com/api/v1/post"		// Path to the webservice
	self.itsErrors = [];

	// saves the current tab
	self.setTab = function(inTab){
		self.itsTab = inTab;
	};
	
	// used to store retrieve the id of the tab
	self.getTab = function(){
		var rslt = self.itsTab;
		return rslt;
	};

	// saves the extension json returned from chrome
	// and calles the web service
	self.setExtensions = function(inExtension){
		self.itsExtensions = inExtension;
		self.postAjax();
	};

	// returns a copy of the extension json returned from chrome
	// waits for it to hold a value for five seconds cause of callback to callback issue
	self.getExtensions = function(){
		return JSON.stringify(self.itsExtensions);
	};

	// returns a copy of the web service results
	self.getResults = function(){
		var rslt = itsResult;
		return rslt;
	};

	// returns the error array
	self.getErrors = function(){
		var err = self.itsErrors;
		return err;
	}
	// Opens a tab if enter
	self.iconClicked = function(){
		if(self.itsTab === undefined){
			console.log("Opening a tab");
			chrome.tabs.create({active:true, url:"rateDefault.html"}, self.setTab);
		}else{
			console.log("Refreshing the tab content");
			chrome.tabs.reload(self.itsTab.id);

		}
			
	};

	// web request success handler
	self.xhrSuccess = function(data){
		self.itsResult = data;
	};

	//handler if the web request fails
	self.xhrFail = function(xhr, status, err){
		console.log("Ajax Request Failed:" + status);
		console.log(err);
		self.itsErrors.push("Failed contacting web service");
		self.itsResult = {};
	};

	// post to webservice
	self.postAjax = function(){
		console.log("sending ajax");
		theData = {
		  dataType: "json",
		  url: self.itsPath,
		  data: self.getExtensions(),
		  success: self.xhrSuccess,
		  error: self.xhrFail,
		  type: "POST"
		}
		$.ajax(theData);
	};

	// object initilazion code 
	self.initialize = function(){
		//ATT: 	using the generic function to retrieve information since not 
		// 		all developers have getBriefExtensionList() working on their chromes
		//		The function is however working on our linux build.
		chrome.management.getAll(self.setExtensions);
		//chrome.management.getBriefExtensionList( self.setExtensions );
	};

	//initialize the object and return
	self.initialize();
	return self;

}

theExtension = RateExtension();

//icon click listener
chrome.browserAction.onClicked.addListener( theExtension.iconClicked );

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.run)
      sendResponse({extensions: theExtension.getResults(), errors: theExtension.getErrors()});
  });

console.log("On extension load finished");