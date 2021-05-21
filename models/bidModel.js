const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bidSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "A bid amount is required"],
  },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  property: { type: Schema.Types.ObjectId, ref: "properties" },
  bidDate: {
    type: Date,
    default: Date.now(),
  },
});

const Bid = mongoose.model("bid", bidSchema);

module.exports = Bid;
