$(document).ready(function() {

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
    $('<div class="hero-songblock">lol</div>').appendTo(".hero .container");
  });


});