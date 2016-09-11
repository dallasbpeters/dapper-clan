import Main from './main.jsx';
import React from '../../node_modules/react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

// Go get the data, and if it comes through ok, display it with React
fetch('http://dapper.cloudno.de/')
  .then(function(response) {
    return response.json()
  })

  .then((data) => {
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
  })

  .catch(console.log);
