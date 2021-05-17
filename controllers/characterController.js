const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../models");

// CHECK AUTHENTICATION
const checkAuthStatus = request => {
  if (!request.headers.authorization) {
    return false;
  }
  token = request.headers.authorization.split(" ")[1];
  const loggedInUser = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, data) => {
      if (err) {
        return false;
      } else {
        return data;
      }
    }
  );
  console.log(loggedInUser);
  return loggedInUser;
};

// GET ALL CHARACTERS


// GET CHARACTER BY ID


// POST NEW CHARACTER


// EDIT PUT CHARACTER INFO


// DELETE CHARACTER