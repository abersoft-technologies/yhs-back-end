const express = require('express');
const authRoute = require('./auth.route');
const contactRoute = require('./contact.route');
const corpRoute = require('./corp.route');


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
    path: '/corp',
    route: corpRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
