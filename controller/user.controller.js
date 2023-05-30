const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();
// const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let user = await UserModel.find({ email });
    if (user.length) {
      return res.status(400).json({ error: "Ops! User Already exsists" });
    }
    bcrypt.hash(password, 8, async (err, secured_password) => {
      if (err) {
        res.send(err);
      }
      user = new UserModel({ email, password: secured_password, name });
      await user.save();
      res.status(201).send("User Registered !");
    });
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.find({ email });
    if (!user.length) {
      return res.status(400).json({ error: "Invalid user" });
    }
    const compare_password = await bcrypt.compare(password, user[0].password);
    if (!compare_password) {
      return res.status(400).json({ error: "Invalid credentials" });
    } else {
      return res.status(201).json({ message: "Login Successfull !" });
    }
  } catch (error) {
    res.status(500).send("Something went wrong !");
    console.log(error);
  }
};


exports.fetchUser = async (req, res) => {
  try {
    let query = req.query;
    const data = await UserModel.find(query);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
  }
};
