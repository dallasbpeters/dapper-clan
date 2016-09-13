'use strict';

const API_KEY = '7336c6e6af554f6dae06ff1651a132d5';
const fetch = require('node-fetch');

const getClanData = (clanId) => fetch(
  `https://www.bungie.net/Platform/Group/${clanId}`,
  {
    headers: {
      'X-API-Key': API_KEY
    }
  }
)
.then(function(response) {
  return response.json()
});

const getClanMembers = (clanId) => fetch(
  `https://www.bungie.net/Platform/Group/${clanId}/MembersV3/?lc=en&fmt=true&lcin=true&currentPage=1`,
  {
    headers: {
      'X-API-Key': API_KEY
    }
  }
)
.then(function(response) {
  return response.json()
});

module.exports = {
  getClanData,
  getClanMembers
};
