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

// GET call for the homepage/search page
router.get('/', function(req, res){
    console.log('what is this');
});

// GET call for the User Detail Page
router.get('/api/d1/user/:consoleId/:username', function(req, clientRes) {
    const apiSearchPath = '/SearchDestinyPlayer/'+ req.params.consoleId +'/' + req.params.username + '/';
    // make call to check for user's existence
    requestDestiny1(apiSearchPath)
        .then(function(body) {
            console.log(body);
            var parsedSearchBody = JSON.parse(body);
            console.log(parsedSearchBody.Response && parsedSearchBody.Response.length);
            if (parsedSearchBody.Response && parsedSearchBody.Response.length) {
                var userData = parsedSearchBody.Response[0];
                var id = userData.membershipId;
                const apiAccountPath = '/'+ req.params.consoleId +'/Account/' + id +'/Summary/';
                // get user specific data, return promise made by makeBungieRequest
                return requestDestiny1(apiAccountPath);
            }
        })
        // succesful data retrieval
        .then(function(body) {
            var parsedAccountBody = JSON.parse(body);
            var destinyData = parsedAccountBody.Response.data;
            clientRes.json(destinyData);
        })
        // something bad happened, placeholder return
        .catch(function(err) {
            clientRes.status(404).send('User does not exist.')
        })
})

server.listen(8081, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
