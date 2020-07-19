var path = require("path");
const dotenv = require("dotenv");
dotenv.config();

var apos = require("apostrophe")({
  shortName: "Maia2-Apostrophe",

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user accounts.

  modules: {
    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/apostrophe-assets/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here: `moduleName: {}`

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project
    "apostrophe-assets": {
      minify: true,
    },
    "auth-module": {},
    "goal-module": {},
    "home-module": {},
    "current-health-module": {},
    "lifestyle-module": {},
    "health-history-module": {},
    "aboutme-module": {},
    "skin-Setting": {},
    "mood-module": {},
    "alcohol-module": {},
    "problem-module": {},
    "keyhealth-info-module": {},
    "alcohol-module": {},
    "apostrophe-templates": {
      viewsFolderFallback: path.join(__dirname, "views"),
    },
    "apostrophe-db": {
      uri: process.env.MONGO_STRING,
    },
    "vc-module":{},
    settings: {
      // So we can write `apos.settings` in a template
      alias: "PHRMODULE",
      // NOTE: LIVE ENV FILE . Comment when working in local.
      //"phr-module": process.env.SERVICE_PHR,
       "phr-module": "https://localhost:3001",
    },
    path: {
      alias: "PATH",
      "account-path": "/account",
      "account-user": "/auth/user",
      "authentication-path": "/auth",
      "goal-path": "/goal",
      "my-health-path": "/my-health",
      "lifestyle-path": "/my-health",
      "profile-path": "/profile",
      "problem-path": "/problem",
      "alcohol-path": "/alcohol",
      "mood-path": "/mood"
    },
  },
});

console.log("------------- env start ------------------");
console.log(process.env);
console.log("------------- env end ------------------");
