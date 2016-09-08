'use strict';

const fetch = require('node-fetch');
const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: process.env.app_port || 8080
});

let data = {};

function getData() {
  fetch(
      'https://www.bungie.net/Platform/Group/1520166',
      {
        headers: {
          'X-API-Key': '10E792629C2A47E19356B8A79EEFA640'
        }
      }
    )
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      data.clan = json
    }).catch(function(ex) {
      console.log('response parsing failed', ex)
    });

  fetch(
      'https://www.bungie.net/Platform/Group/1520166/MembersV3/?lc=en&fmt=true&lcin=true&currentPage=1',
      {
        headers: {
          'X-API-Key': '10E792629C2A47E19356B8A79EEFA640'
        }
      }
    )
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      data.members = json
    }).catch(function(ex) {
      console.log('response parsing failed', ex)
    });
}
getData();
setInterval(getData, 15 * 60 * 1000);


// Add the route
server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {

        return reply('test');
        return reply(data).type('application/json; charset=utf-8');
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
