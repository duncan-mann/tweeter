$(document).ready(function() {

  $('#textArea').on('keyup', function() {
    let textArea = jQuery(this);
    let textAreaLength = textArea.context.textLength;
    let counter = $(this).next().find('span');
    counter.text(140 - textAreaLength);

    

    if (textAreaLength > 140) {
      counter.text('-' + (textAreaLength - 140));
      $(counter).css({
        'color': 'red'
      });
    } else {
      $(counter).css({
        'color': '#545149'
      });
    }
  })

 
});