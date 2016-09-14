'use strict';

const API_KEY = '7336c6e6af554f6dae06ff1651a132d5';
const fetch = require('node-fetch');

// Some fancy pants end points...
// /Platform/Destiny/2/Account/4611686018448728582/?lc=en
// Gimoire Score /Platform/Destiny/Vanguard/Grimoire/2/4611686018456164936/?single=110012&lc=en

// Another thing I think would be rad would be to setup a clan variable so that I/we could potentially open source this for other clans to start up their own. Not sure where that variable lives but it would be nice to just switch a config variable and load in a totally different clan!

// Remind me to talk to you about /player/{membershipId} which is found at
// https://github.com/DestinyTrialsReport/DestinyTrialsReport/blob/develop/app/shared/services/api.js:13
// and a screenshot: https://www.dropbox.com/s/j7bn2at519sp7wq/Screenshot%202016-09-12%2015.34.54.png?dl=0

const getMemberData = (member) => {

  const basicMemberPromise = new Promise((resolve, reject) => {
    if (!member || !member.user || !member.user.psnDisplayName) {
      return resolve(false);
    }

    console.log('Loading data for member', member.user.psnDisplayName);
    return resolve(
      fetch(
        `https://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/All/${member.user.psnDisplayName}`,
        { headers: { 'X-API-Key': API_KEY } }
      )
      .then((response) => response.json())
      .then((response) => response.Response[0])
      .then((response) => Object.assign({}, member, response))
      // .then((combinedResponse) => {
      //   console.log('\n\nmember', member);
      //   console.log('\ncombinedResponse', combinedResponse);
      //   return combinedResponse;
      // })
      .catch(console.log)
    );
  });

  const memberDataPromise = basicMemberPromise
    .then((member) => {
      if (!member || !member.membershipId) {
        return Promise.resolve(false);
      }

      console.log('loading extra data for', member.displayName, '-', member.membershipId);
      return fetch(
        `https://www.bungie.net/Platform/Destiny/2/Account/${member.membershipId}/?lc=en`,
        { headers: { 'X-API-Key': API_KEY } }
      )
     .then((response) => response.json())
    //  .then((response) => {
    //    console.log('memberData response', response);
    //    return response;
    //  })
     .then((response) => response.Response.data)
     .catch(console.log);
   }
 );

  return Promise.all([basicMemberPromise, memberDataPromise])
    .then((info) => {
      const member = info[0];
      if (!member) {
        return {};
      }

      const data = info[1];
      console.log('Done with member', member.displayName);
      return Object.assign({}, member, { data });
    })
}

module.exports = {
  getMemberData
};
