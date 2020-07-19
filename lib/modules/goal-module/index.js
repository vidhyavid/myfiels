
module.exports = {
   extend: 'apostrophe-custom-pages',
   label: 'Goal Module',
   afterConstruct: function (self) {
      self.addDispatchRoutes();
   },
   construct: function (self, options) {

      self.route('post', 'add-goal', function(req, res) {
         const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'goal-path') + '/create-goal-with-reminder';
         self.middleware.post(req, res, url, req.body)
            .then((data) => {
               return res.send(data);
            })
            .catch((error) => {
               return res.status(error.statusCode).send(error.error);
            });
      });

      self.route('get', 'search-goal-by-date', function(req, res) {
         let url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'goal-path') + '/date';
         if (req.query.date) {
            url += '?date='+req.query.date;
         }
         self.middleware.get(req, url)
            .then((data) => {
               return res.send(data);
            })
            .catch((error) => {
               return res.status(error.statusCode).send(error.error);
            });
      });

      self.route('put', 'complete-goal-task/:id', function(req, res) {
         const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'goal-path') + '/complete-step/'+req.params.id;
         self.middleware.put(req, res, url, req.body)
            .then((data) => {
               return res.send(data);
            })
            .catch((error) => {
               return res.status(error.statusCode).send(error.error);
            });
      });

      self.route('put', 'update-goal/:id', function(req, res) {
         const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'goal-path') + '/update/'+req.params.id;
         self.middleware.put(req, res, url, req.body)
            .then((data) => {
               return res.send(data);
            })
            .catch((error) => {
               return res.status(error.statusCode).send(error.error);
            });
      });

      require('../../middleware')(self, options);
      self.addDispatchRoutes = function () {
         self.dispatch('/',  self.middleware.checkAuth, self.goalOverview);
         self.dispatch('/add',  self.middleware.checkAuth, self.goalAdd);
         self.dispatch('/archived',  self.middleware.checkAuth, self.goalArchived);
         self.dispatch('/:id',  self.middleware.checkAuth, self.goalDetails); // needs to be last
      };

      self.goalOverview = function (req, callback) {
         return self.sendPage(req, self.renderer('goal_overview', {
            page_name: 'overview',
            module_root: req.slug.split('/')[1], // -> goals, assuming module is given a route /goals
         }));
      };

      self.goalAdd = function (req, callback) {
         return self.sendPage(req, self.renderer('goal_add', {
            page_name: 'add',
            module_root: req.slug.split('/')[1],
         }));
      };

      self.goalDetails = function (req, callback) {
         let uri = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'goal-path') + "/info/" + req.params.id;
         self.middleware.get(req, uri)
            .then((data) => {
               if (data.status == 'fail') {
                  console.log('no goal data found')
                  return req.res.redirect(`/${req.slug.split('/')[1]}`);
               }
               // console.log(JSON.stringify(data));
               return self.sendPage(req, self.renderer('goal_view_edit', {
                  page_name: 'overview',
                  module_root: req.slug.split('/')[1],
                  data: data.data
               }));
            })
            .catch(e => {
               console.log('--> exceptioned ', e);
               return req.res.redirect(`/${req.slug.split('/')[1]}`);
            })
      };

      self.goalArchived = function (req, callback) {
         return self.sendPage(req, self.renderer('goal_archived', {
            page_name: 'archived',
            module_root: req.slug.split('/')[1],
         }));
      };
   }
}
