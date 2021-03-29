const express = require("express");
const router = express.Router();

const viewsControllers = require("./../controllers/viewsConrollers");
const authControllers = require("./../controllers/authControllers");

router.route("/").get(viewsControllers.getProperty);

router.route("/about").get((req, res) => {
  res.render("about");
});

router
  .route("/property/add")
  .get(
    authControllers.checkNotAuthenticated,
    authControllers.restrictTo("admin"),
    viewsControllers.createPropertyForm
  )
  .post(viewsControllers.uploadImage, viewsControllers.createProperty);

router
  .route("/property/edit/:slug")
  .get(
    authControllers.checkAuthenticated,
    authControllers.restrictTo("admin"),
    viewsControllers.editProperty
  )
  .post(viewsControllers.editTheProperty);

router
  .route("/property/edit/images/:slug")
  .get(
    authControllers.checkAuthenticated,
    authControllers.restrictTo("admin"),
    viewsControllers.propertyImages
  )
  .post(viewsControllers.uploadImage, viewsControllers.editPropertyImages);

router.route("/property/:slug").get(viewsControllers.singleProperty);

router
  .route("/properties")
  .get(
    authControllers.checkAuthenticated,
    authControllers.restrictTo("admin"),
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

router.route("/bid/:slug").post(viewsControllers.bid);

router
  .route("/password/change")
  .get(viewsControllers.renderChangePassowrd)
  .post(viewsControllers.changePassword);

router.route("/delete/:slug").get(viewsControllers.deleteProperty);

module.exports = router;

//SHOULD HAVE TWO ROUTES SALE AND RENT ??????
// authController.restrictTo('admin', 'lead-guide', 'guide'),
