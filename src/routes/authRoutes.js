// Modules for authentication routes
const passport = require('passport');

module.exports = (app) => {
  // main route for passport facebook
  app.get('/auth/facebook', passport.authenticate('facebook'));

  // route for callback after authentication //! still need be completed
  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      console.log('entrou aqui');

      res.redirect('/api/current_user'); //! <==
    }
  );

  // logout route redirecting for home
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // route to validade current user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
