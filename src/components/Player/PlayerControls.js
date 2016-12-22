import React, { PropTypes } from 'react';
import PlayerControlsBtn from './PlayerControlBtn.js';
import PlayerInfobox from './PlayerInfobox.js';


const handleClick = dir => () => console.log(`clicked on ${dir}`);

const PlayerControls = ({
  handlePrevClick,
  handleNextClick,
  nextVideoTitle,
  prevVideoTitle,
}) => {
  return (
    <ul className="player--controls">
      <li
        className="player--controls--control"
      >
        <PlayerControlsBtn
          direction="prev"
          onClick={handlePrevClick}
          title={prevVideoTitle}
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
          title={nextVideoTitle}
        />
      </li>
    </ul>
  );
};


PlayerControls.propTypes = {
  handlePrevClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  nextVideoTitle: PropTypes.string.isRequired,
  prevVideoTitle: PropTypes.string.isRequired
};

export default PlayerControls;
