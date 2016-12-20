import React, { PropTypes } from 'react';

const renderControls = controls => controls.map((ctrl, i) => (<li
  key={i}
  className={ctrl.className}
>{ctrl.children}</li>));


const PlayerControls = ({ controls }) => (
  <ul className="player--controls">
    {renderControls(controls)}
  </ul>);


PlayerControls.propTypes = {
  controls: PropTypes.array.isRequired
};

export default PlayerControls;
