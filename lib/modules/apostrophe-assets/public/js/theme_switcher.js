(function(exports) {
    var themeChanger = {
      settings: {
        themeswitcher: $('.theme-switcher'),
        buttons: $('.controls')
      },

      themeNames: ['default', 'dyslexia', 'light'],

      setTheme: function(context, theme) {
        context.settings.themeswitcher.removeClass().addClass('maia-body theme-switcher ' + theme);
        localStorage.setItem('theme', theme)
      },

      initTheme: function(context) {
        var theme = localStorage.getItem('theme');
        if (theme) {
          context.settings.themeswitcher.removeClass().addClass('maia-body theme-switcher ' + theme);
        }
      },

      init: function () {
        var _self = this;

        // for when the plugin loads up
        // check if there is a theme, that the user has already set
        _self.initTheme(_self);

        // when user clicks on a toggle in the settings page
        this.settings.buttons.on('click', function () {
          console.log('theme changer clicked')
          var $node = $(this),
              theme = $node.data('theme');
          // _self.settings.themeswitcher.removeClass().addClass('maia-body theme-switcher ' + theme);
          // _self.settings.buttons.removeAttr('disabled');
          // $node.attr('disabled', true);
          _self.setTheme(_self, theme);
        });
      }
    };

    themeChanger.init();
  }(window));
