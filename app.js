
//the server name [NAME]-[LOCATION]
var serverName = "dwarf-sf";
//the polling time in milliseconds
var pollingTime = 1500;
//the timer object so we can cancel it in another function
var pollingObj;

//redis object
var redis = require('redis');
//change to env variable
var client = redis.createClient('6379', '165.227.11.227');
//we need to send it our password
//change to env variable later
//client.auth('');

//exec child process so we can run commands
const execFile = require('child_process');

//////////////////////// test data

function createTestData () {

  for (i = 0; i < 5; i++) {
    client.hmset('server' + i, {
      'location': 'sf',
      'command': 'start',
      'status': 'notstarted'
    });
  }

}



/////////////////////// redis callbacks

//called when the client successfully connects
client.on('connect', function() {
    console.log('connected');

});

//called when client gets an error
client.on("error", function (err) {
    console.log("Error " + err);
});

/////////////////////////////////////////////////



//run child process with command and args. example "node -version" or PATHTOFILE
function execCommand (commandWithArgs)
{
  const child = execFile(commandWithArgs, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
    console.log(stderr);
  });
}

//pass a key and get the object values attached to that key on the redis server
function getServerInfo(key) {
  client.hgetall(key, function(err, object) {
    console.log(object);
  });
}

//start polling the redis server for jobs
function startPolling () {

  pollingObj = setInterval(function() { pollRedis() }, pollingTime);
  console.log('Start Polling');
}

//stop polling the redis server for jobs
function stopPolling () {

  clearInterval(pollingObj);
  console.log('Stop Polling');
}

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
