$(document).ready(function() {

  var theTemplateScript = $('#song-template').html();

  var theTemplate = Handlebars.compile(theTemplateScript);

  var songContext = songs;

  var theCompiledHtml = theTemplate(songContext);

  $('.hero .container').html(theCompiledHtml);


  

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


  $(".footer-btn-new").click(function() {
    $('<div ="third">Третий</div>').appendTo(".hero .container");
  });


});