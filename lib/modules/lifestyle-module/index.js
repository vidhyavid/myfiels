module.exports = {
  extend: "apostrophe-custom-pages",
  label: "Health History Module",
  afterConstruct: function (self) {
    self.addDispatchRoutes();
  },
  construct: function (self, options) {
    require("../../middleware")(self, options);
    self.route("post", "health_factors", function (req, res) {
      var url =
        self.apos.PHRMODULE.getOption(req, "phr-module") +
        self.apos.PATH.getOption(req, "lifestyle-path") +
        "/health_factors";
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

    // activities/hobbies - start
    self.route("post", "add-hobbies-activities", function (req, res) {
      const url =
        self.apos.PHRMODULE.getOption(req, "phr-module") +
        self.apos.PATH.getOption(req, "my-health-path") +
        "/hobbies-activities";
      self.middleware
        .post(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });

    self.route("delete", "delete-hobby-activity/:id", function (req, res) {
      const url =
        self.apos.PHRMODULE.getOption(req, "phr-module") +
        self.apos.PATH.getOption(req, "my-health-path") +
        "/hobbies-activities/" +
        req.params.id;
      self.middleware
        .delete(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });

    self.route("put", "update-activities-hobbies", function (req, res) {
      const url =
        self.apos.PHRMODULE.getOption(req, "phr-module") +
        self.apos.PATH.getOption(req, "my-health-path") +
        "/hobbies-activities";
      self.middleware
        .put(req, res, url, req.body)
        .then((data) => {
          return res.send(data);
        })
        .catch((error) => {
          return res.status(error.statusCode).send(error.error);
        });
    });
    // activities/hobbies - end

    self.addDispatchRoutes = function () {
      self.dispatch("/", self.middleware.checkAuth, self.health_factors_view);
      self.dispatch("/edit", self.middleware.checkAuth, self.health_factors);
      self.dispatch("/activities", self.middleware.checkAuth, self.activities_view);
      self.dispatch("/activities/add", self.middleware.checkAuth, self.activities_add);
      self.dispatch("/activities/edit", self.middleware.checkAuth, self.activities_edit);
    };
    self.health_factors = function (req, callback) {
      var url =
        self.apos.PHRMODULE.getOption(req, "phr-module") +
        self.apos.PATH.getOption(req, "lifestyle-path") +
        "/health_factors";
        const slug_splits = req.slug.split("/");
        slug_splits.pop(); // /add is removed
        const view_page_route = slug_splits.join("/");
      self.middleware
        .get(req, url)
        .then((data) => {
          return self.sendPage(
            req,
            self.renderer("My-health-Factors", {
              data: data.data,
              slug: req.slug,
              module_root: req.slug.split('/')[1],
              parent_route: view_page_route,
            })
          );
        })
        .catch((error) => {
          return req.res.redirect("/");
        });
    };
    self.health_factors_view = function (req, callback) {
      var url =
        self.apos.PHRMODULE.getOption(req, "phr-module") +
        self.apos.PATH.getOption(req, "lifestyle-path") +
        "/health_factors";
      self.middleware
        .get(req, url)
        .then((data) => {
          var smokingArray = {
            1: "Current Smoker",
            2: "Ex-smoker",
            3: "Non-smoker - history unknown",
            3: "Non-smoker - history unknown",
            4: "Never smoked",
            5: "Not stated",
          };
          if (data.data) {
            if (smokingArray.hasOwnProperty(data.data.smoking)) {
              data.data.smoking = smokingArray[data.data.smoking];
            } else {
              data.data.smoking = null;
            }
          }
          if (data.data) {
            const height = data.data.height / 30.48;
            const heightInFeet = parseFloat(height, 10).toFixed(2);
            const heightWithInches = heightInFeet.split(".");
            data.data.height =
              heightWithInches[0] + "feet " + parseInt(heightWithInches[1]);
          }
          return self.sendPage(
            req,
            self.renderer("My-Health-Factors-view", {
              data: data.data,
              slug: req.slug,
              module_root: req.slug.split('/')[1],
            })
          );
        })
        .catch((error) => {
          return req.res.redirect("/");
        });
    };
    self.activities_add = function (req, callback) {
      const slug_splits = req.slug.split("/");
      slug_splits.pop(); // /add is removed
      const view_page_route = slug_splits.join("/");

      return self.sendPage(
        req,
        self.renderer("My-Health-Activities", {
          parent_route: view_page_route,
          module_root: req.slug.split('/')[1],
        })
      );
    };

    self.activities_view = function (req, callback) {
      let uri =
        self.apos.PHRMODULE.getOption(req, "phr-module") +
        self.apos.PATH.getOption(req, "my-health-path") +
        "/hobbies-activities";
      self.middleware
        .get(req, uri)
        .then((data) => {
          // console.log(JSON.stringify(data));
          return self.sendPage(
            req,
            self.renderer("My-Health-Activities-view", {
              slug: req.slug,
              data: data.data,
              module_root: req.slug.split('/')[1],
            })
          );
        })
        .catch((e) => {
          console.log("--> exceptioned ", e);
          return req.res.redirect(`/${req.slug.split("/")[1]}`);
        });
    };

    self.activities_edit = function (req, callback) {
      const slug_splits = req.slug.split("/");
      slug_splits.pop(); // /add is removed
      const view_page_route = slug_splits.join("/");

      let uri =
        self.apos.PHRMODULE.getOption(req, "phr-module") +
        self.apos.PATH.getOption(req, "my-health-path") +
        "/hobbies-activities";
      self.middleware
        .get(req, uri)
        .then((data) => {
          // console.log(JSON.stringify(data));
          return self.sendPage(
            req,
            self.renderer("My-Health-Activities-remove", {
              slug: req.slug,
              data: data.data,
              parent_route: view_page_route,
              module_root: req.slug.split('/')[1],
            })
          );
        })
        .catch((e) => {
          console.log("--> exceptioned ", e);
          return req.res.redirect(`/${req.slug.split("/")[1]}`);
        });
    };
  },
};
