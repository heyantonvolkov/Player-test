$(document).ready(function() {


  var theTemplateScript = $("#song-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context= songs;
  console.log(context[5]);
  var theCompiledHtml = theTemplate(context);

  $('.hero .container').append(theCompiledHtml);


  $(".hero-songblock-play").click(function(){
    $(".hero-songblock").removeClass("is-playing");
    var blockIndex = $(this).parent().index();
    $(".hero-songblock").eq(blockIndex).addClass("is-playing");
    setSongInfo(songs[blockIndex].track, songs[blockIndex].band, songs[blockIndex].imgUrl);
  });


  function setSongInfo(track, band, imgUrl) {
    $(".footer-songname").text(track);
    $(".footer-singer").text(band);
    $(".footer-song-pic").attr(src, imgUrl);
  }



});