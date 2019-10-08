$(document).ready(function() {

  $('.tweet').on('mouseover', function() {
    $(this).children('header').children('.username').css({ display: 'inline' });
    $(this).addClass('shadow');
  });
  $('.tweet').on('mouseleave', function() {
    $(this).children('header').children('.username').css({ display: 'none' });
    $(this).removeClass('shadow');
  });
  
})

// OLD WAY (didn't work)
  // let username = $('<p>');
  // $(username).text('@notpeterparker');
  // $(username).addClass('userHandle');

  // $('.tweet').hover( () => {
  //   $('.tweet').addClass('shadow');
  //   $('.tweet').find('header').append(username);
  //   }, () => {
  //   $('.tweet').removeClass('shadow');
  //   $(username).remove();
  // })