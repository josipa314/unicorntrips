const Agency = require("../models/Agency.model");

const router = require("express").Router();

const fileUploader = require("../config/cloudinary.config");

// READ: display list of agencies
router.get("/", (req, res, next) => {
  Agency.find()
    .then((agenciesArr) => {
      console.log(agenciesArr);
      res.render("agencies/agencies-list", { agencies: agenciesArr });
    })
    .catch((err) => {
      console.log("error getting agencies from DB", err);
      next(err);
    });
});

// CREATE ONE NEW AGENCY: render form
router.get("/create", (req, res, next) => {
  res.render("agencies/agency-create");
});

// CREATE ONE NEW AGENCY:: process form
router.post("/create", fileUploader.single("imageFile"), (req, res, next) => {
  const newAgency = {
    name: req.body.name,
    imageFile: req.file.path, //note: reading req.file
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    description: req.body.description,
    location: req.body.location,
    rating: req.body.rating,
  };

  Agency.create(newAgency)
    .then((agencyFromDB) => {
      //console.log(agencyFromDB);
      console.log(newAgency);
      res.redirect("/agencies");
    })
    .catch((err) => {
      console.log("error creating a new agency on DB", err);
      next(err);
    });
});

// READ ONE AGENCY DETAILS: display one Agency details
router.get("/:agencyId", (req, res, next) => {
  const id = req.params.agencyId;

  Agency.findById(id)
    .then((agencyDetails) => {
      console.log(agencyDetails);
      res.render("agencies/agency-details", agencyDetails);
    })
    .catch((err) => {
      console.log("error getting agency details from DB", err);
      next(err);
    });
});

// UPDATE ONE ACTIVITY: display form
router.get("/:agencyId/edit", (req, res, next) => {
  const id = req.params.agencyId;
  Agency.findByIdAndUpdate(id)
    .then((agencyDetails) => {
      console.log(agencyDetails);
      res.render("agencies/agency-edit", agencyDetails);
    })
    .catch((err) => {
      console.log("error getting aagency details from DB", err);
      next(err);
    });
});

// UPDATE ONE Agency: process form
router.post(
  "/:agencyId/edit",

  fileUploader.single("imageFile"),
  (req, res, next) => {
    const id = req.params.agencyId;

    const newDetails = {
      name: req.body.name,
      imageFile: req.file?.path, //note: reading req.file
      description: req.body.description,
      location: req.body.location,
      rating: req.body.rating,
    };

    Agency.findByIdAndUpdate(id, newDetails)
      .then((agencyFromDB) => {
        res.redirect("/agencies");
      })
      .catch((err) => {
        console.log("error updating agency in DB", err);
        next(err);
      });
  }
);

// DELETE that Agency:
router.post("/:agencyId/delete", (req, res, next) => {
  const id = req.params.agencyId;
  Agency.findByIdAndRemove(id)
    .then((response) => {
      res.redirect("/agencies");
    })
    .catch((err) => {
      console.log("error deleting Agency from DB", err);
      next(err);
    });
});
module.exports = router;
