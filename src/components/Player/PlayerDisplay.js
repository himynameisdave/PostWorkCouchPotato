import React, { PropTypes } from 'react';
import { AllHtmlEntities } from 'html-entities';
import Loady from '../Loady/Loady.js';

const decoder = new AllHtmlEntities();
const decode = data => decoder.decode(data);
const generateEmbedComponent = data => ({ __html: decode(data) });


const PlayerDisplay = ({ activeVideo }) => (
  <div className="player--display">
    {!activeVideo || !activeVideo.id ? <Loady /> : (
      <div
        className="player--display-l"
        dangerouslySetInnerHTML={generateEmbedComponent(activeVideo.embed.html)}
      />
    )}
  </div>
);

PlayerDisplay.propTypes = {
  activeVideo: PropTypes.object.isRequired
};

export default PlayerDisplay;
