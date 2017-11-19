$(document).ready(function() {
  
  
  startTime();


  
  $.get( "https://www.reddit.com/r/wallpaper/top/.json?count=2?sort=new", function( json ) {
    var image = json.data.children[0].data.url;
    $( ".bg" ).css("background", "linear-gradient( rgba(0, 5, 20, 0.75), rgba(15, 19, 20, 0.15)), url("+ image +")");  
    $('.content').css('background', 'rgba(255, 255, 255, 0)');
    console.log( json.data.children[0].data.url );

  
     
  });


  chrome.topSites.get(get_most_visited_sites) 
    
  

  
  

});

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function get_most_visited_sites(mostVisitedURLs) {
  var popupDiv = document.getElementById('mostVisited_div');
  var ol = popupDiv.appendChild(document.createElement('ul'));

  for (var i = 0; i < 5; i++) {
    var li = ol.appendChild(document.createElement('li'));
    var a = li.appendChild(document.createElement('a'));
    a.href = mostVisitedURLs[i].url;
    a.appendChild(document.createTextNode(mostVisitedURLs[i].title));

   

   

    
    
  }

}
