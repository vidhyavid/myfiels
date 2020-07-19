module.exports = {
  extend: 'apostrophe-custom-pages',
  label: 'Skin Setting',
  afterConstruct: function (self) {
     self.addDispatchRoutes();
  },
  construct: function (self, options) {
    require("../../middleware")(self, options);
     self.addDispatchRoutes = function () {
        self.dispatch('/', self.middleware.checkAuth,self.setting);
        self.dispatch('/skin', self.middleware.checkAuth,self.settingskin);
     };
     self.setting = function (req, callback) {
       const slug_splits = req.slug.split('/');
       slug_splits.pop(); // /add is removed
       const view_page_route = slug_splits.join('/');
        return self.sendPage(req, self.renderer('Setting', {
          module_root: req.slug.split('/')[1],
          parent_route: view_page_route,
          slug: req.slug,
        }));
     };
     self.settingskin = function (req, callback) {
       const slug_splits = req.slug.split('/');
       slug_splits.pop(); // /add is removed
       const view_page_route = slug_splits.join('/');
        return self.sendPage(req, self.renderer('Setting-skin', {
          module_root: req.slug.split('/')[1],
          parent_route: view_page_route,
          slug: req.slug,
        }));
     };
  }
}
