# Maia 2 Apostrophe Frontend

## Apostrophe Links

- [Apostrophe 2 Boilerplate](https://github.com/punkave/apostrophe)
- [Getting started](http://apostrophecms.org/docs/tutorials/getting-started/creating-your-first-project.html)
- [Apostrophe's CLI](https://github.com/punkave/apostrophe)
- [A2 documentation site](http://apostrophecms.com)

## Up and running

- Have mongodb running.
- Run these in your terminal
  ```bash
  $ npm install
  $ node app.js apostrophe-users:add admin admin
  ```
   Set your password, for the `admin` user.
- Now you're all set! Just run `SERVICE_PHR="https://localhost:3001" node app.js` to start up the local server and head to `localhost:3000` in your web browser.
- Login as `admin` with the password you chose before.
- In the apostrophe menu choose pages and start adding routes to modules.

## Modules

### 1. Goals

For Apostrophe, set `/tracker/goals` as link to **Goals module**.

#### Full routes in goals module

1. `/tracker/goals` - Shows goal overview page
2. `/tracker/goals/add` - Can add a new goal
3. `/tracker/goals/:id` - Edit/View a particular goal (its view, if the user is opening an archived goal, and edit if it's an active goal)

### 2. My Health

For Apostrophe,
- set `/my-health/current-health` as link to **Current Health module**.
- set `/my-health/lifestyle` as link to **Lifestyle module**.

#### Full routes in my health module

1. `/my-health/current-health` - view diagnoses page
2. `/my-health/current-health/edit` - edit diagnoses page
3. `/my-health/current-health` - add diagnoses page
4. `/my-health/current-health/medication` - view medications page
5. `/my-health/current-health/medication/edit` - edit medications page
6. `/my-health/current-health/medication/add` - add medications page
7. `/my-health/lifestyle/health-factors` - view health-factors page
8. `/my-health/lifestyle/health-factors/edit` - edit health-factors page
9. `/my-health/lifestyle/activities` - view hobbies-activities page
10. `/my-health/lifestyle/activities/edit` - edit hobbies-activities page
11. `/my-health/lifestyle/activities/add` - add hobbies-activities page