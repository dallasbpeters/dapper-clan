const React = require('react');

const Member = ({ member }) => (
  <li>
    { member.user.displayName + ' - ' + member.user.userTitleDisplay + ' ' }
    { member.isOriginalFounder && 'FOUNDER!!' }
    ({ member.isMember ? 'Member' : 'Pending' })
  </li>
)

const Main = (props) => (
  <div>
    <h1>Clan Members</h1>

    <ul>
      { props.members.map((member) => <Member key={member.membershipId} member={member} />) }
    </ul>

  </div>
);

module.exports = Main;
