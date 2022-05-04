const Agency = require("../models/Agency.model");

module.exports = (req, res, next) => {
    // if an already logged in user tries to access the login page it
    // redirects the user to the home page
    if (req.session.user.id === Agency.owner.id) {
        next();
      return res.redirect('/');
    }
    next();
  };


  function isOwnerIslandHoppers (req, res, next) {
    if (req.user.role === 'owner') next();
    else res.redirect('/login');
  }
  
  function isOwnerFantasticVoyages (req, res, next) {
    if (req.user.role === 'owner') next();
    else res.redirect('/login');
  }
  
  module.exports = { 
    isOwnerIslandHoppers,
    isOwnerFantasticVoyages
  };