// the themeswitcher sets the theme
// look in: /lib/modules/apostrophe-assets/public/js/theme_switcher.js

// This finds if a theme has been set during page load
// and sets the theme toggles accordingly
function findAndSetThemeToggle() {
  // if no theme has been set, use default
  var theme = localStorage.getItem('theme');
  if (!theme) {
    console.log('No theme found in LS. Keeping things as they are')
    return;
  }

  var themeInfo = [
    {
      id: 'theme-input-1',
      name: 'default'
    },
    {
      id: 'theme-input-2',
      name: 'light'
    },
    {
      id: 'theme-input-3',
      name: 'dyslexia'
    }
  ];

  for (var i=0; i<themeInfo.length; i++) {
    if (theme == themeInfo[i]['name']) {
      $('#'+themeInfo[i]['id']).prop('checked', true)
    } else {
      $('#'+themeInfo[i]['id']).prop('checked', false)
    }
  }
  return;
}

$(document).ready(function() {
  console.log('skin settings loaded')
  findAndSetThemeToggle()
})