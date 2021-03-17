const Properties = require("./../models/propertyModel");
const APIFeatures = require("./../utils/apiFeatures.js");

exports.getProperties = async (req, res) => {
  try {
    //const data = await Properties.find({});
    const features = new APIFeatures(Properties.find(), req.query)
      .sort()
      .limitFields()
      .pagination();

    const property = await features.query;

    res.status(200).json({
      status: "success",
      data: {
        property,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createProperty = async (req, res) => {
  try {
    const property = await Properties.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        property,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err,
    });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        property,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err,
    });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Properties.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(property);
    if (!property) {
      console.log("no property with that id");
    }
    res.status(202).json({
      message: "success",
      data: {
        property,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err,
    });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Properties.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      data: "null",
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err,
    });
  }
};
