const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// Get: /trips - list of all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Model.find({}).exec();
        
        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        } else {
            return res.status(200).json(trips);
        }
    } catch (err) {
        console.error("Error retrieving trips:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get: /trips/:tripCode - Find trip by code
const tripsFindByCode = async (req, res) => {
    try {
        const trip = await Model.findOne({ code: req.params.tripCode }).exec();
        
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        } else {
            return res.status(200).json(trip);
        }
    } catch (err) {
        console.error("Error finding trip:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// POST: /trips - Add a new Trip
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
    });

    try {
        const savedTrip = await newTrip.save();
        return res.status(201).json(savedTrip);
    } catch (err) {
        console.error("Error adding trip:", err);
        return res.status(400).json({ error: 'Failed to add trip' });
    }
};



// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
// Uncomment for debugging
console.log(req.params);
console.log(req.body);
const q = await Model
.findOneAndUpdate(
{ 'code' : req.params.tripCode },
{
code: req.body.code,
name: req.body.name,
length: req.body.length,
start: req.body.start,
resort: req.body.resort,
perPerson: req.body.perPerson,
image: req.body.image,
description: req.body.description
}
)
.exec();
if(!q)
{ // Database returned no data
  return res
    .status(400)
    .json(err);
} else { // Return resulting updated trip
  return res
    .status(201)
    .json(q);
}
// Uncomment the following line to show results of
operation
// on the console
// console.log(q);
};

module.exports = {
    tripsFindByCode,
    tripsList,
    tripsAddTrip,
    tripsUpdateTrip
};
