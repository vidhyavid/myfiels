const { device_detection } = require('../__utils__');

module.exports = {
   extend: 'apostrophe-custom-pages',
   label: 'Auth Module',
   afterConstruct: function (self) {
      self.addDispatchRoutes();
   },
   construct: function (self, options) {
      require('../../middleware')(self, options);
      self.route('post', 'signup', function (req, res) {
         var url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'account-path') + '/signup';
         self.middleware.post(req, res, url, req.body).then((data) => {
            if (!(data && data.message)) {
               req.session.auth_token = data.data.auth_token;
               req.session.reload(function () { });
               req.flash('info', 'Welcome to PHR');
            }
            return res.send(data);
         }).catch((error) => {
            console.log("---- error -------", error)
            return res.status(error.statusCode).send(error.error);
         });
      });
      self.route('put', 'signup_consent', function (req, res) {
         var url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'account-path') + '/update/signup_consent?user_uuid=' + req.query.user_uuid;
         self.middleware.put(req, res, url, req.body).then((data) => {
            if (!(data && data.message)) {
               req.session.auth_token = data.data.auth_token;
               req.session.reload(function () { });
               req.flash('info', 'Welcome to PHR');
            }
            return res.send(data);
         }).catch((error) => {
            console.log("---- error -------", error)
            return res.status(error.statusCode).send(error.error);
         });
      });


      // get login otp and login with otp routes
      self.route('post', 'send-login-otp', function (req, res) {
         var url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'account-path') + '/sendLoginotpmail';
         self.middleware.post(req, res, url, req.body).then((data) => {
            if (data.status == 'fail') {
               return res.status(400).send(data);
            }
            if (data.data.auth_token) {
               if (req.session.redirectto) {
                  data.redirectto = req.session.redirectto;
               }
               req.session.auth_token = data.data.auth_token;
               req.session.reload(function () { });
            }

            return res.send(data);
         }).catch((error) => {
            return res.status(error.statusCode).send(error.error);
         });
      })

      self.route('post', 'send-login-otp-mobile', function (req, res) {
         var url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'account-path') + '/send-login-otp-sms';
         self.middleware.post(req, res, url, req.body).then((data) => {
            return res.send(data);
         }).catch((error) => {
            return res.status(error.statusCode).send(error.error);
         });
      })

      self.route('post', 'login-with-otp', function (req, res) {
         var url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'account-path') + '/login-with-otp';
         self.middleware.post(req, res, url, req.body).then((data) => {
            if (data.status == 'fail') {
               return res.status(400).send(data);
            }
            if (req.session.redirectto) {
               data.redirectto = req.session.redirectto;
            }
            req.session.auth_token = data.data.auth_token;

            req.session.reload(function () { });
            return res.send(data);
         }).catch((error) => {
            return res.status(error.statusCode).send(error.error);
         });
      })
      // end of otp routes

      self.route('post', 'signupmailverification', function (req, res) {
         var url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'account-path') + '/signupmailverification';
         self.middleware.post(req, res, url, req.body).then((data) => {
            if (!(data && data.message)) {
               req.session.auth_token = data.data.auth_token;
               req.session.reload(function () { });
               req.flash('info', 'Welcome to PHR');
            }
            return res.send(data);
         }).catch((error) => {
            console.log("---- error -------", error)
            return res.status(error.statusCode).send(error.error);
         });
      });

      self.route('post', 'forgot', function (req, res) {
         var url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'account-path') + '/forgot';
         self.middleware.post(req, res, url, req.body).then((data) => {
            return res.send(data);
         }).catch((error) => {
            return res.status(error.statusCode).send(error.error);
         });
      });

      self.route('post', 'reset', function (req, res) {
         var url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'account-path') + '/reset';
         self.middleware.post(req, res, url, req.body).then((data) => {
            return res.send(data);
         }).catch((error) => {
            return res.status(error.statusCode).send(error.error);
         });
      });

      self.addDispatchRoutes = function () {
         self.dispatch('/new', self.ifSessionRedirectHome, self.signup);
         self.dispatch('/signup_consent', self.signupConsent);
         self.dispatch('/login', self.ifSessionRedirectHome, self.login);
         //self.dispatch('/reset', self.reset);
         self.dispatch('/forgot', self.ifSessionRedirectHome, self.forgot);
         self.dispatch('/verification', self.verification);
         self.dispatch('/reset', self.resetPasswordPage);
      };

      self.verification = function (req, callback) {
         if (!req.query.token || !req.query.userid) {
            return self.sendPage(req, self.renderer('verification', { data: 'Bad data' }));
         }

         var url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'account-path') + '/confirmmailverification?userid=' + req.query.userid + '&token=' + req.query.token;
         self.middleware.get(req, url)
            .then((data) => {
               return self.sendPage(req, self.renderer('verification', {
                 data,
                 module_root: req.slug.split('/')[1]
                }));
            })
            .catch(e => {
               // console.log(e);
               return self.sendPage(req, self.renderer('verification', { data: 'Account not found or might already be verified.' }));
            })
      };

      self.resetPasswordPage = function (req, callback) {
         const token = req.query.token;
         if (!token) {
            return req.res.redirect('/');
         }
         const url = self.apos.PHRMODULE.getOption(req, 'phr-module') + self.apos.PATH.getOption(req, 'account-path') + '/is-reset-valid?token=' + token;
         self.middleware.get(req, url).then((response) => {

            return self.sendPage(req, self.renderer('reset_password', {
              module_root: req.slug.split('/')[1] + '/' + req.slug.split('/')[2],
              response
            }));
         }).catch((e) => {
            console.log(e)
            return req.res.redirect('/');
            // return self.sendPage(req, self.renderer('login', { sitekey: process.env.CAPTCHA_SITE_KEY ? process.env.CAPTCHA_SITE_KEY : null }));
         });

         // return self.sendPage(req, self.renderer('reset-password', {}));
      };
      self.signup = function (req, callback) {
         const device_string = device_detection.getDeviceString(req);
         console.log('- device: ', device_string);
         return self.sendPage(req, self.renderer('signup', {
            // sitekey: '6LehoaMUAAAAAAwZPxPlNpmLYK6imhOXmhS7rEwB'
            module_root: req.slug.split('/')[1] + '/' + req.slug.split('/')[2],
            sitekey: process.env.CAPTCHA_SITE_KEY ? process.env.CAPTCHA_SITE_KEY : null,
            device_string
         }));
      };
      self.signupConsent = function (req, callback) {
         return self.sendPage(req, self.renderer('signup_consent', {
            module_root: req.slug.split('/')[1] + '/' + req.slug.split('/')[2],
         }));
      };
      self.login = function (req, callback) {
         const device_string = device_detection.getDeviceString(req);
         console.log('- device: ', device_string);
         return self.sendPage(req, self.renderer('login', {
            module_root: req.slug.split('/')[1] + '/' + req.slug.split('/')[2],
            device_string,
         }));
      };
      self.reset = function (req, callback) {
         return self.sendPage(req, self.renderer('reset_password', {
            module_root: req.slug.split('/')[1] + '/' + req.slug.split('/')[2],
         }));
      };
      self.forgot = function (req, callback) {
         return self.sendPage(req, self.renderer('forgot_password', {
            module_root: req.slug.split('/')[1] + '/' + req.slug.split('/')[2],
         }));
      };
   }
}
