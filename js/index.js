$(document).ready(function () {

  startTime();
  getWallpaper();

  getStoredSites();
  printSites();

  add_site_button();
  settings_button();
  delete_sitte_button();


});

var sites = [
  "twitter.com",
  "reddit.com",
  "youtube.com",
  "google.com",
  "facebook.com",
  "lavandadelpatio.es",
]

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
  "slack.com": "sk",
  "lavandadelpatio.es": "lv",
  "google.es": "gg"
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

function getStoredSites(){
  var stored_sites = JSON.parse(localStorage.getItem("sites"));
  if (stored_sites){
      sites = stored_sites;
  }
}

function add_site_button(){

  $(".add_site").bind("click", function(e) {
    var site = $("#add_site_input").val(); 
    console.log(site); 
    addSite(site);

  })
}

function delete_sitte_button(){
  var delete_button = document.getElementsByClassName("fa-trash");
  for (i = 0; i < delete_button.length; i++) {
    delete_button[i].onclick = function(e) {
      var index = e.target.id;
      console.log(index);
      deleteSite(index);
      $(".fa-trash").toggle();

    }
  }
}

  function settings_button(){

    $(".settings_icon").bind("click", function(e) {
      $(".addSite").toggle();
      $("#overlay").toggle();
      $(".settings_title").toggle();
      $(".fa-trash").toggle();
    })
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
    }; 
    return i;
  }

  function addSite(site){

    sites.push(site);
    localStorage.setItem("sites", JSON.stringify(sites));
    printSite(site);
  }

  function deleteSite(index){
    if (index > -1) {
      sites.splice(index, 1);
    }

    localStorage.setItem("sites", JSON.stringify(sites));
    refreshSites();
  }

  function printSite(site){
    var site_icon;
    var d = document;
    var a;
    var img;
    var div;
    var index;
    var trash;

    site_icon = "";

    if (urlIconMap.hasOwnProperty(site)) {
      site_icon = urlIconMap[site]
    }

    if(site_icon){
      site_icon = "/img/" + site_icon + ".png";
      a = d.createElement("a");
      div = d.createElement("div");
      a.href = "http://" + site;
      div.className = "col col-sm-2 site";

      img = d.createElement("img");
      img.src = site_icon;
      img.width = "110";
      img.className = "site_img"

      trash = d.createElement("i");
      trash.classList.add("fa");

      trash.classList.add("fa-trash");

      index = sites.indexOf(site);
      trash.setAttribute('id', index);

      trash.style.display = 'none';
      trash.setAttribute("aria-hidden", "true");  

      a.appendChild(img);
      div.appendChild(a);
      div.appendChild(trash);


      $(".most_visited").append(div);
    }

    else{

      fetchIcon(site, function(icon) {
        site_icon = icon;
      a = d.createElement("a");
      div = d.createElement("div");
      a.href = "http://" + site;
      div.className = "col col-sm-2 site";

      img = d.createElement("img");
      img.src = site_icon;
      img.width = "110";
      img.className = "site_img"

      trash = d.createElement("i");
      trash.classList.add("fa");

      trash.classList.add("fa-trash");

      index = sites.indexOf(site);
      trash.setAttribute('id', index);
      trash.style.display = 'inline';
      trash.setAttribute("aria-hidden", "true");  

      a.appendChild(img);
      div.appendChild(a);
      div.appendChild(trash);


      $(".most_visited").append(div);


      });
    }

  delete_sitte_button();
  }

  function printSites(){
    sites.forEach(function(site){

      printSite(site);


    });




  }

  function refreshSites(){

    $(".most_visited").empty();
    printSites();

  }

  function getWallpaper(){

    $.get("https://www.reddit.com/r/wallpaper/top/.json?count=2?sort=new", function (json) {
      var image = json.data.children[0].data.url;
      $(".bg").css("background", "linear-gradient( rgba(0, 5, 20, 0.75), rgba(15, 19, 20, 0.15)), url(" + image + ")");
      $(".bg").css("background-size", "cover");
      $('.content').css('background', 'rgba(255, 255, 255, 0)');

      // console.log(json.data.children[0].data.url);



    });
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


  function fetchIcon(url, _callback) {
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
        return _callback(icon);

      })
    }
  }


  String.prototype.getPureDomain = function() {
    var temp = document.createElement("a")
    temp.href = this

    var val = temp.host
    if (val.indexOf("www") === 0) val = val.substring(val.indexOf("www.") + "www.".length)

    return val
  }
