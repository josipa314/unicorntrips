const Activity = require("../models/Activity.model");
const Agency = require("../models/Agency.model");
const User = require("../models/User.model");

const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const isCreator = require("../middleware/isCreator");

//SHOW ALL ACTIVITIES/
router.get("/", (req, res, next) => {
  Activity.find()
    .populate("agency")
    .then((activitiesArr) => {
      //console.log(activitiesArr);
      res.render("activities/activities-list", { activities: activitiesArr });
    })
    .catch((err) => {
      console.log("error getting activities from DB", err);
      next(err);
    });
});

// CREATE ONE NEW ACTIVITY: render form
router.get("/create", isLoggedIn, (req, res, next) => {
  Agency.find()
    .then((agenciesArr) => {
      res.render("activities/activity-create", { agencies: agenciesArr });
    })
    .catch((err) => {
      console.log("error getting agencies from DB", err);
      next(err);
    });
});

// CREATE ONE NEW ACTIVITY: process form
router.post("/create", isLoggedIn, fileUploader.single("imageFile"), (req, res, next) => {
  const newActivity = {
    title: req.body.title,
    imageFile: req.file.path, //note: reading req.file
    description: req.body.description,
    agency: req.body.agency,
    location: req.body.location,
    difficulty: req.body.difficulty,
    rating: req.body.rating,
    price: req.body.price,
    creator: req.session.user
  };

  Activity.create(newActivity)
    .then((activityFromDB) => {
      //console.log(activityFromDB);
      //console.log(newActivity)
      //console.log(req.body);
      res.redirect("/activities");
    })
    .catch((err) => {
      console.log("error creating a new activity on DB", err);
      next(err);
    });
});

// READ ONE ACTIVITY DETAILS: display activity details
router.get("/:activityId", (req, res, next) => {
  const id = req.params.activityId;

  Activity.findById(id)
    .then((activityDetails) => {
      //console.log(activityDetails);
      res.render("activities/activity-details", activityDetails);
    })
    .catch((err) => {
      console.log("error getting activity details from DB", err);
      next(err);
    });
});

// UPDATE ONE ACTIVITY: display form
router.get("/:activityId/edit", (req, res, next) => {
  const id = req.params.activityId;
  Activity.findByIdAndUpdate(id)
    .populate("agency")
    .populate("creator")
    .then((activityDetails) => {
      //console.log(activityDetails);
      res.render("activities/activity-edit", activityDetails);
    })
    .catch((err) => {
      console.log("error getting activity details from DB", err);
      next(err);
    });
});

// UPDATE ONE ACTIVITY: process form
router.post(
  "/:activityId/edit", isCreator,
  fileUploader.single("imageFile"),
  (req, res, next) => {
    const id = req.params.activityId;

    const newDetails = {
      title: req.body.title,
      imageFile: req.file?.path, //note: reading req.file
      description: req.body.description,
    /*   agency: req.body.agency, */
      location: req.body.location,
      difficulty: req.body.difficulty,
      rating: req.body.rating,
      price: req.body.price,
    };

    Activity.findByIdAndUpdate(id, newDetails)
      .populate("creator")
      .then((activityFromDB) => {
/*         console.log(newDetails);
        console.log(activityFromDB);
        console.log(req.body); */
        res.redirect("/activities");
      })
      .catch((err) => {
        console.log("error updating activity in DB", err);
        next(err);
      });
  }
);

// DELETE that activity:
router.post("/:activityId/delete", isCreator, (req, res, next) => {
  const id = req.params.activityId;
  Activity.findByIdAndRemove(id)
    .then((response) => {
      res.redirect("/activities");
    })
    .catch((err) => {
      console.log("error deleting activity from DB", err);
      next(err);
    });
});

module.exports = router;
