'use strict';

const fetch = require('node-fetch');
const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: process.env.app_port || 8080
});

let data = {};

// Get clan info
function getData() {
  fetch(
      'https://www.bungie.net/Platform/Group/485457',
      {
        headers: {
          'X-API-Key': '7336c6e6af554f6dae06ff1651a132d5'
        }
      }
    )
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
      data.clan = json
    })
    .catch(function(ex) {
      console.log('response parsing failed', ex)
    });


  // Get member stuff
  fetch(
      'https://www.bungie.net/Platform/Group/485457/MembersV3/?lc=en&fmt=true&lcin=true&currentPage=1',
      {
        headers: {
          'X-API-Key': '7336c6e6af554f6dae06ff1651a132d5'
        }
      }
    )
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
      data.members = json
      return json;
    })
    .then((json) => {
      const firstMember = json.Response.results[0];
      console.log('firstMember', firstMember);
      const url = `https://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/${firstMember.memberType}/${firstMember.user.psnDisplayName}`;

      // Some fancy pants end points...
      // /Platform/Destiny/2/Account/4611686018448728582/?lc=en
      // Gimoire Score /Platform/Destiny/Vanguard/Grimoire/2/4611686018456164936/?single=110012&lc=en

      // Another thing I think would be rad would be to setup a clan variable so that I/we could potentially open source this for other clans to start up their own. Not sure where that variable lives but it would be nice to just switch a config variable and load in a totally different clan!

      // Remind me to talk to you about /player/{membershipId} which is found at
      // https://github.com/DestinyTrialsReport/DestinyTrialsReport/blob/develop/app/shared/services/api.js:13
      // and a screenshot: https://www.dropbox.com/s/j7bn2at519sp7wq/Screenshot%202016-09-12%2015.34.54.png?dl=0

      console.log(url);
      return fetch(
          // `https://www.bungie.net/Platform/Destiny/2/Account/4611686018428939884/Summary/`,
          url,
          {
            headers: {
              'X-API-Key': '7336c6e6af554f6dae06ff1651a132d5'
            }
          }
        )
    })
    .then(function(response) {
      return response.json()
    })
    .then((data) => {
      console.log('member', data);
    })
    .catch(function(ex) {
      console.log('response parsing failed', ex)
    });

}
getData();
setInterval(getData, 15 * 60 * 1000);


// Add the route
server.route({
    method: 'GET',
    path: '/',
    config: {
      cors: true
    },
    handler: function (request, reply) {

        return reply(data);
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
