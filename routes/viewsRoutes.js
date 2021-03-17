const express = require("express");
const router = express.Router();

const viewsControllers = require("./../controllers/viewsConrollers");

router.route("/").get(viewsControllers.getProperty);
router
  .route("/add-property")
  .get(viewsControllers.createPropertyForm)
  .post(viewsControllers.uploadImage, viewsControllers.createProperty);

router.route("/property/:slug").get(viewsControllers.singleProperty);

router.route("/list").get(viewsControllers.listProperties);

module.exports = router;

//SHOULD HAVE TWO ROUTES SALE AND RENT ??????
