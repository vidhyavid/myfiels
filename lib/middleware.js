const request = require('request-promise');

module.exports = function (self, options) {
  self.middleware = {
    checkAuth: function (req, res, next) {
      req.res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
      req.res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
      req.res.setHeader("Expires", "0"); //
      if (req.session.aposBlessings) {
        req.data.user_data = {};
        req.data.rolesIds = [];
        return next();
      } else if (!req.session.auth_token) {
        req.data.user_data = {};
        req.data.rolesIds = [];
        req.session.redirectto = req.url;
        req.session.reload(function () { });
        return req.res.redirect('/users/login');
      } else {
        let url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'authentication-path') + '/apostropheAuth';

        self.middleware.get(req, url).then((data) => {
          // console.log('--- ', data)
          if (data.status == 'error') {
            req.data.user_data = {};
            req.data.rolesIds = [];
            req.session.redirectto = req.url;
            req.session.reload(function () { });
            return req.res.redirect('/logout');
          }
          req.data.user_data = data.data;
          let rolesIds = [];
          for (let i = 0; i < data.data.roles.length; i++) {
            rolesIds.push(data.data.roles[i].id);
          }
          req.data.rolesIds = rolesIds;
          if (!req.data.user_data.user_demography.terms_and_condition || !req.data.user_data.user_demography.privacy_statement) {
            return req.res.redirect("/users/signup_tc");
          } else if (!req.data.user_data.user_demography.consent) {
            return req.res.redirect("/users/signup_consent");
          } else {
            next();
          }
        }).catch((e) => {
          console.log(e)
          req.data.user_data = {};
          req.data.rolesIds = [];
          req.session.redirectto = req.url;
          req.session.reload(function () { });
          return req.res.redirect('/users/login');
        });
      }
    },

    checkCommonPageAuth: function (req, res, next) {
      req.res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
      req.res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
      req.res.setHeader("Expires", "0"); //
      if (req.session.aposBlessings || !req.session.auth_token) {
        req.data.user_data = {};
        req.data.rolesIds = [];
        return next();
      } else {
        let url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'authentication-path') + '/apostropheAuth';
        self.middleware.get(req, url).then((data) => {
          req.data.user_data = data.data;
          let rolesIds = [];
          for (let i = 0; i < data.data.roles.length; i++) {
            rolesIds.push(data.data.roles[i].id);
          }
          req.data.rolesIds = rolesIds;
          next();
        }).catch(() => {
          req.data.user_data = {};
          req.data.rolesIds = [];
          return next();
        });
      }
    },

    post: function (req, res, url, body) {
      return new Promise((resolve, reject) => {
        let options = {
          method: 'POST',
          uri: url,
          body: body,
          headers: self.setHeader(req),
          json: true, // Automatically stringifies the body to JSON
          rejectUnauthorized: false, // temp certificate validation false
          resolveWithFullResponse: true // Get the full response instead of just the body
        };
        try {
          request(options)
            .then(function (response) {
              resolve(response.body);
            })
            .catch(function (err) {
              if (err.statusCode === 401 && req.session.auth_token) {
                req.session.destroy(function () { });
              } else if (err.error.code === 'ECONNREFUSED') {
                err.statusCode = 500;
              }
              reject(err);
            });
        } catch (error) {
          let err = {
            statusCode: 408,
            error: 'Request Timeout'
          };
          reject(err);
        }

      });
    },

    get: function (req, url) {
      return new Promise((resolve, reject) => {
        let options = {
          method: 'GET',
          uri: url,
          headers: self.setHeader(req),
          json: true, // Automatically stringifies the body to JSON
          rejectUnauthorized: false, // temp certificate validation false
          resolveWithFullResponse: true // Get the full response instead of just the body
        };
        try {
          request(options)
            .then(function (response) {
              resolve(response.body);
            })
            .catch(function (err) {
              if (err.statusCode === 401 && !req.session.aposBlessings) {
                req.session.auth_token = null;
                req.session.redirectto = req.url;
                req.session.reload(function () { });
                return req.res.redirect('/users/login');
              } else {
                err.statusCode = 500;
              }
              reject(err);
            });
        } catch (error) {
          let err = {
            statusCode: 408,
            error: 'Request Timeout'
          };
          reject(err);
        }
      });
    },

    put: function (req, res, url, body) {
      return new Promise((resolve, reject) => {
        let options = {
          method: 'PUT',
          uri: url,
          body: body,
          headers: self.setHeader(req),
          json: true, // Automatically stringifies the body to JSON
          rejectUnauthorized: false, // temp certificate validation false
          resolveWithFullResponse: true // Get the full response instead of just the body
        };
        try {
          request(options)
            .then(function (response) {
              resolve(response.body);
            })
            .catch(function (err) {
              if (err.statusCode === 401) {
                req.session.destroy(function () { });
              } else {
                err.statusCode = 500;
              }
              reject(err);
            });
        } catch (error) {
          let err = {
            statusCode: 408,
            error: 'Request Timeout'
          };
          reject(err);
        }

      });
    },

    delete: function (req, res, url, body) {
      return new Promise((resolve, reject) => {
        let options = {
          method: 'DELETE',
          uri: url,
          body: body,
          headers: self.setHeader(req),
          json: true, // Automatically stringifies the body to JSON
          rejectUnauthorized: false, // temp certificate validation false
          resolveWithFullResponse: true // Get the full response instead of just the body
        };
        try {
          request(options)
            .then(function (response) {
              resolve(response.body);
            })
            .catch(function (err) {
              if (err.statusCode === 401) {
                req.session.destroy(function () { });
              } else {
                err.statusCode = 500;
              }
              reject(err);
            });
        } catch (error) {
          let err = {
            statusCode: 408,
            error: 'Request Timeout'
          };
          reject(err);
        }

      });
    }
  };

  // this method is used to authendicate for pages not module
  self.checkCommonPageAuth = function(req) {
    return new Promise((resolve, reject) => {
        if (req.session.aposBlessings || !req.session.auth_token) {
          req.data.user_data = {};
          req.data.rolesIds = [];
          resolve(req);
        } else {
          let url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'authentication-path') + '/apostropheAuth';
          self.middleware.get(req, url).then((data) => {
            req.data.user_data = data.data;
            let rolesIds = [];
            for (let i = 0; i < data.data.roles.length; i++) {
              rolesIds.push(data.data.roles[i].id);
            }
            req.data.rolesIds = rolesIds;
            resolve(req);
          }).catch(() => {
            req.data.user_data = {};
            req.data.rolesIds = [];
            resolve(req);
          });
        }
    });
  };

  self.setHeader = function (req) {
    let headers;
    if (req.session.auth_token) {
      headers = {
        'Authorization': 'Bearer ' + req.session.auth_token,
        'domain_url': req.baseUrl ? req.baseUrl : req.data.baseUrl
      };
    } else {
      headers = {
        'domain_url': req.baseUrl ? req.baseUrl : req.data.baseUrl
      };
    }
    return headers;
  };

  self.loginRedirect = function (req, res, callback) {
    req.session.redirectto = req.url;
    req.session.reload(function () { });
    return req.res.redirect('/users/login');
  };

  self.ifSessionRedirectHome = function (req, res, next) {
    if (req.session.auth_token) {
      // TODO: the route should be home and not goals
      // we dont have that as of now
      return req.res.redirect('/tracker/goals');
    }
    return next();
  }
};
