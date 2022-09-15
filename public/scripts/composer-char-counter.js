$(document).ready(function () {
  // --- our code goes here ---

  $("#tweet-text").on("input", function () {

    $(".error-message-container").hide();

    let textLength = $("#tweet-text").val().length;
    let count = 140 - textLength;
    $(".counter").val(count);
    if (count < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }
  });

  $("#btn").hover(function (e) {
    $(this).css("border", e.type === "mouseenter" ? "3px rgb(13, 157, 205) solid" : "0px");
  });

});
