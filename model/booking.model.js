const mongoose = require("mongoose");
const flightSchema = mongoose.Schema({
    user: { type: String, ref: "User" },
    flight: { type: String, ref: "Flight" },
});

const BookingModel = mongoose.model("booking", flightSchema);

module.exports = {BookingModel};
