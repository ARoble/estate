const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "A bid amount is required"],
  },
  user_id: String,
  property: String,
});

const Bid = mongoose.model("bid", bidSchema);

module.exports = Bid;
