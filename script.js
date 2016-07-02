$(document).ready(function() {


  
  var songTemplate = Handlebars.compile($("#song-template").html());
  $('.hero .container').html(songTemplate({songs: songs}));

  var playerTemplate = Handlebars.compile($("#player-ui-template").html());
  $('.footer-song-info').html(playerTemplate(songs[0]));
 
  

  $(".hero-songblock-play").click(function(){
    var blockIndex = $(this).parent().index();
    if ($(".hero-songblock").eq(blockIndex).hasClass("is-paused")) {
      $(".hero-songblock").eq(blockIndex).removeClass("is-paused");
      $(".hero-songblock").eq(blockIndex).addClass("is-playing");
      play();
    } else {
      $(".hero-songblock").removeClass("is-playing is-paused");
      $(".hero-songblock").eq(blockIndex).addClass("is-playing");
      setSongInfo(songs[blockIndex].track, songs[blockIndex].band, songs[blockIndex].imgUrl, songs[blockIndex].songUrl);
      play();
    }
  });

  function setSongInfo(track, band, imgUrl, songUrl) {
    $(".footer-songname").text(track);
    $(".footer-singer").text(band);
    $(".footer-song-pic").attr("src", imgUrl);
    $("#sound").attr("src", songUrl);
  }

  $(".hero-songblock-pause").click(function(){
    var blockIndex = $(this).parent().index();
    $(".hero-songblock").eq(blockIndex).addClass("is-paused");
    $(".hero-songblock").eq(blockIndex).removeClass("is-playing");
    pause();
  });

  $(".footer-pause-btn").click(function(){
    pause();
    var blockIndex = $('.is-playing').index();
    $(".hero-songblock").eq(blockIndex).addClass("is-paused");
    $(".hero-songblock").eq(blockIndex).removeClass("is-playing");
  });

  function play() {
    var audio = $('#sound')[0];
    audio.play();
  }

  function pause() {
    var audio = $('#sound')[0];
    audio.pause();
  }
  

});