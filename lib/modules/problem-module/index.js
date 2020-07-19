module.exports = {
  extend: 'apostrophe-custom-pages',
  label: 'Home Module',
  afterConstruct: function(self) {
    self.addDispatchRoutes();
  },
  construct: function(self, options) {
    require("../../middleware")(self, options);

    self.addDispatchRoutes = function() {
      self.dispatch('/', self.middleware.checkAuth, self.problem);
      self.dispatch('/edit/:id', self.middleware.checkAuth, self.problemEdit);
      self.dispatch('/add', self.middleware.checkAuth, self.problemAdd);
      self.dispatch('/view', self.middleware.checkAuth, self.problemView);
    };
    self.problem = function(req, callback) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'problem-path');
      console.log("=========== url ============", url);
      self.middleware.get(req, url)
        .then((data) => {
         
          if (data.data && (data.data.length > 0) && (data.data[0].entries_detail.length>0)) {
            return self.sendPage(req, self.renderer('problem-view', {
              module_root: req.slug.split('/')[1],
            }));
          }
          else if (data.data && (data.data.length > 0)) {
            return self.sendPage(req, self.renderer('problem-add', {
              module_root: req.slug.split('/')[1],
            }));
          }
           else {
            console.log(data,'datas222')
            return self.sendPage(req, self.renderer('problem', {
              module_root: req.slug.split('/')[1],
            }));
          }
        })
        .catch((error) => {          
          return self.sendPage(req, self.renderer('problem', {
            module_root: req.slug.split('/')[1]
          }));
        });

    };

    self.problemAdd = function(req, callback) {
      return self.sendPage(req, self.renderer('problem-add', {
        module_root: req.slug.split('/')[1]
      }));
    };

    self.problemView = function(req, callback) {
      return self.sendPage(req, self.renderer('problem-view', {
        module_root: req.slug.split('/')[1]
      }));
    };

    self.problemEdit = function(req, callback) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'problem-path') + '/' + req.params.id;
      self.middleware.get(req, url)
        .then((data) => {
          return self.sendPage(req, self.renderer('problem-edit', {
            module_root: req.slug.split('/')[1],
            problem: data.data
          }));
        })
        .catch((error) => {
          return self.sendPage(req, self.renderer('problem-edit', {
            module_root: req.slug.split('/')[1]
          }));
        });
    };

    self.route('post', 'add-problem', function(req, res) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'problem-path');
      self.middleware.post(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });

    self.route('post', 'add-problem-entry', function(req, res) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'problem-path') + '/entry';
      self.middleware.post(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });

    self.route('delete', 'delete-problem/:id', function(req, res) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'problem-path') + '/' + req.params.id;
      self.middleware.delete(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });

    self.route('put', 'update-problem', function(req, res) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'problem-path');
      self.middleware.put(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });

    self.route('get', 'get-problem', function(req, res) {
      const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'problem-path') +'?startDate='+ req.query.startDate;
      console.log(url,'currenturl1')
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
