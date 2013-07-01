



// makes a div entity out of a single extension response 
function makeEntry(entry){
  console.log(entry);
  el = document.createElement("div");
  $(el).addClass('extEntry')
  if(entry.enabled){
    $(el).append('<img src="imageenabled.png" class="imgEnabled"/>');
  }
  else{
    $(el).append('<img src="imagedisabled.png" class="imgDisabled"/>');
  }
  
  $(el).append('<p class="name">' + entry.name + '</p>');
  $(el).append('<p class="extCat">' + entry.category + '</p>');
  $(el).append('<p class="extRank">' + entry.rank + '</p>');

  return el
}

chrome.runtime.sendMessage({run: true}, function(response) {
  var rslt = response.extensions;
  rslt = rslt["extensions"];
  err = response.errors;
  if(err.length === 0){
    for(var i=0; i<rslt.length; i++){
      $('#ExtensionList').append(makeEntry(rslt[i]));
    }
  }
  else {
    $('#ExtensionList').append("Ooops! Something went wrong:");
    for(var i=0; i<err.length; i++){
      $('#ExtensionList').append('<p>' + err[i] + '</p>');
    }  
  }
  
});


