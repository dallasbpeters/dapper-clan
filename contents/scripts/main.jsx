const React = require('react');
const Member = require('./member');

const Main = function(props) {
  return (
    <div>
      <h1>Clan Members</h1>

      <ul>
        {
          props.members.map(function(member) {
            return <Member key={member.membershipId} member={member} />;
          })
        }
      </ul>

    </div>
  );
}

module.exports = Main;
