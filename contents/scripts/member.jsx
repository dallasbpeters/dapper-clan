const React = require('react');

const Member = ({ member }) => {
  if (!member || !member.displayName) {
    return null;
  }

  return (
    <li>
      { /* <img className="member_avatar" src={`http://bungie.net/${member.user.profilePicturePath}`} alt="member avatar"/> */ }
      <span className="member_name">{member.displayName}</span>

    </li>
  );
}

export default Member;
