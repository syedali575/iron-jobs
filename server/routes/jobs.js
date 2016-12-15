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

router.post('/', function createJob(req, res){
  console.log(req.body);

  jobsModel.create(req.body, function jobCreated(err, data){
      if (err){
        console.error(err);
        res.status(500).send("Unable to create job data");
        return;
      }
      res.json(data);
  });
});

router.get('/:id([a-f0-9]{24})', function getSingleJob(req, res) {
  jobsModel.getOne(req.params.id, function jobRetrieved(err, data){
    if(err) {
      console.error(err);
      res.status(500).send("Unable to retrieve given job data");
      return;
    }
    res.json(data);
  });
});





module.exports = router;
