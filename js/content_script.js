
// makes a div entity out of a single extension response 
function makeEntry(entry){
  el = document.createElement(div);


}

chrome.runtime.sendMessage({run: true}, function(response) {
  console.log("recieved a response");
  console.log(response.extensions);

  var rslt = response.extensions;
  //TODO: loop through the responses and build some pretty litle html from them
  $('body').append(JSON.stringify(rslt));

});


