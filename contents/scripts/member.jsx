import React from 'react';
import Character from './character';

const Member = ({ member }) => {
  if (!member || !member.displayName) {
    return null;
  }

  return (
    <li className="member">
      <h1 className="member__name">{member.displayName}</h1>
      <p className="member__about">{member.user.about}</p>
        <p className="member__about">Grimoire: {
          member.data
            ? member.data.grimoireScore
            : '0'
      }</p>
    <ul>
      {
        member.data && member.data.characters.map(
          (character) => (
            <Character
              key={character.characterBase.characterId}
              character={character}
            />
          )
        )
      }
    </ul>

    </li>
  );
}

export default Member;
