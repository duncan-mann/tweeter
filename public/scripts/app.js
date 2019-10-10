/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {



const formatDate = function(unix) {
  let dateObj = new Date(unix);
  date = dateObj.toUTCString().slice(0,16);
  return date;
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
 
const createTweetElement = function(user) {

 let $article = `<article class="tweet ${user.user.name}">
 <header>
      <img src=${user.user.avatars}>
      <h4>${user.user.name}</h4>
      <p class="username">${user.user.handle}</p>
    </header>
      <p>${escape(user.content.text)}</p>
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
  let section = document.getElementsByClassName('new-tweet');
  $(section).empty();

  for (each of tweets) {
    let article = createTweetElement(each);
    $(section).prepend(article);
  }
}

// renderTweets(tweetData);

let getTweets = async function() {
    
  await $.ajax({
  url: '/tweets/',
  type: 'GET',
  data : 'data',
  dataType: 'JSON'
  }).then( (data)=> {
    renderTweets(data);
  })
}
getTweets();

let errorShown = false; // Use this to detect if error is currently on the page. 

$('.tweetForm').submit( async function(event) {

  // If an error is currently on the page from a previous tweet attempt, clear this when a new tweet is entered.
  if (errorShown === true) {
    errorShown = false;
    $('.error').find('p').text('');
    $('.error').slideToggle('slow');    
  }

  event.preventDefault();
  let text = $(this).serialize();
  let textInput = text.slice(5,text.length);

  if (textInput.length === 0) {
    errorShown = true;
    $('.error').slideToggle('slow');
    $('.error').find('p').text('Must enter a tweet!');
    return;
  } else if (textInput.length > 140) {
    errorShown = true;
    $('.error').slideToggle('slow');
    $('.error').find('p').text('Tweet must be less than 140 characters!');
    return;
  }
  
  try {
      const response = await $.ajax({
        url: '/tweets/',
        type: 'POST',
        data: text,
      })

  } catch (error) {
    console.error(error)
    }
    getTweets();
    document.getElementById('textArea').value = '';
  })

    $('.arrow').click( function() {
      $('#scroll').slideToggle('slow');
    });

});



