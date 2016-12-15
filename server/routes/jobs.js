var express = require('express');
var jobsModel = require('../models/jobs.js');


var router = express.Router();

router.get('/', function allJobs(req, res){

  jobsModel.getAll(function dataRetrieved(err, data){
    if(err) {
      console.error(err);
      res.status(500).send("Unable to retrieve jobs data");
      return;
    }
    res.json(data);
  });
});
