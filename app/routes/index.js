'use strict';

const router = require('express').Router();
const addUser = require('../api/userHandler.js').addUser;
const exerciseHandler = require('../api/exerciseHandler.js');

router.get('/', (req, res) => {
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('index', { url: fullUrl });
});

// Add a new user
router.post('/api/exercise/new-user', addUser);

// Add a new exercise
router.post('/api/exercise/add', exerciseHandler.addExercise);

router.get('/api/exercise/log', exerciseHandler.getExercises);

module.exports = router;
