$(document).ready(function() {

  window.blockIndex;
  window.songs = [];
  var page = 0;
  var perpage = 10;

  $.get("http://api.radioreddit.com/tracks", function(json){
    songInfo = json;

    songs = songInfo.map(function(song){
      return  {
        album: song.Album.title,
        band: song.Artist.name,
        path: song.media.original,
        track: song.title
      }
    });

    $.get("https://unsplash.it/list", function(json){
      imagesInfo = json;

      images = imagesInfo.map(function(image){
        return {
          imgUrl: image.post_url
        }
      });

      for (var i=0; i<songs.length; ++i){
        songs.push(images[i]);
      }
    });

    console.log(songs);

    var songs1 = sliceSongs(songs);

    var songTemplate = Handlebars.compile($("#song-template").html());
    $('.hero .container').html(songTemplate({songs: songs1}));

    var playerTemplate = Handlebars.compile($("#player-ui-template").html());
    $('.footer-song-info').html(playerTemplate(songs[0]));
  });
  
  function sliceSongs (array) {
    var result = array.slice(page*perpage, perpage+(page*perpage));
    ++page
    return result;
  }
 
  $(".footer-btn-new").click(function(){
    var moreSongs = sliceSongs(songs);
    console.log(moreSongs);
    var songTemplate = Handlebars.compile($("#song-template").html());
    $('.hero .container').append(songTemplate({songs: moreSongs}));
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
  

});