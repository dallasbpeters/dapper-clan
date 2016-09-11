const React = require('react');

const Member = function({ member }) {
  return (
    <li>
      { member.user.displayName + ' - ' + member.user.userTitleDisplay + ' ' }
      { member.isOriginalFounder && 'FOUNDER!!' }
      ({ member.isMember ? 'Member' : 'Pending' })
    </li>
  );
}

module.exports = Member;
