$(document).ready(function() {

  window.songs = [];
  var page = 0;
  var perpage = 10;

  console.log($(".volume-slider").val());

  $.get("http://api.radioreddit.com/tracks", function(json){
    songInfo = json;

    songs = songInfo.map(function(song){
      return  {
        album: song.Album.title,
        band: song.Artist.name,
        path: song.media.original,
        track: song.title,
        imgUrl:  "http://loremflickr.com/g/200/200/music?random=" + Math.random()
      }
    });

    var songs1 = sliceSongs(songs);

    var songTemplate = Handlebars.compile($("#song-template").html());
    $('.hero .container').html(songTemplate({songs: songs1}));

    var playerTemplate = Handlebars.compile($("#player-ui-template").html());
    $('.footer-song-info').html(playerTemplate(songs[0]));
  });
  
  function sliceSongs (array) {
    var result = array.slice(page*perpage, perpage+(page*perpage));
    page++
    return result;
  }
 
  $(".container").on('click', ".hero-songblock-play", function() {
    var block = $(this).parent();
    $('.hero-songblock').removeClass('is-playing is-paused');

    if (block.hasClass("is-paused")) {
      block.removeClass("is-paused").addClass("is-playing");
      play();
    } else {
      block.addClass("is-playing");
      setSongInfo($(this).parent().index());
      play();
    }
  });

  $(".footer-btn-new").click(function(){
    var moreSongs = sliceSongs(songs);
    var songTemplate = Handlebars.compile($("#song-template").html());
    $('.hero .container').append(songTemplate({songs: moreSongs}));
  });

  $(".container").on('click', ".hero-songblock-pause", function(){
    var block = $(this).parent();
    block.addClass("is-paused").removeClass("is-playing");
    pause();
  });

  function setSongInfo(songIndex) {
    var playerTemplate = Handlebars.compile($("#player-ui-template").html());
    $('.footer-song-info').html(playerTemplate(songs[songIndex]));
  }

  $(".footer-pause-btn").click(function(){
    pause();
    $(".hero-songblock .is-playing").addClass("is-paused").removeClass("is-playing");
  });

  function play() {
    var audio = $('#sound')[0];
    audio.play();
  }

  function pause() {
    var audio = $('#sound')[0];
    audio.pause();
  }
  
  $(".volume-slider").on('change', function(){
    var audio = $('#sound')[0];
    audio.volume = $(this).val()/100;
  })
  
});