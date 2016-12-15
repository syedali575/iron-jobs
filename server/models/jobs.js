var dbConnect = require('./db-connect.js');


module.exports = {
  getAll

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
