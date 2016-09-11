import React from 'react';
import Member from './member';

const Main = (props) => (
  <div>
    <h1>Clan Members</h1>

    <ul>
      { props.members.map((member) => <Member key={member.membershipId} member={member} />) }
    </ul>

  </div>
);

export default Main;
