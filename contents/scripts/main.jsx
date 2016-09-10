const React = require('react');
const Member = require('./member');

const Main = (props) => (
  <div>
    <h1>Clan Members</h1>

    <ul>
      { props.members.map((member) => <Member key={member.membershipId} member={member} />) }
    </ul>

  </div>
);

module.exports = Main;
