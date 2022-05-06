const Activity = require("../models/Activity.model");

module.exports = (req, res, next) => {
    // checks if the agency is logged in when trying to access a specific page
    const id = req.params.activityId;
    Activity.findById(id)
    .populate("creator")
    .then( (activityFromDB) => {
        if (activityFromDB.creator._id.toString() !== req.session.user?._id) {
            return res.redirect("/activities");
          }
        next();
    }
  )
};
  