// dependencies
// start an instance of Router
const router = require('express').Router();
const {filterByQuery, findById, createNewZookeeper, validateZookeeper} = require('../../lib/zookeepers');
const {zookeepers} = require('../../data/zookeepers.json');

router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// add the rout for a specific zookeeper
router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// post request to add data to the server
router.post('/zookeepers', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = zookeepers.length.toString();
    // if any data in req.body is incorrect, send 400 error back
    if(!validateZookeeper(req.body)) {
        res.status(400).send('The zookeeper is not properly formatted.');
    } else {
        // add zookeeper to json file and zookepers array in this function
        const zookeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeper);
    }
});

//export the router
module.exports = router;