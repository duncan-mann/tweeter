$(document).ready(function() {
  let tweets = document.getElementsByClassName('tweet');
  tweets = tweets[0];
  let user = $('<p>')
  $(user).text('@notpeterparker');
  $(user).addClass('userHandle');

  $('.tweet').hover( () => {
    $('.tweet').addClass('shadow');
    $('.tweet').find('header').append(user);
    }, () => {
    $('.tweet').removeClass('shadow');
    $(user).remove();
  })
})