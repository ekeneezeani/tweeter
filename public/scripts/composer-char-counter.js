$(document).ready(function() {
  
  $("#tweet-text").on("input", function() {

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

});
