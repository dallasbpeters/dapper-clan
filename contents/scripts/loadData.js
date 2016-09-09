require('whatwg-fetch');
fetch('http://dapper.cloudno.de/')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    displayData(json);
  }).catch(function(ex) {
    console.log('parsing failed', ex);
  });

const Main = require('./main.jsx');
const React = require('../../node_modules/react');
const ReactDOM = require('react-dom');

function displayData(data) {
  const members = data.members && data.members.Response
    ? data.members.Response.results
    : [];
  const clan = data.clan && data.clan.Response
    ? data.clan.Response.results
    : [];
  console.log(members);

  ReactDOM.render(
    <Main members={members} clan={clan} />,
    document.getElementById('data')
  );
}
