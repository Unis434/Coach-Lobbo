// dependencies
// start an instance of Router
const router = require('express').Router();
const {filterByQuery, findById, createNewAnimal, validateAnimal,} = require('../../lib/animals');
const {animals} = require('../../data/animals');

router.get('/animals', (req, res) => {
    // console.log(__dirname);
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// add the rout for a specific animal
// param route
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// post request to add data to the server

router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
    // req.body is where our incoming content will be 
    // console.log(req.body);
    // if any data in req.body is incorrect, send 400 error back
    if(!validateAnimal(req.body)) {
        res.status(400).send('The animal is not prperly formatted.');
    } else {
        // add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

// export the router
module.exports = router;