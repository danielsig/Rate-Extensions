
// makes a div entity out of a single extension response 
function makeEntry(entry){
  console.log(entry);
  el = document.createElement("div");
  $(el).addClass('extEntry btn btn-large' + (entry.enabled ? ' btn-primary' : ''))
  /*if(entry.enabled){
    $(el).append('<img src="imageenabled.png" class="btn disabled"/>');
  }
  else{
    $(el).append('<img src="imagedisabled.png" class="btn disabled"/>');
  }*/
  $(el).append('<h3 class="name">' + entry.name + '</h3>');
  $(el).append('<p class="extCat btn btn-success btn-block">' + entry.category + '</p>');
  $(el).append('<p class="extRank btn btn-info btn-block">' + entry.rank + '</p>');

  return el
}

chrome.runtime.sendMessage({run: true}, function(response) {
  var rslt = response.extensions;
  rslt = rslt["extensions"];
  for(var i=0; i<rslt.length; i++){
    $('#ExtensionList').append(makeEntry(rslt[i]));

  }
  

});


