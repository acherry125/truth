var http = require('http');
var request = require('request');
var path = require('path');
var app = require('express');

var router = app();
var server = http.createServer(router);

router.use(app.static(path.resolve(__dirname, 'public')));

console.log(__dirname);

router.get('/', function(req, res){
    console.log('what is this');
});

router.get('/user/:consoleid/:userid', function(req, clientRes) {
    // TODO make this dynamic, replace the '1' and the 'Diffizzle' with consoleid and userid
    const destinyUrl = 'https://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/1/Diffizzle/';
    console.log(req.params.userid);
    var options = {
        url: destinyUrl,
        headers: {
            'X-API-Key': process.env.bKey
        }
    }
    request(options, function(err, res, body) {
        console.log('gotten: ', body);
        clientRes.send(body);
    })
})


server.listen(8081, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
