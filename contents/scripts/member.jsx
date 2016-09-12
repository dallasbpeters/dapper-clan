const React = require('react');

const Member = ({ member }) => (
  <li>
    <img className="member_avatar" src={`http://bungie.net/${member.user.profilePicturePath}`} alt="member avatar"/>
    <span className="member_name">{member.user.displayName}</span>
    <span className="member_psn">{member.user.psnDisplayName}</span>

  </li>
);

export default Member;
