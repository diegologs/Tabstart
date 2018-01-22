$(document).ready(function () {

  startTime();
  getWallpaper();

  getStoredSites(function(){
    printSites();
  });

  add_site_button();
  settings_button();
  default_site_button();
  delete_sitte_button();


});

var settings = false;

var sites = default_sites.slice();

var urlIconMap = jQuery.extend(true, {}, default_icons);

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

function getStoredSites(callback){
  var stored_sites = JSON.parse(localStorage.getItem("sites"));
  var stored_icons = JSON.parse(localStorage.getItem("icons"));

  if (stored_sites){
    sites = stored_sites;
  }

  if (stored_icons){
    urlIconMap = stored_icons;
  }

  console.log(sites);
  console.log(urlIconMap);

  callback();

}

function add_site_button(){

  $(".add_site").bind("click", function(e) {
    var site = $("#add_site_input").val(); 
    addSite(site);

  })
}


function default_site_button(){

  $(".default_settings").bind("click", function(e) {
    console.log("Reseting to default settings...."); 
    sites = default_sites.slice();
     
    urlIconMap = jQuery.extend(true, {}, default_icons);
    refreshSites();
    localStorage.setItem("sites", JSON.stringify(sites));
    localStorage.setItem("icons", JSON.stringify(urlIconMap));
    console.log("Default settings have been restored");
    delete_sitte_button();
  })
}


function delete_sitte_button(){

  var delete_button = document.getElementsByClassName("fa-trash");
  for (i = 0; i < delete_button.length; i++) {
    delete_button[i].onclick = function(e) {
      var index = e.target.id;
      deleteSite(index);
      delete_sitte_button();
    }
  }
}

function settings_button(){

  $(".settings_icon").bind("click", function(e) {
    $(".addSite").toggle();
    $("#overlay").toggle();
    $(".settings_title").toggle();
    $(".default_settings").toggle();
    $(".fa-trash").toggle();
    $(".author").toggle();
    $(".github").toggle();

    if (settings){
      settings = false;
    }else{
      settings = true;

    }
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

  var icon_aux;

  if (site.startsWith("http://")){
    site = site.slice(7);
  }

  if (site.startsWith("https://")){
    site = site.slice(8);
  }

  if (site.startsWith("www.")){
    site = site.slice(4);
  }

  if (!site.startsWith("www.") && !site.startsWith("https://"))
  {
    site = 'https://www.' + site;
  }

  if (!urlIconMap.hasOwnProperty(site)) {
  
    fetchIcon(site, function(icon_aux) {
     
      console.log(icon_aux);

     
     urlIconMap[site] = icon_aux;
     localStorage.setItem("icons", JSON.stringify(urlIconMap));
     refreshSites();

    });
  }
   
  
    if (!icon_aux){
        
         urlIconMap[site] = getIcon(site); 
         localStorage.setItem("icons", JSON.stringify(urlIconMap)); 
      }
      
      sites.push(site);
      console.log("Added:  "+site);
      localStorage.setItem("sites", JSON.stringify(sites));
      printSite(site);
      delete_sitte_button(); 
  

 
}

function deleteSite(index){
  if (index > -1) {
    sites.splice(index, 1);
  }

  localStorage.setItem("sites", JSON.stringify(sites));
  localStorage.setItem("icons", JSON.stringify(urlIconMap));
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
   
    if(!site_icon.startsWith("https://") && !site_icon.startsWith("http://") && !site_icon.startsWith("www.")){
      site_icon = "/img/" + site_icon + ".png";
    }
    a = d.createElement("a");
    div = d.createElement("div");
    a.href = site;
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

    if(settings){
      trash.style.display = 'inline';
    }else{

      trash.style.display = 'none';
    }

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
      a.href = site;
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


      if(settings){
        trash.style.display = 'inline';
      }else{

        trash.style.display = 'none';
      }
      trash.setAttribute("aria-hidden", "true");  

      a.appendChild(img);
      div.appendChild(a);
      div.appendChild(trash);


      $(".most_visited").append(div);


      delete_sitte_button();

    });
  }

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

function getIcon(site){
    return "https://logo.clearbit.com/" + site + "?s=200"
}


function getWallpaper(){

  $.get("https://www.reddit.com/r/wallpaper/top/.json?count=2?sort=new", function (json) {
    var image = json.data.children[0].data.url;
    $(".bg").css("background", "linear-gradient( rgba(0, 5, 30, 0.75), rgba(15, 19, 30, 0.25)), url(" + image + ")");
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

      var icon = URI("favicon.ico").absoluteTo(url).toString()
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
