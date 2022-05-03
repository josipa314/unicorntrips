const Agency = require("../models/Agency.model");

const router = require("express").Router();

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

// CREATE: render form
router.get("/create", (req, res, next) => {
  Agency.find()
    .then((agenciesArr) => {
      res.render("agencies/agency-create", { agencies: agenciesArr });
    })
    .catch((err) => {
      console.log("error getting agency from DB", err);
      next(err);
    });
});

// CREATE: process form
router.post("/create", (req, res, next) => {
  const newAgency = {
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    rating: req.body.rating,
  };

  Agency.create(newAgency)
    .then((agencyFromDB) => {
      res.redirect("/");
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
            console.log(agencyDetails)
            res.render("agencies/agency-details", agencyDetails);
        })
        .catch(err => {
            console.log("error getting agency details from DB", err)
            next(err);
        });
})

// DELETE that Agency:
router.post("/:agencyId/delete",(req, res, next) => {
    const id = req.params.agencuId;
    Agency.findByIdAndRemove(id)
        .then(response => {
            res.redirect("/agencies");
        })
        .catch(err => {
            console.log("error deleting Agency from DB", err);
            next(err);
        });

});
module.exports = router;
