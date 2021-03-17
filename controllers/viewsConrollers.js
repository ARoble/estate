const Properties = require("./../models/propertyModel");
const APIFeatures = require("./../utils/apiFeatures.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

const upload = multer({
  storage: storage,
});

exports.uploadImage = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

exports.getProperty = async (req, res, next) => {
  try {
    const properties = await Properties.find({});
    res.render("index", { properties });
  } catch {
    console.log("error!!");
  }
};

exports.createPropertyForm = async (req, res, next) => {
  try {
    res.render("submit-property");
  } catch (err) {
    console.log(err.message);
  }
};

exports.createProperty = async (req, res, next) => {
  try {
    let imagesArray = [];
    req.files.images.forEach((item) => {
      imagesArray.push(item.path);
    });
    console.log(imagesArray);
    req.body.images = imagesArray;
    req.body.imageCover = req.files.imageCover[0].path;
    const property = await Properties.create(req.body);
    console.log(property);
    //redirect to list of properties admin section
  } catch (err) {
    console.log(err.message);
  }
};

exports.singleProperty = async (req, res, next) => {
  try {
    const property = await Properties.findOne({ slug: req.params.slug });
    if (!property) {
      return next(new Error("Property not found man"));
    }
    const latest = await Properties.find({ slug: { $ne: property.slug } })
      .sort("-dateListed")
      .limit(3);
    res.render("single-property", { property, latest });
  } catch (err) {
    console.log(err.message);
  }
};

exports.listProperties = async (req, res) => {
  try {
    const features = new APIFeatures(Properties.find(), req.query)
      .filter()
      .sort();
    // .limitFields()
    // .pagination();

    const properties = await features.query;

    res.render("list", { properties });
  } catch (err) {
    console.log(err.message);
  }
};
