function RateExtension(){
	self = this;

	self.itsExtensions = undefined;						// Extension Json returned from Chrome
	self.itsTab = undefined;							// Tab identification info
	self.itsResult = undefined;							// Web result Json
	self.itsPath = "http://example.com/api/get/"		// Path to the webservice

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
	self.setExtensions = function(inExtension){
		self.itsExtensions = inExtension;
	};

	// returns a copy of the extension json returned from chrome
	self.getExtensions = function(){
		var rslt = self.itsExtensions;
		return rslt;
	};

	// returns a copy of the web service results
	self.getResults = function(){
		var rslt = itsResult;
		return rslt;
	};

	// Opens a tab if enter
	self.iconClicked = function(){
		// todo: add code that checks if the tab is open and prevents opening another
		// and then reloads content in that tab
		console.log("open the tab");
		chrome.tabs.create({active:true, url:"rateDefault.html"});
		
	};

	//experimental
	// web request success handler
	self.xhrSuccess = function(data){
		self.itsResult = data;
	};

	//experimental
	//handler if the web request fails
	self.xhrFail = function(xhr, status, err){
		//for now the call will fail and we set rslt = extensions for testing purposes
		self.itsResult = self.itsExtensions;
		console.log("Ajax Request Failed:" + status);
		console.log(err)
		//todo: set some error message in itsResult

		
		
	};

	//experimental
	// post to webservice
	self.postAjax = function(){
		$.ajax({
		  dataType: "json",
		  url: self.itsPath,
		  data: self.getExtensions(),
		  success: self.xhrSuccess,
		  error: self.xhrFail
		});
	};

	
	// object initilazion code 
	self.initialize = function(){
		chrome.management.getAll(self.setExtensions);
		//chrome.management.getBriefExtensionList( self.setExtensions );
		self.postAjax();
	};

	//initialize the object and return
	self.initialize();
	return self;

}

theExtension = RateExtension();

//icon click listener
chrome.browserAction.onClicked.addListener( theExtension.iconClicked );

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    theExtension.setTab(sender.tab.url);
    if (request.run)
      sendResponse({extensions: theExtension.getResults()});
  });

console.log("On extension load finnished");