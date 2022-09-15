$(document).ready(function () {
  
  const maxLengthError = ` <i class="fa-solid fa-triangle-exclamation"></i>&ensp;&ensp;Too Long, please respect our abitrary limit&ensp;&ensp;<i class="fa-solid fa-triangle-exclamation"></i>`;
  const noLengthError = ` <i class="fa-solid fa-triangle-exclamation"></i>&ensp;&ensp; You cannot have an empty tweet &ensp;&ensp;<i class="fa-solid fa-triangle-exclamation"></i>`

  $(".error-message-container").hide(); 
  $("#submit-tweet").submit(function (event) {
    event.preventDefault();
    if ($("#tweet-text").val().length > 140) {
      $("#tweet-text").val("");
      $('.error-message').html(maxLengthError);
      return  $(".error-message-container").show(); 
    }

    if (
      $("#tweet-text").val().length === 0 ||
      $("#tweet-text").val() === null
    ) {
      $('.error-message').html(noLengthError);
      return $(".error-message-container").show(); 
    }
   
    const url = "/tweets";
    const data = $(this).serialize();
    $.ajax({ type: "POST", url: url, data: data });
   
    loadTweets();
   
  });

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
        <div>
          <span class="tweet-content">${obj.content.text}</span>
        </div>
      </header>
      <footer>
        <span class="time-created">
          
        </span>
        <span>
          <span class="flag"> <i class="fa-solid fa-flag"></i> </span>
          <span class="retweet"> <i class="fa-solid fa-retweet"></i></span>
          <span class="heart"> <i class="fa-solid fa-heart"></i></span>
        </span> 
      </footer>
    </article>`;
  };

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const newTweetArticle = createTweetElement(tweet);
      $("#tweet-container").append(newTweetArticle);
    }
  };

  const loadTweets = function () {
    $("#tweet-text").val('');
    $.ajax({ type: "GET", url: "/tweets" }).then((response) => {
      renderTweets(response);
    });
  };

  loadTweets();
}); //END OF DOCUMENT READY
