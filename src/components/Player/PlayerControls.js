import React, { PropTypes } from 'react';
import PlayerControlBtn from './PlayerControlBtn';

const PlayerControls = ({ nextVideoTitle, handleNextClick, prevVideoTitle, handlePrevClick, }) => (
    <div className="player__controls">
        <div className="player__controls__control">
            <PlayerControlBtn
              direction="prev"
              title={prevVideoTitle}
              handleClick={handlePrevClick}
              isDisabled={!prevVideoTitle}
            />
        </div>
        <div className="player__controls__control">
            <PlayerControlBtn
              direction="next"
              title={nextVideoTitle}
              handleClick={handleNextClick}
              isDisabled={!nextVideoTitle}
            />
        </div>
    </div>
);

PlayerControls.propTypes = {
  nextVideoTitle: PropTypes.string.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  prevVideoTitle: PropTypes.string,
  handlePrevClick: PropTypes.func.isRequired,
};

export default PlayerControls;
