const express = require("express");
const propertyControllers = require("./../controllers/propertyControllers");

const router = express.Router();

router
  .route("/")
  .get(propertyControllers.getProperties)
  .post(propertyControllers.createProperty);

router
  .route("/:id")
  .get(propertyControllers.getProperty)
  .patch(propertyControllers.updateProperty)
  .delete(propertyControllers.deleteProperty);

module.exports = router;
