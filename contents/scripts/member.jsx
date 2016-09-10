const React = require('react');

const Member = ({ member }) => (
  <li>
    { member.user.displayName + ' - ' + member.user.userTitleDisplay + ' ' }
    { member.isOriginalFounder && 'FOUNDER!!' }
    ({ member.isMember ? 'Member' : 'Pending' })
  </li>
);

module.exports = Member;
