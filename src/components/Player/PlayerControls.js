import React, { PropTypes } from 'react';
import PlayerControlsBtn from './PlayerControlBtn.js';
import PlayerInfobox from './PlayerInfobox.js';


const handleClick = dir => () => console.log(`clicked on ${dir}`);

const PlayerControls = ({ handlePrevClick, handleNextClick }) => {
  return (
    <ul className="player--controls">
      <li
        className="player--controls--control"
      >
        <PlayerControlsBtn
          direction="prev"
          onClick={handlePrevClick}
        />
      </li>
      <li
        className="player--controls--control"
      >
        <PlayerInfobox />
      </li>
      <li
        className="player--controls--control"
      >
        <PlayerControlsBtn
          direction="next"
          onClick={handleNextClick}
        />
      </li>
    </ul>
  );
};

export default PlayerControls;
