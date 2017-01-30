import React, { PropTypes } from 'react';
import { FaStarO, FaUser, FaRedditAlien } from 'react-icons/lib/fa';
import numberToReadable from '../../utils/number-to-readable.js';

const PlayerInfobox = ({ title, score, author, reddit_link }) => {
    return (
        <div className="player__infobox">
            <h2 className="player__infobox__heading">{title}</h2>
            <div className="player__infobox__info">
                <FaStarO className="player__infobox__info--icon" />
                <span className="player__infobox__info--text">
                    {numberToReadable(score)}
                </span>
            </div>
            <div className="player__infobox__info">
                <FaUser className="player__infobox__info--icon" />
                <span className="player__infobox__info--text">
                    {author}
                </span>
            </div>
            <div className="player__infobox__info">
                <FaRedditAlien className="player__infobox__info--icon" />
                <a
                    href={`https://www.reddit.com${reddit_link}`}
                    className="player__infobox__info--text player__infobox__info--text--m--link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View comments
                </a>
            </div>
        </div>
    );
};

PlayerInfobox.propTypes = {
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    reddit_link: PropTypes.string.isRequired
};

export default PlayerInfobox;
