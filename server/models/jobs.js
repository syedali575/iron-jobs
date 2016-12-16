var dbConnect = require('./db-connect.js');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
  getAll,
  create,
  getOne,
  deleteOne

};

/**
 * Get all posted jobs
 * @param  {Function} done called with either error or array of job data
 * @return {Void}
 */
function getAll(done){
  dbConnect(function connectionHandeler(err, db){
    if(err) {
      done(err, null);
      return;
    }

    db.collection('jobs')
      .find().toArray(function modifyJobs(err, data){
        if (err) {
          done(err, null);
          return;
        }

        done(null, data.map(reviseData));
      });

  });

}



  /**
   * Create a single job
   * @param
   * @param  {Function} done called with either error or array of job data
   * @return {Void}
   */
  function create(data, done) {
    dbConnect(function connectionHandeler(err, db){
      if(err) {
        done(err, null);
        return;
      }
      data.createTime = Date.now();
      db.collection('jobs')
        .insert(data, function afterCreate(err, data){
          if(err) {
            done(err, null);
            return;
          }

          done(null, reviseData(data.ops[0]));


        });

    });
  }




  /**
   * Retrieve a single job
    * @param  {ID}   id   Id of job of a single job to retrieve
   * @param  {Function} done called with either error or array of job data
   * @return {Void}
   */
  function getOne(id, done){
    dbConnect(function connectionHandeler(err, db){
      if(err) {
        done(err, null);
        return;
      }

      db.collection('jobs')
        .findOne({ _id: new ObjectID(id) }, function findById(err, data){
          if (err) {
            done(err, null);
            return;
          }
          console.log("in getOne ----------", data);
          done(null, reviseData(data));
        });

    });

  }


  /**
   * [deleteOne description]
   * @param  {ID}   id   Id of job of a single job to delete
   * @param  {Function} done called with either error or array of job data
   * @return {Void}
   * */
  function deleteOne(id, done){
    dbConnect(function connectionHandeler(err, db){
      if(err) {
        done(err, null);
        return;
      }

      db.collection('jobs')
        .findOneAndDelete({ _id: new ObjectID(id) }, function findById(err, data){
          if (err) {
            done(err, null);
            return;
          }
          done(null, data);
        });

    });

  }

  /**
   * Take an object and create a new object with modified keys.
   * @param  {Object} oneData Job record
   * @return {Object}         Modified job record
   */
  function reviseData(oneData)
  {
    var newObject = {
      id: oneData._id,
      company: oneData.company,
      link: oneData.link,
      notes: oneData.notes,
      createTime: oneData.createTime
    };
    return newObject;
  }
