$(document).ready(function() {
  
  $.get( "https://www.reddit.com/r/wallpaper/top/.json?count=20?sort=new", function( json ) {
    var image = json.data.children[0].data.url;
    $( ".bg" ).css("background", "linear-gradient( rgba(13, 29, 36, 0.65), rgba(15, 19, 20, 0.45)), url("+ image +")");  
    console.log( json.data.children[0].data.url );
  });


});

