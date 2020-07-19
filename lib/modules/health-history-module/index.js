module.exports = {
  extend: 'apostrophe-custom-pages',
  label: 'Health History Module',
  afterConstruct: function (self) {
     self.addDispatchRoutes();
  },
  construct: function (self, options) {
     self.addDispatchRoutes = function () {
       self.dispatch('/', self.health_factors);
     };
     self.health_factors = function (req, callback) {
        return self.sendPage(req, self.renderer('My-Health-History', {
          module_root: req.slug.split('/')[1],
        }));
     };
  }
}
