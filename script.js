$(document).ready(function() {

  var songs3 = {};

  $.ajax({ url: "https://api.github.com/users/jeresig", dataType: "jsonp", jsonpCallback: "logResults" });
  function logResults(json){ 
    console.log(json);
    songs3 = json;
  }

  console.log(songs3);

  var songTemplate = Handlebars.compile($("#song-template").html());
  $('.hero .container').html(songTemplate({songs: songs}));

  var playerTemplate = Handlebars.compile($("#player-ui-template").html());
  $('.footer-song-info').html(playerTemplate(songs[0]));
 
  $(".footer-btn-new").click(function(){
    $('.hero .container').append(songTemplate({songs: songs2}));
});

  $(".container").on('click', ".hero-songblock-play", function() {
    var blockIndex = $(this).parent().index();
    if ($(".hero-songblock").eq(blockIndex).hasClass("is-paused")) {
      $(".hero-songblock").eq(blockIndex).removeClass("is-paused");
      $(".hero-songblock").eq(blockIndex).addClass("is-playing");
      play();
    } else {
      $(".hero-songblock").removeClass("is-playing is-paused");
      $(".hero-songblock").eq(blockIndex).addClass("is-playing");
      if (blockIndex<10) {
        setSongInfo(songs[blockIndex].track, songs[blockIndex].band, songs[blockIndex].imgUrl, songs[blockIndex].songUrl);
        play();
      };
      if (blockIndex>9) {
        blockIndex -= 10;
        setSongInfo(songs2[blockIndex].track, songs2[blockIndex].band, songs2[blockIndex].imgUrl, songs2[blockIndex].songUrl);
        play();
      }
    }
  });

  function setSongInfo(track, band, imgUrl, songUrl) {
    $(".footer-songname").text(track);
    $(".footer-singer").text(band);
    $(".footer-song-pic").attr("src", imgUrl);
    $("#sound").attr("src", songUrl);
  }

  $(".container").on('click', ".hero-songblock-pause", function(){
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
  
  $(function() {
    $( "#slider" ).slider();
  });


});