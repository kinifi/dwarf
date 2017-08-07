

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
