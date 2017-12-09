var http = require('http');
var request = require('request');
var path = require('path');
var app = require('express');

var router = app();
var server = http.createServer(router);

router.use(app.static(path.resolve(__dirname, 'public')));

router.get('/', function(req, res){
    console.log('what is this');
});

router.get('/api/user/:consoleId/:username', function(req, clientRes) {
    const destinySearchUrl = 'https://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/'+ req.params.consoleId +'/' + req.params.username + '/';
    var options = {
        url: destinySearchUrl,
        headers: {
            'X-API-Key': process.env.bKey
        }
    }
    request(options, function(err, res, body) {
        var parsedSearchBody = JSON.parse(body);
        if (parsedSearchBody.Response.length) {
            var userData = parsedSearchBody.Response[0];
            var id = userData.membershipId;
            const destinyAccountUrl = 'https://www.bungie.net/Platform/Destiny/'+ req.params.consoleId +'/Account/' + id +'/Summary/';
            options.url = destinyAccountUrl;
            request(options, function(err, res, body) {
                var parsedAccountBody = JSON.parse(body);
                var destinyData = parsedAccountBody.Response.data;
                clientRes.json(destinyData);
            })
        } else {
            clientRes.status(404).send('User does not exist.')
        }
    })
})

server.listen(8081, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
