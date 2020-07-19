module.exports = {
  extend: 'apostrophe-custom-pages',
  label: 'Home Module',
  afterConstruct: function (self) {
     self.addDispatchRoutes();
  },
  construct: function (self, options) {
     self.addDispatchRoutes = function () {
        self.dispatch('/', self.maiaHome);
     };
     self.maiaHome = function (req, callback) {
        return self.sendPage(req, self.renderer('home', {
          module_root: req.slug.split('/')
        }));
     };
  }
}
