const Activity = require("../models/Activity.model");
const Agency = require("../models/Agency.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  Activity.find()
    .populate("agency")
    .then((activitiesArr) => {
      console.log(activitiesArr);
      res.render("activities/activities-list", { activities: activitiesArr });
    })
    .catch((err) => {
      console.log("error getting activities from DB", err);
      next(err);
    });
});

module.exports = router;
