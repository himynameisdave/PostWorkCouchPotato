import React, { PropTypes } from 'react';
import PlayerControlBtn from './player-control-btn.js';

const PlayerControls = ({ nextVideoTitle, handleNextClick, prevVideoTitle, handlePrevClick, nextThumb, prevThumb }) => (
    <div className="player__controls">
        <div className="player__controls__control">
            <PlayerControlBtn
              direction="prev"
              title={prevVideoTitle}
              thumb={prevThumb}
              handleClick={handlePrevClick}
              isDisabled={!prevVideoTitle}
            />
        </div>
        <div className="player__controls__control">
            <PlayerControlBtn
              direction="next"
              title={nextVideoTitle}
              thumb={nextThumb}
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
  nextThumb: PropTypes.string,
  prevThumb: PropTypes.string,
};

export default PlayerControls;
