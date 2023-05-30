const express = require("express");
const userController = require("../controller/user.controller");
const flightController = require("../controller/flight.controller");
const bookingController = require("../controller/booking.controller");
const router = express.Router();


// ? USER
// ! REGISTER
router.post("/register", userController.registerUser);

// ! LOGIN
router.post("/login", userController.loginUser);

// ! GET
router.get("/user", userController.fetchUser);


// ? FLIGHT
// ! GET
router.get("/flights", flightController.fetchFlights);

router.get("/flights/:id", flightController.fetchFlightsById);


// ! POST
router.post("/flights", flightController.addFlights);


// ! PATCH
router.patch("/flights/:id", flightController.editFlights);


// ! DELETE
router.delete("/flights/:id", flightController.deleteFlights);


// ? BOOKING
// ! POST
router.post("/booking", bookingController.fetchBooking);

// ! GET
router.get("/dashboard", bookingController.fetchDashboard);


module.exports = router;
