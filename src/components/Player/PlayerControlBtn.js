import React, { PropTypes } from 'react';
import truncate from 'truncate';

const PlayerControlsBtn = ({ direction, title, onClick }) => {
  return (
    <button
      className={`player-control-btn player-control-btn--t--${direction}`}
      onClick={onClick}
    >
      <span className="control-btn--text control-btn--text-direction">{direction}</span>
      <span className="control-btn--text control-btn--text-title">{truncate(title, 40)}</span>
    </button>
  );
};

PlayerControlsBtn.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PlayerControlsBtn;
