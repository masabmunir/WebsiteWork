var express = require('express');
const router = express.Router();
const movModal = require('../dataModals/movies.modal')
const ObjectID = require('mongoose').Types.ObjectId;
const { singleUser, getUser, addUser, } = require('../Controllers/users-controller');
const { delUser, getMovies, singleMovies, addMovies, updateMovies, delMovies } = require('../Controllers/movie-controller');


router.get('/', getMovies)

// Getting ID of Single Movie

router.get('/:id', singleMovies);

// Post Request 

router.post('/addMovie', addMovies);

//Update Route

router.put('/:id',updateMovies);

// Delete Route 

router.delete('/:id',delMovies);


module.exports = router;