$(document).ready(function () {
  $("#submit-tweet").submit(function (event) {
    event.preventDefault();
    if ($("#tweet-text").val().length > 140) {
      $("#tweet-text").val("");
      return alert("Input is over rquired number of text");
    }

    if (
      $("#tweet-text").val().length === 0 ||
      $("#tweet-text").val() === null
    ) {
      return alert("Input cannot be an empty text");
    }

    const url = "/tweets";
    const data = $(this).serialize();
    $.ajax({ type: "POST", url: url, data: data });
  });

  const tweetData = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const createTweetElement = function (obj) {
    // const date = new Date(obj.created_at);

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
          <time datetime="2016-06-30 09:20:00"></time>
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
    $.ajax({ type: "GET", url: "/tweets" }).then((response) => {
      renderTweets(response);
    });
  };

  loadTweets();
}); //END OF DOCUMENT READY
