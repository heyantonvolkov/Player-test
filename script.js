$(document).ready(function() {
  $(".hero-songblock-play").click(function(){
    $(".hero-songblock").removeClass("is-playing");
    $(this).find(".hero-songblock").addClass("is-playing");
  });
});