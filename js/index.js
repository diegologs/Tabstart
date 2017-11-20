$(document).ready(function () {


  startTime();

  $.get("https://www.reddit.com/r/wallpaper/top/.json?count=2?sort=new", function (json) {
    var image = json.data.children[0].data.url;
    $(".bg").css("background", "linear-gradient( rgba(0, 5, 20, 0.75), rgba(15, 19, 20, 0.15)), url(" + image + ")");
    $('.content').css('background', 'rgba(255, 255, 255, 0)');
    console.log(json.data.children[0].data.url);



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
  if (i < 10) {
    i = "0" + i
  }; // add zero in front of numbers < 10
  return i;
}

function get_most_visited_sites(mostVisitedURLs) {



  for (var i = 0; i < 6; i++) {

    var image = new Image();
    image.src = "https://logo.clearbit.com/" + mostVisitedURLs[i].url + "?s=100";



    if (mostVisitedURLs[i].title === 'Lavanda Del Patio') {
      $(".most_visited").append('<div class="col col-sm-2"><img src="https://lavandadelpatio.es/assets/images/logo.png" width="100" /><a href="' + mostVisitedURLs[i].url + '"><h5 class="link">' + mostVisitedURLs[i].title + '</h5></a></div>')
    } else {
      if (image.width == 0) {
        $(".most_visited").append('<div class="col col-sm-2"><div id="colorpad" style="width:100px;height:100px;background-color:#000"><h1 class="first_letter">'+mostVisitedURLs[i].title.charAt(0)+'</h1></div><a href="' + mostVisitedURLs[i].url + '"><h5 class="link">' + mostVisitedURLs[i].title + '</h5></a></div>')
        $("#colorpad").css("background-color", getRandomColor());
      } else {

        $(".most_visited").append('<div class="col col-sm-2"><img src="https://logo.clearbit.com/' + mostVisitedURLs[i].url + '?s=100" /><a href="' + mostVisitedURLs[i].url + '"><h5 class="link">' + mostVisitedURLs[i].title + '</h5></a></div>')
      }
    }


  }

}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}