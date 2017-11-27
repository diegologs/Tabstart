$(document).ready(function () {

  startTime();



  $.get("https://www.reddit.com/r/wallpaper/top/.json?count=2?sort=new", function (json) {
    var image = json.data.children[0].data.url;
    $(".bg").css("background", "linear-gradient( rgba(0, 5, 20, 0.75), rgba(15, 19, 20, 0.15)), url(" + image + ")");
    $(".bg").css("background-size", "cover");
    $('.content').css('background', 'rgba(255, 255, 255, 0)');
    console.log(json.data.children[0].data.url);



  });


  chrome.topSites.get(get_most_visited_sites);
  fetchIcon("https://www.di.fm");




});

var urlIconMap = {
  "facebook.com": "fb",
  "plus.google.com": "gp",
  "youtube.com": "yt",
  "9gag.com": "ng",
  "mail.google.com": "gmail",
  "reddit.com": "rd",
  "google.com": "gg",
  "yahoo.com": "yh",
  "drive.google.com": "gd",
  "digg.com": "dg",
  "theverge.com": "vg",
  "twitter.com": "tw",
  "getpocket.com": "pk",
  "keep.google.com": "gk",
  "inbox.google.com": "ix",
  "ello.co": "el",
  "slack.com": "sk"
}

String.prototype.getPureDomain = function() {
  var temp = document.createElement("a")
  temp.href = this

  var val = temp.host
  if (val.indexOf("www") === 0) val = val.substring(val.indexOf("www.") + "www.".length)

  return val
}

var xhr = function(url, callback) {
  var oReq = new XMLHttpRequest()
  oReq.onload = function() {
    var response = this.responseText
    callback(response)
  }
  oReq.onerror = function(e) {
  }
  oReq.open("get", url, true)
  oReq.send()
}



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

function delete_top_site(url_to_delete) {

  console.log(url_to_delete);
  chrome.history.deleteUrl({url: url_to_delete});
  
}


function fetchIcon(url) {
  var presetMatchedId
  let parser;
  let doc;
  

  if (urlIconMap.hasOwnProperty(url.getPureDomain())) {
    presetMatchedId = urlIconMap[url.getPureDomain()]
  }

  if (presetMatchedId) {
    console.log(presetMatchedId);
  } else {
    xhr(url, function(r) {
      parser = new DOMParser()
      doc = parser.parseFromString(r, "text/html")

      var linkTags = doc.getElementsByTagName("link")
      var icons = [].slice.call(linkTags).filter(function(tag) {
        var attrRel = tag.getAttribute("rel")
        return attrRel === "apple-touch-icon-precomposed" || attrRel === "apple-touch-icon" || attrRel === "shortcut icon" || attrRel === "icon"
      })

      var sizePreference = ["57x57", "60x60", "72x72", "76x76", "96x96", "114x114", "120x120", "144x144", "152x152", "180x180", "192x192"]

      icons.sort(function(a, b) {
        var sizeA = a.getAttribute("sizes")
        var sizeB = b.getAttribute("sizes")
        if (sizePreference.indexOf(sizeA) > sizePreference.indexOf(sizeB)) return -1
        if (sizePreference.indexOf(sizeA) < sizePreference.indexOf(sizeB)) return 1
        return 0
      })

      var icon = URI("favicon.ico").absoluteTo(url).toString()
      if (icons.length > 0) {
        var iconElem = icons[0]
        var iconHrefAttr = iconElem.getAttribute("href")
        icon = URI(iconHrefAttr).absoluteTo(url).toString()
      }

      console.log(icon);

    })
  }
}