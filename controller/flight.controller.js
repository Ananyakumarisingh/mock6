const FlightModel = require("../model/flight.model");

exports.fetchFlights = async (req, res) => {
  try {
    let query = req.query;
    const data = await FlightModel.find(query);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
  }
};

exports.fetchFlightsById = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await FlightModel.findById(ID);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
  }
};

exports.addFlights = async (req, res) => {
  try {
    const payload = req.body;
    const newData = new FlightModel(payload);
    await newData.save();
    res.status(201).send("Flight has been added to the system.");
  } catch (error) {
    res.status(500).send({ error: "Flight hasn't been added to the system." });
  }
};

exports.editFlights = async (req, res) => {
  try {
    const ID = req.params.id;
    const payload = req.body;
    await FlightModel.findByIdAndUpdate(ID, payload);
    res.status(204).send(`Fight of id:${ID} has been updated`);
  } catch (error) {
    res.status(500).send({ error: `Fight of id:${ID} hasn't been updated` });
  }
};

exports.deleteFlights = async (req, res) => {
  try {
    const ID = req.params.id;
    await FlightModel.findByIdAndDelete(ID);
    res.status(202).send(`Fight of id:${ID} has been deleted`);
  } catch (error) {
    res.status(500).send({ error: `Fight of id:${ID} hasn't been deleted` });
  }
};
