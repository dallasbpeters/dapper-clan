'use strict';

const fetch = require('node-fetch');
const clan = require('./lib/clan');
const member = require('./lib/member');
const Hapi = require('hapi');

const getClanData = clan.getClanData;
const getClanMembers = clan.getClanMembers;
const getMemberData = member.getMemberData;

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: process.env.app_port || 8080
});

// Used to cache user data, which is refreshed every 15 minutes.
let data = {};

// Get clan info
function getData() {
    getClanData('485457')
    .then(function(clanData) {
      data.clan = clanData
    })
    .catch(function(err) {
      console.log('Problem getting clan data', err);
    });

    getClanMembers('485457')
    .then((memberData) => {
      const members = memberData.Response.results;
      const memberPromises = members.map((member) => getMemberData(member));
      return Promise.all(memberPromises);
    })
    .then(function(members) {
      data.members = members;
    })
    .catch(function(err) {
      console.log('Problem getting member data', err);
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
