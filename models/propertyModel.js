const mongoose = require("mongoose");
const slugify = require("slugify");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A name for the propery is required"],
  },
  slug: String,
  status: {
    type: String,
    enum: {
      values: ["sale", "rent"],
      messages: "Type must be either sale or rent",
    },
  },
  propertyType: {
    type: String,
    required: [true, "A property type is required"],
  },
  price: Number,
  area: String,
  bedrooms: {
    type: Number,
    min: [0, "Bedrooms value must be above 0"],
    defualt: 0,
  },
  bathrooms: {
    type: Number,
    min: [0, "Bathrooms value must be above 0"],
    defualt: 0,
  },
  address: {
    type: String,
    required: [true, "A address for the propery is required"],
  },
  neighbourhood: {
    type: String,
    required: [true, "A area for the neighbourhood is required"],
  },
  city: {
    type: String,
    required: [true, "A city for the propery is required"],
  },
  description: {
    type: String,
    required: [true, "A description must be provided"],
  },
  buildingAge: String,
  water: Boolean,
  garage: Boolean,
  tiles: Boolean,
  furnished: Boolean,
  kitchenOutside: Boolean,
  imageCover: String,
  images: [String],
  droneFootage: String,
  dateListed: {
    type: Date,
    default: Date.now(),
  },
});

propertySchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lowercase: true });
  next();
});

const Properties = mongoose.model("properties", propertySchema);

module.exports = Properties;
