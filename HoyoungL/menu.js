let menu = document.querySelectorAll('.anim_menu');
let icon = document.querySelectorAll('.icon-link');

menu.forEach(m => {
  m.addEventListener('click', e => {
    if (m.classList.contains('active')) {
      m.classList.add('clicked');
      m.classList.remove('active');
    } else
    {
      m.classList.remove('clicked');
      m.classList.add('active');
    }
  });
});

icon.forEach(i => {
  i.addEventListener('click', e => {
    e.stopPropagation();

    // alert('clicked: ' + i.getAttribute('href'));
  });
});
