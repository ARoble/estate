const express = require("express");
const router = express.Router();

const viewsControllers = require("./../controllers/viewsConrollers");
const authControllers = require("./../controllers/authControllers");

router.route("/").get(viewsControllers.getProperty);

router.route("/about").get((req, res) => {
  res.render("about", { title: "About | DhulDoon" });
});

router
  .route("/property/add")
  .get(
    authControllers.checkAuthenticated,
    authControllers.restrictTo("admin", "user"),
    viewsControllers.createPropertyForm
  )
  .post(viewsControllers.uploadImage, viewsControllers.createProperty);

router
  .route("/property/edit/:slug")
  .get(
    authControllers.checkAuthenticated,
    authControllers.restrictTo("admin", "user"),
    viewsControllers.editProperty
  )
  .post(viewsControllers.editTheProperty);

router
  .route("/property/edit/images/:slug")
  .get(
    authControllers.checkAuthenticated,
    authControllers.restrictTo("admin", "user"),
    viewsControllers.propertyImages
  )
  .post(viewsControllers.uploadImage, viewsControllers.editPropertyImages);

router.route("/property/:slug").get(viewsControllers.singleProperty);

router
  .route("/properties")
  .get(
    authControllers.checkAuthenticated,
    authControllers.restrictTo("admin", "user"),
    viewsControllers.getMyProperties
  );

router.route("/list").get(viewsControllers.listProperties);

router
  .route("/profile")
  .get(authControllers.checkAuthenticated, viewsControllers.profile);

router.route("/profile/edit/:id").post(viewsControllers.editProfile);

// router
//   .route("/dashboard")
//   .get(authControllers.restrictTo("admin"), viewsControllers.dashboard);

// router.route("/bid").get(viewsControllers.bidPage);

// router.route("/bid/:id").post(viewsControllers.bid);

// router.route("/bid/delete/:id").get(viewsControllers.bidDelete);

router
  .route("/password/change")
  .get(viewsControllers.renderChangePassowrd)
  .post(viewsControllers.changePassword);

router.route("/delete/:slug").get(viewsControllers.deleteProperty);

module.exports = router;

//SHOULD HAVE TWO ROUTES SALE AND RENT ??????
// authController.restrictTo('admin', 'lead-guide', 'guide'),
