import React from 'react';
import Member from './member';

const Main = (props) => (
  <div>
    <ul>
      {
        props.members
          .filter((member) => !!member || !member.membershipId)
          .map((member, index) => <Member key={member.membershipId} member={member} />)
      }
    </ul>

  </div>
);

export default Main;
