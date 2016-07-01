$(document).ready(function() {
  var blockIndex = 0;

  $(".hero-songblock-play").click(function(){
    $(".hero-songblock").removeClass("is-playing");
    blockIndex = getBlockIndex();
    console.log(blockIndex);
    setSongInfo(songs[2].track, songs[2].band, songs[2].imgUrl);
  });

  
  function getBlockIndex () {
    return $(this).parent().index();
  }

  function setSongInfo(track, band, imgUrl) {
    $(".footer-songname").text(track);
    $(".footer-singer").text(band);
    $(".footer-song-pic").attr(src, imgUrl);
  }

  
});