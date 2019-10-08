$(document).ready(function() {
  let tweets = document.getElementsByClassName('tweet');
  tweets = tweets[0];
  console.log(tweets);

  $('.tweet').hover( () => {
    $('.tweet').addClass('shadow');
    console.log(tweets);
  }, () => {
    console.log('hover off')
    $('.tweet').removeClass('shadow');
    console.log(tweets);

  })
})