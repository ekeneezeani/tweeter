$(document).ready(function () {
  // Error Message ducing validation
  const maxLengthError = ` <i class="fa-solid fa-triangle-exclamation"></i>&ensp;&ensp;Too Long, please respect our abitrary limit&ensp;&ensp;<i class="fa-solid fa-triangle-exclamation"></i>`;
  const noLengthError = ` <i class="fa-solid fa-triangle-exclamation"></i>&ensp;&ensp; You cannot have an empty tweet &ensp;&ensp;<i class="fa-solid fa-triangle-exclamation"></i>`;

  // Hides Error message when the site loads
  $(".error-message-container").hide();

  
  $("#submit-tweet").submit(function (event) {
    event.preventDefault();
    // Validation of character count
    if ($("#tweet-text").val().length > 140) {
      $("#tweet-text").val("");
      // Error message returned
      $(".error-message").html(maxLengthError);
      // Reset Character count
      $(".counter").html(140).css("color", "#545149");
      return $(".error-message-container").show();
    }

    if (
      $("#tweet-text").val().length === 0 ||
      $("#tweet-text").val() === null
    ) {
      // error Message when no character is entered
      $(".error-message").html(noLengthError);
      return $(".error-message-container").show();
    }
    // Fetching data from submitted form
    const url = "/tweets";
    const data = $(this).serialize();

    // AJAX post
    $.post({url: url, data: data }).then(()=>{
      loadTweets();
      $(".counter").html(140);
      // Reload the page after each submission
      // location.reload(true);
    });

  });

  // Function to check Cross Site Scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Creating HTML on the fly for each tweet
  const createTweetElement = function (obj) {
    return `<article class ='tweet'>
      <header> 
        <div>  
          <span class="pro-pic-name">
            <span >
              <img class="pro-pic" src= ${obj.user.avatars}>
            </span>
            <span class="pro-name">
              ${obj.user.name}
            </span>
          </span>
          <span >
            <span class="tweeter-handle">${obj.user.handle}</span>
          </span>
        </div>   
        <div class="content-header">
          <span class="tweet-content">${escape(obj.content.text)}</span>
        </div>
      </header>
      <footer>
        <span class="time-created">
         ${timeago.format(obj.created_at)}
        </span>
        <span>
          <span class="flag"> <i class="fa-solid fa-flag"></i> </span>
          <span class="retweet"> <i class="fa-solid fa-retweet"></i></span>
          <span class="heart"> <i class="fa-solid fa-heart"></i></span>
        </span> 
      </footer>
    </article>`;
  };

  // Renders Tweets by looping through all the tweets from the DB or AJAX request
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const newTweetArticle = createTweetElement(tweet);
      $("#tweet-container").prepend(newTweetArticle);
    }
  };

  // Get request
  const loadTweets = function () {
    $("#tweet-text").val("");
    $.get({ url: "/tweets" }).then((response) => {
      renderTweets(response);
    });
  };
  
  loadTweets();
}); //END OF DOCUMENT READY
