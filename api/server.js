var http = require('http');
var path = require('path');
var app = require('express');

var request = require('request-promise');

var router = app();
var server = http.createServer(router);


router.use(app.static(path.resolve(__dirname, 'public')));

function makeBungieRequest(platform, url) {
    const requestUrl = 'https://www.bungie.net/Platform/' + platform + url;
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

// get a user's specific data with character info for a chosen character
function getUserCharacter(consoleId, accountId, characterIndex) {
    const apiAccountPath = '/'+ consoleId +'/Account/' + accountId +'/Summary/';
    var clientData = {};
    return new Promise(function(resolve, reject) {
        requestDestiny1(apiAccountPath)
        .then(function(body) {
            var parsedAccountBody = JSON.parse(body).Response.data;
            var equipmentData = parsedAccountBody.characters[0].characterBase.peerView.equipment;
            clientData.summary = parsedAccountBody;
            var subClassAPIPath = '/Manifest/InventoryItem/' + equipmentData[0].itemHash;
            var primaryAPIPath = '/Manifest/InventoryItem/' + equipmentData[6].itemHash;
            var specialAPIPath = '/Manifest/InventoryItem/' + equipmentData[7].itemHash;
            var heavyAPIPath = '/Manifest/InventoryItem/' + equipmentData[8].itemHash;
            var requests = [requestDestiny1(subClassAPIPath), requestDestiny1(primaryAPIPath), requestDestiny1(specialAPIPath), requestDestiny1(heavyAPIPath)];
            return Promise.all(requests);
        })
        // succesful data retrieval
        .then(function(body) {
            clientData.subClass = JSON.parse(body[0]).Response.data.inventoryItem.itemName;
            clientData.primaryWeapon = JSON.parse(body[1]).Response.data.inventoryItem.itemName;
            clientData.specialWeapon = JSON.parse(body[2]).Response.data.inventoryItem.itemName;
            clientData.heavyWeapon = JSON.parse(body[3]).Response.data.inventoryItem.itemName;
            resolve(clientData);
        })
        .catch(function(err) {
            reject(err);
        })
    })
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
            var parsedSearchBody = JSON.parse(body);
            if (parsedSearchBody.Response && parsedSearchBody.Response.length) {
                var userData = parsedSearchBody.Response[0];
                var id = userData.membershipId;
                // get user specific data, return promise made by makeBungieRequest
                return getUserCharacter(req.params.consoleId, id, 0);
            } else {
                throw new Error('User does not exist...');
            }
        })
        .then(function(clientData) { 
            clientRes.json(clientData);
        }) 
        // something bad happened, placeholder return
        .catch(function(err) {
            clientRes.status(404).send('User does not exist.');
        })
})

server.listen(8081, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
