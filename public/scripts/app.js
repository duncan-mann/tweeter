
$(document).ready(function() {


//Converts the time stamp for each user. 
  const formatDate = function(unix) {
    let dateObj = new Date(unix);
    let date = dateObj.toUTCString().slice(0,16);
    return date;
  };

//Makes sure tweet is safe from vulnerabilities. 
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
 // Returns a tweet rendered from user data. 
  const createTweetElement = function(user) {

    let $article = `<article class="tweet">
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

//renderTweets accepts an array of tweets in HTML form and adds them to the DOM. 

const renderTweets = function(tweets) {
  let section = document.getElementsByClassName('new-tweet');
  $(section).empty();

  for (each of tweets) {
    let article = createTweetElement(each);
    $(section).prepend(article);
  }

}

// getTweets function makes and GET request and fetches tweets from the database and calls the renderTweets function to add them to the web page.
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

// Use this to detect if error is currently on the page. 
let errorShown = false; 


//The following code is run when the TWEET button is pressed. It checks for errors in the tweet. If an error
//is made, then it reacts accordingly. If not, the function makes a post request, and then calls the getTweet functions to refresh the page with the new tweet. 
$('.tweetForm').submit( async function(event) {

  // If an error is currently on the page from a previous tweet attempt, clear this when a new tweet is entered.
  if (errorShown === true) {
    errorShown = false;
    $('.error').slideToggle('slow');    
  }

  event.preventDefault();
  let text = $(this).serialize();
  let textInput = text.slice(5,text.length);

  //Check for errors - No text inputted, or text entry is greater than 140 characters.

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
    $('.counter').text('140');
  })

  // On nav-bar button click
    $('.arrow').click( function() {
      $('#scroll').slideToggle('slow');
      $('#textArea').focus();
    });

});



