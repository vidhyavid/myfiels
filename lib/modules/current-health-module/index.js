const _ = require('lodash');
module.exports = {
  extend: 'apostrophe-custom-pages',
  label: 'Current Health Module',
  afterConstruct: function(self) {
    self.addDispatchRoutes();
  },
  construct: function(self, options) {

    self.route('post', 'add-medications', function(req, res) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'my-health-path') + '/medications';
      console.log(url,'saveurl')

      self.middleware.post(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });

    self.route('delete', 'delete-medication/:id', function(req, res) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'my-health-path') + '/medications/' + req.params.id;
      self.middleware.delete(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });

    self.route('put', 'update-medications', function(req, res) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'my-health-path') + '/medications';
      self.middleware.put(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });
    //diagnosis

    self.route('post', 'add-diagnosis', function(req, res) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'my-health-path') + '/diagnosis';
      self.middleware.post(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });
    self.route('delete', 'delete-diagnosis/:id', function(req, res) {
      console.log("delete=========",req.params.id);
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'my-health-path') + '/diagnosis/' + req.params.id;
      self.middleware.delete(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });

    self.route('put', 'update-diagnosis', function(req, res) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'my-health-path') + '/diagnosis';
      self.middleware.put(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });

    require('../../middleware')(self, options);

    self.addDispatchRoutes = function() {
      self.dispatch('/view', self.middleware.checkAuth, self.diagnoses);
      self.dispatch('/',self.middleware.checkAuth,  self.diagnoses_view);
      self.dispatch('/edit', self.middleware.checkAuth, self.diagnoses_edit);
      self.dispatch('/medication/add', self.middleware.checkAuth, self.medication_add);
      self.dispatch('/medication', self.middleware.checkAuth, self.medication_view);
      self.dispatch('/medication/edit', self.middleware.checkAuth, self.medication_edit);
    };
    self.diagnoses = function(req, callback) {
      return self.sendPage(req, self.renderer('My-Health-Diagnoses', {
        module_root: req.slug.split('/')[1],
      }));
    };
    self.diagnoses_view = function(req, callback) {

      let uri = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'my-health-path') + "/diagnosis";
      self.middleware.get(req, uri)
        .then((data) => {
          let primaryDiagnoses = _.filter(data.data, {type: 'primary'});
          let secondaryDiagnoses = _.filter(data.data, {type: 'secondary'});
          return self.sendPage(req, self.renderer('My-Health-Diagnoses-view', {
            slug: req.slug,
            primaryDiagnoses: primaryDiagnoses,
            secondaryDiagnoses: secondaryDiagnoses,
            module_root: req.slug.split('/')[1]
          }));
        })
        .catch(e => {
          console.log('--> exceptioned ', e);
          return req.res.redirect(`/${req.slug.split('/')[1]}`);
        })

      // return self.sendPage(req, self.renderer('My-Health-Diagnoses-view', {}));
    };
    self.diagnoses_edit = function(req, callback) {
      let uri = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'my-health-path') + "/diagnosis";
      self.middleware.get(req, uri)
        .then((data) => {
          let primaryDiagnoses = _.filter(data.data, {type: 'primary'});
          let secondaryDiagnoses = _.filter(data.data, {type: 'secondary'});
          return self.sendPage(req, self.renderer('My-Health-Diagnoses-remove', {
            slug: req.slug,
            type:req.query.type,
            primaryDiagnoses: primaryDiagnoses,
            secondaryDiagnoses: secondaryDiagnoses,
            module_root: req.slug.split('/')[1]
          }));
        })
        .catch(e => {
          console.log('--> exceptioned ', e);
          return req.res.redirect(`/${req.slug.split('/')[1]}`);
        })
      // return self.sendPage(req, self.renderer('My-Health-Diagnoses-remove', {}));
    };
    self.medication_add = function(req, callback) {
      const slug_splits = req.slug.split('/');
      slug_splits.pop(); // /add is removed
      const view_page_route = slug_splits.join('/');
      return self.sendPage(req, self.renderer('My-Health-medications', {
        parent_route: view_page_route,
        slug: req.slug,
        module_root: req.slug.split('/')[1]
      }));
    };

    self.medication_view = function(req, callback) {
      let uri = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'my-health-path') + "/medications";
      self.middleware.get(req, uri)
        .then((data) => {
          return self.sendPage(req, self.renderer('My-Health-Medications-view', {
            slug: req.slug,
            data: data.data,
            module_root: req.slug.split('/')[1]
          }));
        })
        .catch(e => {
          console.log('--> exceptioned ', e);
          return req.res.redirect(`/${req.slug.split('/')[1]}`);
        })
    };

    self.medication_edit = function(req, callback) {
      let uri = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'my-health-path') + "/medications";
      self.middleware.get(req, uri)
        .then((data) => {
          const slug_splits = req.slug.split('/');
          slug_splits.pop(); // /add is removed
          const view_page_route = slug_splits.join('/');


          return self.sendPage(req, self.renderer('My-Health-Medications-remove', {
            slug: req.slug,
            parent_route: view_page_route,
            data: data.data,
            module_root: req.slug.split('/')[1],
          }));
        })
        .catch(e => {
          console.log('--> exceptioned ', e);
          return req.res.redirect(`/${req.slug.split('/')[1]}`);
        })
    };
  }
}
