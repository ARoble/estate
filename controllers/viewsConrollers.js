const Properties = require("./../models/propertyModel");
const User = require("./../models/userModel");
const Bid = require("./../models/bidModel");
const APIFeatures = require("./../utils/apiFeatures.js");
const multer = require("multer");
const slugify = require("slugify");
const bcrypt = require("bcrypt");

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
  { name: "images", maxCount: 7 },
  { name: "droneFootage", maxCount: 1 },
]);

exports.getProperty = async (req, res, next) => {
  try {
    const properties = await Properties.find({}).sort("-dateListed");

    // const bid = await Bid.findById("60620f935c601669083453cd");
    // console.log("bid" + bid.property.address);

    res.render("index", { properties, title: "Home | DhulDoon" });
  } catch (err) {
    console.log(err);
  }
};

exports.createPropertyForm = async (req, res, next) => {
  try {
    res.render("submit-property", {
      formType: "add",
      title: "Add Property | DhulDoon",
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.createProperty = async (req, res, next) => {
  try {
    let imagesArray = [];

    if (req.files.images != undefined) {
      req.files.images.forEach((item) => {
        imagesArray.push(item.path);
      });
      req.body.images = imagesArray;
    }
    if (req.files.imageCover != undefined) {
      req.body.imageCover = req.files.imageCover[0].path;
    }
    if (req.files.droneFootage != undefined) {
      req.body.droneFootage = req.files.droneFootage[0].path;
    }

    const property = await Properties.create(req.body);
    console.log(req.body);
    req.flash("success", "Property Sucessfully added");
    res.redirect("/properties");
    //redirect to list of properties admin section
  } catch (err) {
    console.log(err.message);
  }
};

exports.singleProperty = async (req, res, next) => {
  try {
    const property = await Properties.findOne({ slug: req.params.slug });
    if (!property) {
      return next(
        new Error("Ooops sorry can't find the property your are looking for.")
      );
    }
    const latest = await Properties.find({ slug: { $ne: property.slug } })
      .sort("-dateListed")
      .limit(3);
    res.render("single-property", {
      property,
      latest,
      title: `${property.title} | DhulDoon`,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.singleProperty2 = async (req, res, next) => {
  try {
    const property = await Properties.findOne({ slug: req.params.slug });
    if (!property) {
      return next(
        new Error("Ooops sorry can't find the property your are looking for.")
      );
    }
    const latest = await Properties.find({ slug: { $ne: property.slug } })
      .sort("-dateListed")
      .limit(3);
    res.render("single-property-2", {
      property,
      latest,
      title: `${property.title} | DhulDoon`,
    });
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

    var properties = await features.query;

    if (properties.length === 0) {
      properties = await Properties.find({}).sort("-dateListed");
      var notFound = true;
    }

    res.render("list", {
      properties,
      notFound,
      title: "Property List | DhulDoon",
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Properties.find({}).sort("-dateListed");
    res.render("my-property", {
      properties,
      title: "My Properties | DhulDoon",
    });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    await Properties.deleteOne({ slug: req.params.slug });
    const properties = await Properties.find({}).sort("-dateListed");
    req.flash("success", "Property Sucessfully deleted");
    res.redirect("/properties");
  } catch (e) {
    console.log("fucking error akhi");
  }
};

exports.editProperty = async (req, res, next) => {
  try {
    const property = await Properties.findOne({ slug: req.params.slug });
    if (!property) {
      return next(new Error("Ooops that property doesn't exsist"));
    }
    res.render("submit-property", {
      property,
      formType: "edit",
      title: "Edit Property | DhulDoon",
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.propertyImages = async (req, res, next) => {
  try {
    const property = await Properties.findOne({ slug: req.params.slug }).select(
      "imageCover images droneFootage"
    );

    if (!property) {
      return next(new Error("Ooops that property doesn't exsist"));
    }

    res.render("change-image", {
      property,
      title: "Edit Property Image | DhulDoon",
    });
  } catch (err) {
    next(new Error("Ooops that property doesn't exsist"));
  }
};

exports.editPropertyImages = async (req, res) => {
  try {
    let imagesArray = [];

    if (req.files.imageCover != undefined) {
      req.body.imageCover = req.files.imageCover[0].path;
    }
    if (req.files.droneFootage != undefined) {
      req.body.droneFootage = req.files.droneFootage[0].path;
    }

    if (req.files.images != undefined) {
      req.files.images.forEach((item) => {
        imagesArray.push(item.path);
      });
      req.body.images = imagesArray;
    }

    await Properties.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
    });
    req.flash("success", "Property images Sucessfully edited");
    res.redirect("/properties");

    // console.log(req.body);
    // console.log(req.params.slug);
  } catch (err) {
    console.log(err.message);
  }
};

exports.editTheProperty = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title, { lowercase: true });

    const property = await Properties.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    req.flash("success", "Property Sucessfully edited");
    res.redirect("/properties");
  } catch (e) {
    console.log(e);
  }
};

exports.editProfile = async (req, res) => {
  try {
    // await User.findOne({ email: req.body.email });

    // if (emailCheck) {
    //   req.flash("danger", "User information sucessfully updated");
    //   return res.redirect("/profile");
    // }
    await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    req.flash("success", "User information sucessfully updated");
    res.redirect("/dashboard");
  } catch (e) {
    console.log(e);
  }
};

exports.profile = (req, res) => {
  try {
    res.render("my-profile", { title: "Profile | DhulDoon" });
  } catch (e) {
    console.log(e);
  }
};

exports.renderChangePassowrd = (req, res) => {
  try {
    res.render("change-password", { title: "Change Password | DhulDoon" });
  } catch (e) {
    console.log(e);
  }
};

exports.dashboard = async (req, res) => {
  const stats = await Properties.aggregate([
    {
      $group: {
        _id: "$status",
        numProperty: { $sum: 1 },
      },
    },
  ]);
  console.log(stats);
  res.render("dashboard", stats);
};

exports.bidPage = async (req, res) => {
  try {
    const bid = await Bid.find({ user_id: req.user.id })
      .populate("property user_id")
      .sort("-bidDate");

    res.render("bid", { bid });
  } catch (e) {
    console.log(e);
  }
};
exports.bid = async (req, res) => {
  try {
    // const property = await Properties.findOne({ slug: req.params.slug });
    // await Bid.create({
    //   amount: req.body.amount,
    //   user_id: req.user.id,
    //   property: property.id,
    // });
    const anotherTest = await Bid.find({
      user_id: req.user.id,
      property: req.params.id,
    });

    if (anotherTest[0] === undefined) {
      await Bid.create({
        amount: req.body.amount,
        user_id: req.user.id,
        property: req.params.id,
      });
      req.flash("success", "Bid sucessfully submitted");
      res.redirect("/bid");
    } else {
      req.flash("danger", "You have already placed a bid for this property");
      res.redirect("/bid");
    }

    // const test = await Bid.find({ user_id: req.user.id }).populate(
    //   "property user_id"
    // );

    // console.log("saved this bid");
  } catch (e) {
    console.log(e);
  }
};

exports.bidDelete = async (req, res) => {
  try {
    await Bid.findByIdAndDelete(req.params.id);
    req.flash("success", "You have succesfully deleted property bid");
    res.redirect("/bid");
  } catch (e) {
    console.log(e);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(res.locals.user._id).select("+password");

    if (!(await bcrypt.compare(req.body.oldPassword, user.password))) {
      // req.flash("danger", "Old password is incorrect");
      console.log("incorrect old password");
      return res.redirect("/password/change");
    }

    if (req.body.newPassword != req.body.confirmPassword) {
      // req.flash("danger", "New passwords dont match");
      console.log("passwords dont match");
      return res.redirect("/password/change");
    }

    user.password = await bcrypt.hash(req.body.newPassword, 12);
    user.save();
    console.log("passwords are changed habibi");
    res.redirect("/password/change");
  } catch (error) {
    console.log(error);
  }
};

exports.contact = (req, res) => {
  try {
    res.render("contact", { title: "Contact Us | DhulDoon" });
  } catch (error) {
    console.log(error);
  }
};
