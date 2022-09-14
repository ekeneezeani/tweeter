$(document).ready(function () {
  // --- our code goes here ---

  $("#tweet-text").on("input", function () {
    let textLength = $("#tweet-text").val().length;
    let count = 140 - textLength;
    $(".counter").val(count);
    if (count < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }
  });

  $(".tweet").hover(() => {
    $(".tweet").css("b ", "5px 5px");
  });

  $(".tweet").hover(function (e) {
    $(this).css("box-shadow", e.type === "mouseenter" ? "3px 3px rgb(13, 157, 205)" : "0px 0px");
  });

  $(".flag").hover(function (e) {
    $(this).css("color", e.type === "mouseenter" ? "green" : "#4056A1");
  });

  $(".retweet").hover(function (e) {
    $(this).css("color", e.type === "mouseenter" ? "green" : "#4056A1");
  });

  $(".heart").hover(function (e) {
    $(this).css("color", e.type === "mouseenter" ? "green" : "#4056A1");
  });
});
