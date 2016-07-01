$(document).ready(function() {


  
  var songTemplate = Handlebars.compile($("#song-template").html());
  $('.hero .container').html(songTemplate({songs: songs}));

  var playerTemplate = Handlebars.compile($("#player-ui-template").html());
  $('.footer-song-info').html(playerTemplate(songs[0]));
 
  $('.footer-btn-new').click(function(){
    var audio = $('#sound')[0];
    audio.play();
  });

  $('footer-control-btn').click(function(){
    var audio = $('#sound')[0];
    audio.pause();
  });

  $(".hero-songblock-play").click(function(){
    var blockIndex = $(this).parent().index();
    if ($(".hero-songblock").eq(blockIndex).hasClass("is-paused")) {
      $(".hero-songblock").eq(blockIndex).removeClass("is-paused");
      $(".hero-songblock").eq(blockIndex).addClass("is-playing");
    } else {
      $(".hero-songblock").removeClass("is-playing is-paused");
      $(".hero-songblock").eq(blockIndex).addClass("is-playing");
      setSongInfo(songs[blockIndex].track, songs[blockIndex].band, songs[blockIndex].imgUrl);
    }
  });

  function setSongInfo(track, band, imgUrl) {
    $(".footer-songname").text(track);
    $(".footer-singer").text(band);
    $(".footer-song-pic").attr("src", imgUrl);
  }

  $(".hero-songblock-pause").click(function(){
    var blockIndex = $(this).parent().index();
    $(".hero-songblock").eq(blockIndex).addClass("is-paused");
    $(".hero-songblock").eq(blockIndex).removeClass("is-playing");
  });

  

});