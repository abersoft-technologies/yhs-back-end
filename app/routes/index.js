const express = require('express');
const authRoute = require('./auth.route');
const contactRoute = require('./contact.route');
const corpRoute = require('./corp.route');
const eduRoute = require('./edu.route');
const letterRoute = require('./letter.route');
const orgRoute = require('./org.route');
const optionsRoute = require('./options.select.route');
const userRoute = require('./user.route');


const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/contact',
    route: contactRoute,
  },
  {
    path: '/letter',
    route: letterRoute,
  },
  {
    path: '/corp',
    route: corpRoute,
  },
  {
    path: '/edu',
    route: eduRoute,
  },
  {
    path: '/options/select',
    route: optionsRoute,
  },
  {
    path: '/org',
    route: orgRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
