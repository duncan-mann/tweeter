/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const formatDate = function(unix) {
  let dateObj = new Date(unix);
  date = dateObj.toUTCString().slice(0,16);
  return date;
}
 
const createTweetElement = function(user) {
 let $article = `<article class="tweet ${user.user.name}">
 <header>
      <img src=${user.user.avatars}>
      <h4>${user.user.name}</h4>
      <p class="username">${user.user.handle}</p>
    </header>
      <p>${user.content.text}</p>
      <footer>
      <p>${formatDate(user.created_at)}</p>
      <div>
        <img src='../images/icons/like.png'>
        <img src='../images/icons/flag.png'>
        <img src='../images/icons/repeat.png'>
      </div>
  </footer>
</article>`;

return $article;
}

const renderTweets = function(tweets) {
  for (each of tweets) {
    let article = createTweetElement(each);
    let section = document.getElementsByClassName('new-tweet');
    $(section).append(article);
  }
}

renderTweets(data);

// $('form').submit(function(event) {
//   event.preventDefault();
// });


$('.tweetForm').submit( async function(event) {
  event.preventDefault();
  let text = $(this).serialize();
  
  try {
      const response = await $.ajax({
        url: '/tweets/',
        type: 'POST',
        data: text,
        dataType: 'JSON'
      })
  } catch (error) {
    console.error(error)
    }
  })


  let getTweets = async function() {
    
      await $.ajax({
      url: '/tweets/',
      type: 'GET',
      data : data,
      dataType: 'JSON'
    }).then( (data)=> {
      renderTweets(data);
    })
  }
  getTweets();

// const loadTweets = async function() {
//   let tweets = await $.get('/tweets/', function(data) {
//     return data;
//   })
//   renderTweets(tweets);
// }

// loadTweets();

});



