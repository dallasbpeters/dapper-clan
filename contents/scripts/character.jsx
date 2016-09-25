import React from 'react';

const Character = ({ character }) => {
  if (!character) {
    return null;
  }

  return (
    <li className="character">
      Chacter stuff here.
    </li>
  );
}

export default Character;
