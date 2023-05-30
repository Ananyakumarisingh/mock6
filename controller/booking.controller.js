const BookingModel = require("../model/booking.model");
const FlightModel = require("../model/flight.model");


exports.fetchDashboard = async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate(
      "flight",
      "-_id airline flightNo departure arrival departureTime arrivalTime seats price"
    );
    populate("user", "-_id name email");
    res.status(200).send(bookings);
  } catch (err) {
    res.status(500).send({ msg: "Error in retrieving bookings", error: err.message });
  }
};

exports.fetchBooking = async (req, res) => {
  try {
    const { userID, flightID } = req.body;
    if (!flightID || !userID) {
      return res.status(400).send({ msg: "flightID and userID required" });
    }

    const flight = await FlightModel.findById(flightID);
    if (!flight) {
      return res.status(404).send({ msg: "flight not found" });
    }

    const exsistingBooking = await BookingModel.findOne({ user: userID, flight: flightID });
    if (exsistingBooking) {
      return res.status(400).send({ msg: "Flight Already booked by user", booking });
    }

    const booking = new BookingModel({ user: userID, flight: flightID });
    await booking.save();
    res.status(200).send({ msg: "Flight booking sucessful", booking });
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Error in booking flight", error: error.message });
  }
};
