
// makes a div entity out of a single extension response 
function makeEntry(entry){
  console.log(entry);
  el = document.createElement("div");
<<<<<<< HEAD
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
=======
  $(el).addClass('extEntry').attr('id', entry.id);
  
  chrome.management.get(entry.id, function(rslt){
    var imgPath = "img/none.png";
    if(rslt.icons.length > 1){imgPath = rslt.icons[1].url;}
    else if(rslt.icons.length === 1){imgPath = rslt.icons[0].url;}
    $('#' + rslt.id).append('<img class="extIcon" src="' + imgPath +'"/>')
  });

  $(el).append('<p class="name">' + entry.name + '</p>');
  $(el).append('<p class="extCat">' + entry.category + '</p>');
  $(el).append('<p class="extRank">' + entry.rank + '</p>');
>>>>>>> b5c98184f14204cd04e5f4bddbd1d91414d0f901

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


