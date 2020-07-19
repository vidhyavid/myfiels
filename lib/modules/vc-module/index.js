module.exports = {
  extend: 'apostrophe-custom-pages',
  label: 'vc Module',
  afterConstruct: function(self) {
    self.addDispatchRoutes();
  },
  construct: function(self, options) {
    require("../../middleware")(self, options);

    self.addDispatchRoutes = function() {
      self.dispatch('/',  self.vc);
    };

    self.vc = function(req, callback) {
      return self.sendPage(req, self.renderer('vc', {
        module_root: req.slug.split('/')[1]
      }));
    };
  }
}
