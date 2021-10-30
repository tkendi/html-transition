var btn = $('.btn');

btn.on('click', function() {
  $(this).toggleClass('active');
  $(this).toggleClass('not-active');
});