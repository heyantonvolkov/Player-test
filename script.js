$(document).ready(function() {

  window.blockIndex;
  window.songs = [];


  $.get("http://api.radioreddit.com/tracks", function(json){
    songInfo = json;

    songs = songInfo.map(function(song){
      song.Album.title ? console.log(song.Album.title) : console.log("Yeah");

      return  {
        album: song.Album.title,
        band: song.Artist.name,
        path: song.media.original,
        track: song.title
      }
    });

    var songTemplate = Handlebars.compile($("#song-template").html());
    $('.hero .container').html(songTemplate({songs: songs}));

    var playerTemplate = Handlebars.compile($("#player-ui-template").html());
    $('.footer-song-info').html(playerTemplate(songs[0]));
  });
  

 
  $(".footer-btn-new").click(function(){
    $('.hero .container').append(songTemplate({songs: songs2}));
});

  $(".container").on('click', ".hero-songblock-play", function() {
    blockIndex = $(this).parent().index();
    if ($(".hero-songblock").eq(blockIndex).hasClass("is-paused")) {
      $(".hero-songblock").eq(blockIndex).removeClass("is-paused");
      $(".hero-songblock").eq(blockIndex).addClass("is-playing");
      play();
    } else {
      $(".hero-songblock").removeClass("is-playing is-paused");
      $(".hero-songblock").eq(blockIndex).addClass("is-playing");
      setSongInfo();
      play();
    }
  });

  function setSongInfo() {
    var playerTemplate = Handlebars.compile($("#player-ui-template").html());
    $('.footer-song-info').html(playerTemplate(songs[blockIndex]));
  }

  $(".container").on('click', ".hero-songblock-pause", function(){
    blockIndex = $(this).parent().index();
    $(".hero-songblock").eq(blockIndex).addClass("is-paused");
    $(".hero-songblock").eq(blockIndex).removeClass("is-playing");
    pause();
  });

  $(".footer-pause-btn").click(function(){
    pause();
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