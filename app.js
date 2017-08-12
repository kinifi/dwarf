
//the server name [NAME]-[LOCATION]
var serverName = "dwarf-sf";
//the polling time in milliseconds
var pollingTime = 1500;
//the timer object so we can cancel it in another function
var pollingObj;

//redis object
var redis = require('redis');

// //change to env variable
var client = redis.createClient("6379", "localhost");

// //we need to send it our password
// //change to env variable later
// client.auth(PASSWORD);

//exec child process so we can run commands
const execFile = require('child_process');

//////////////////////// test data methods

function createTestData () {

  for (i = 0; i < 5; i++) {
    client.hmset(serverName + guid(), {
      'servernumber': i,
      'command': 'start',
      'status': 'notstarted'
    });
  }

  for (i = 0; i < 5; i++) {
    client.hmset(serverName + guid(), {
      'servernumber': i,
      'command': 'start',
      'status': 'notstarted'
    });
  }

  console.log("test data written");

}



/////////////////////// redis callbacks

//called when the client successfully connects
client.on('connect', function() {
    console.log('connected');

    // createTestData();
    // getKeys();

    //1. start polling
    startPolling ();

});

//called when client gets an error
client.on("error", function (err) {
    console.log("Error " + err);
});

client.on("end", function (err) {
    console.log("End. Connection Ended");
});


/////////////////////////////////////////////////

//the method that gets called from the timer
function pollRedis () {

  //get all the keys
  getKeys();

}


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

    console.log(keys.length);

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
      // console.log(keys[i]);
      var n = keys[i].includes(serverName);
      if(n == true)
      {
        console.log("sf server");
      }
      // getServerInfo(keys[i]);
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
    if (err) return console.log(err)
    //check if it was a success
    if(reply == "1") {
        console.log("success");
    }

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

//generate a unique ID
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
