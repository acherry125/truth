var http = require('http');
var path = require('path');
var app = require('express');

var Promise = require("bluebird");
var request = require('request-promise');

var router = app();
var server = http.createServer(router);


router.use(app.static(path.resolve(__dirname, 'public')));

function makeBungieRequest(platform, url) {
    console.log(url)
    const requestUrl = 'https://www.bungie.net/Platform/' + platform + url;
    console.log(requestUrl);
    const options = {
        url: requestUrl,
        headers: {
            'X-API-Key': process.env.bKey
        }
    }
    return request(options);
}

function requestDestiny1(path) {
    return makeBungieRequest('Destiny', path);
}

router.get('/', function(req, res){
    console.log('what is this');
});

router.get('/api/d1/user/:consoleId/:username', function(req, clientRes) {
    const apiSearchPath = '/SearchDestinyPlayer/'+ req.params.consoleId +'/' + req.params.username + '/';
    requestDestiny1(apiSearchPath)
    .then(function(body) {
        console.log(body);
        var parsedSearchBody = JSON.parse(body);
        console.log(parsedSearchBody.Response && parsedSearchBody.Response.length);
        if (parsedSearchBody.Response && parsedSearchBody.Response.length) {
            var userData = parsedSearchBody.Response[0];
            var id = userData.membershipId;
            const apiAccountPath = '/'+ req.params.consoleId +'/Account/' + id +'/Summary/';
            return requestDestiny1(apiAccountPath);
        }
    })
    .then(function(body) {
        var parsedAccountBody = JSON.parse(body);
        var destinyData = parsedAccountBody.Response.data;
        clientRes.json(destinyData);
    })
    .catch(function(err) {
        clientRes.status(404).send('User does not exist.')
    })
})

server.listen(8081, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
