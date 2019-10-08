/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

let user = {

  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
};

{/* <article class="tweet">
    <header>
        <img src='../images/avatars/066-Spiderman.png'>
        <h4>Spider-Man</h4>
      </header>
        <p>Spider-men just wanna have fun</p>
        <footer>
        <p>10 days ago</p>
        <div>
          <img src='../images/icons/like.png'>
          <img src='../images/icons/flag.png'>
          <img src='../images/icons/repeat.png'>
        </div>
    </footer>
  </article> */}
 

createTweetElement = function(user) {
 let $article = `<article class="tweet ${user.user.name}">
 <header>
      <img src=${user.user.avatars}>
      <h4>${user.user.name}</h4>
      <p class="username">${user.user.handle}</p>
    </header>
      <p>${user.content.text}</p>
      <footer>
      <p>${user.created_at}</p>
      <div>
        <img src='../images/icons/like.png'>
        <img src='../images/icons/flag.png'>
        <img src='../images/icons/repeat.png'>
      </div>
  </footer>
</article>`;

return $article;
}


let article = createTweetElement(user);
// console.log(article);
let section = document.getElementsByClassName('new-tweet');
$(section).append(article);



});



