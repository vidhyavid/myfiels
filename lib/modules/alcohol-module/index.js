   module.exports = {
     extend: 'apostrophe-custom-pages',
     label: 'Alcohol Module',
     afterConstruct: function (self) {
        self.addDispatchRoutes();
     },
     construct: function (self, options) {

         require("../../middleware")(self, options);
         self.route("post", "alcohol", function (req, res) {
         var url =
            self.apos.PHRMODULE.getOption(req, "phr-module") +
            self.apos.PATH.getOption(req, "alcohol-path") +
            "/";
         self.middleware
            .post(req, res, url, req.body)
            .then((data) => {
               if (!(data && data.message)) {
               req.session.auth_token = data.data.auth_token;
               req.session.reload(function () {});
               req.flash("info", "Welcome to PHR");
               }
               return res.send(data);
            })
            .catch((error) => {
               console.log("---- error -------", error);
               return res.status(error.statusCode).send(error.error);
            });
         });   
         
         self.route('put', 'update-alcohol', function(req, res) {
            const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'alcohol-path');
            self.middleware.put(req, res, url, req.body)
              .then((data) => {
                return res.send(data);
              })
              .catch((error) => {
                return res.status(error.statusCode).send(error.error);
              });
          });
        self.addDispatchRoutes = function () {
           self.dispatch('/add', self.middleware.checkAuth, self.alcohol);
           self.dispatch('/', self.middleware.checkAuth, self.alcoholview);
           self.dispatch('/edit/:id', self.middleware.checkAuth, self.alcoholedit);
        };
        self.alcohol = function (req, callback) {
         const slug_splits = req.slug.split('/');
         slug_splits.pop(); // /add is removed
         const view_page_route = slug_splits.join('/');
           return self.sendPage(req, self.renderer('alcohol', {
            parent_route: view_page_route,
            slug: req.slug,
            module_root: req.slug.split('/')[1]
           }));
        };
      self.alcoholview = function (req, callback) {
        const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'alcohol-path');        
        self.middleware.get(req, url)
          .then((data) => {
             const slug_splits = req.slug.split('/');
             slug_splits.pop(); // /add is removed
             const view_page_route = slug_splits.join('/');
            if (data.data && data.data.length > 0) {
              return self.sendPage(req, self.renderer('alcohol-view', {
                module_root: req.slug.split('/')[1],
                parent_route: view_page_route,
                slug: req.slug,
              }));
            }
             else {
              return self.sendPage(req, self.renderer('alcohol', {
                module_root: req.slug.split('/')[1],
              }));
            }
          })
          .catch((error) => {
            return self.sendPage(req, self.renderer('alcohol', {
              module_root: req.slug.split('/')[1]
            }));
          });
      };
      self.alcoholedit = function(req, callback) {
         const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'alcohol-path') + '/' + req.params.id;

         const unitsConsumed = ["Very Poor", "Poor", "Okay", "Well", "Very well", "Excellent"];

         self.middleware.get(req, url)
           .then((data) => {
            const slug_splits = req.slug.split('/');
            slug_splits.pop(); // /add is removed
            const view_page_route = slug_splits.join('/');
             return self.sendPage(req, self.renderer('alcohol-edit', {
               parent_route: view_page_route,
               module_root: req.slug.split('/')[1],
               alcohol: data.data,
               units :unitsConsumed,
               slug: req.slug,
              }));
           })
           .catch((error) => {
             return self.sendPage(req, self.renderer('alcohol-edit', {
               module_root: req.slug.split('/')[1]
             }));
           });
      };
      self.route('get', 'get-alcohol', function(req, res) {
        const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'alcohol-path') +'?startDate='+ req.query.startDate;
        self.middleware.get(req, url)
          .then((data) => {
            return res.send(data);
          })
          .catch((error) => {
            return res.status(error.statusCode).send(error.error);
          });
      });
     }
   }
