const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //register model
const Model = mongoose.model('trips');

//Get: /trips - list of all trips
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client
const tripsList = async (req, res) => {
    const q = await Model.find({}) //Return single record
        .exec();

        //uncomment the following line to show the results of the query
        //on the console
        //console.log(q);

    if(!q)
    { //database returned no data
        return res
                .status(404)    
                .json(err);
    } else {//return resulting trip list
        return res  
            .status(200)
            .json(q);
    }
};
const tripsFindByCode = async (req, res) => {
    const q = await Model.find({ code: req.params.tripCode }).exec();
  
    // console.log(q);
  
    if (!q) {
      // Database returned no data
      return res.status(404).json(err);
    } else {
      // Return resulting trip list
      return res.status(200).json(q);
    }
  };
  

module.exports = {
    tripsFindByCode,
    tripsList
};