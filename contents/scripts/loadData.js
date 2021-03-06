import Main from './main.jsx';
import React from '../../node_modules/react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

console.log('here', document.getElementById('data'));

// Go get the data, and if it comes through ok, display it with React
fetch('http://dapper.cloudno.de/')
  .then(function(response) {
    return response.json()
  })

  .then((data) => {
    const members = data.members || [];
    const clan = data.clan
      ? data.clan.Response
      : [];
    console.log(members, clan);

    ReactDOM.render(
      <Main members={members} clan={clan} />,
      document.getElementById('team')
    );
  })

  .catch(console.log);
