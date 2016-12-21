import React, { PropTypes } from 'react';


const PlayerControlsBtn = ({ direction, onClick }) => (
  <button
    className={`control-btn control-btn--t--${direction}`}
    onClick={onClick}
  ><span className="control-btn--text">{direction}</span>
  </button>
);

PlayerControlsBtn.propTypes = {
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PlayerControlsBtn;
