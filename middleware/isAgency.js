const Activity = require("../models/Activity.model");

module.exports = (req, res, next) => {
    // checks if the agency is logged in when trying to access a specific page
    const id = req.params.activityId;
    Activity.findById(id)
    .populate("agency")
    .then( (activityFromDB) => {
        if (activityFromDB.agency._id.toString() !== req.session.user._id) {
            return res.redirect("/activities");
          }
    }
    )
    next();
  };
  