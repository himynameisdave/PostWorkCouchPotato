import React, { PropTypes } from 'react';
import truncate from 'truncate';

const getButtonStyles = thumb => ({ 'backgroundImage': `url('${thumb}')` });


const PlayerControlBtn = ({ direction, title, thumb, handleClick }) => (
    <button
      className={`player__controls__control__btn player__controls__control__btn--t--${direction}`}
      onClick={handleClick}
      style={getButtonStyles(thumb)}
    >
        <span className="player__controls__control--text player__controls__control--text-direction">
            {direction}
        </span>
        <span className="player__controls__control--text player__controls__control--text-title">
            {truncate(title, 40)}
        </span>
    </button>
);

PlayerControlBtn.propTypes = {
  direction: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default PlayerControlBtn;
