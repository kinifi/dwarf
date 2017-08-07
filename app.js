
var config = require('./config.js')
var redis = require('redis');
//change to env variable
var client = redis.createClient('6379', '165.227.11.227');
//we need to send it our password
//change to env variable later
//client.auth('');


client.on('connect', function() {
    console.log('connected');
});

client.on("error", function (err) {
    console.log("Error " + err);
});

//gets every key from the db
function getKeys () {

  client.keys('*', function (err, keys) {
    if (err) return console.log(err);
    //iterate through all the keys
    for(var i = 0, len = keys.length; i < len; i++) {

      // there is a better way to do this
      //1. search for the keys with the server name we are currently on
      //2. locally store this value
      //3. delete the key from the db
      //4. update the status to INPROGRESS and create a key-value in the db with the same info as the previous one just new status value
      //5. Perform the action needed
      //6. Delete the key from the db
      //7. update the status to COMPLETED and create a key-value in the db with the same info as the previous one just new status value
      //8. set the key to expire in 7 days
      console.log(keys[i]);
    }
  });

}

//sets an expiration date of the key
function expireKey (key, seconds) {

  client.expire(key, seconds);

}

//deletes a key from the db
function deleteKey (key) {

  client.del(key, function(err, reply) {
    console.log(reply);
  });

}

//does the key exist in the db
function doesKeyExist (key) {

  client.exists(key, function(err, reply) {
    if (reply === 1) {
        console.log('exists');
        return true;
    } else if(replay == 0) {
        console.log('doesn\'t exist');
        return false;
    }
    else {
      return err;
    }
  });

  return 0;

}
