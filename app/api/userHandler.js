'use strict';

const Users = require('../models/user.js');

function addUser(req, res) {
  let username = req.body.username;
  if(username === "")
    res.send("Invalid username!");
  else {
    Users.create({ username: username })
      .then(user => res.json(user))
      .catch(err => res.send("User already exists!"));
  }
}

function findUser(username) {
  let query = { username: username };
  return Users.findOne(query);
}

module.exports = { addUser, findUser };
