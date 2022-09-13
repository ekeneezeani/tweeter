$(document).ready(function () {
  // --- our code goes here ---
  let count = 0;

  $("#tweet-text").on("input", function () {
    let textLength = $("#tweet-text").val().length;
    let count = 140 - textLength;
    $(".counter").val(count);
    if (count < 0) {
      $(".counter").css("color","red");
    }else{
      $(".counter").css("color","black");
    }
    
  });
});
