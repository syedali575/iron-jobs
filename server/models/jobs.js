var dbConnect = require('./db-connect.js');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
  getAll,
  create,
  getOne

};

/**
 * get all posted jobs
 * @param  {Function} done called with either error or array of job data
 * @return {[type]}        [description]
 */
function getAll(done){
  dbConnect(function connectionHandeler(err, db){
    if(err) {
      done(err, null);
      return;
    }

    db.collection('jobs')
      .find().toArray(done);

  });

}

  function create(data, done) {
    dbConnect(function connectionHandeler(err, db){
      if(err) {
        done(err, null);
        return;
      }
      data.createTime = Date.now();
      db.collection('jobs')
        .insert(data, done);
    });
  }

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
          done(null, data);
        });

    });

  }
