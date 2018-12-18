'use strict';

const moment = require('moment');
const findUser = require('./userHandler.js').findUser;
const Exercises = require('../models/exercise.js');

async function validateInputs(body) {
  // check if any of the body property is empty
  for(const [key, value] of Object.entries(body)) {
    if(key !== "date" && value === "")
      return key + " can't be empty!";
  }
  // check if the user exists
  let user = await findUser(body.username);
  if(user === null)
    return "User not found!";
  // check if the duration is a number
  let duration = parseInt(body.duration);
  if(isNaN(duration))
    return "Duration is not valid!";
  // check if the date is valid
  let date = (body.date === "") ? moment() : moment(body.date);
  if(!date.isValid())
    return "Date is not valid!";
  return {
    userId: user._id,
    duration: duration,
    date: date.format("YYYY-MM-DD")
  };
}

async function addExercise(req, res) {
  let validBody = await validateInputs(req.body);
  if(!(validBody instanceof Object))
    res.send(validBody);
  else {
    validBody.description = req.body.description;
    Exercises.create(validBody)
      .then(exercise => res.json(exercise))
      .catch(err => console.log(error))
  }
}

async function getExercises(req, res) {
  let userId = await findUser(req.query.username);
  let query = {
    userId: userId
  };
  if(req.query.from || req.query.to) {
    query.date = {};
    if(req.query.from)
      query.date.$gte = moment(req.query.from).format('YYYY-MM-DD');
    if(req.query.to)
      query.date.$lte = moment(req.query.to).format('YYYY-MM-DD');
  }
  Exercises.find(query).sort({ 'date': -1 }).limit(parseInt(req.query.limit))
    .then(result => res.json(result))
    .catch(err => res.send("Error!"))
}

module.exports = { addExercise, getExercises };
