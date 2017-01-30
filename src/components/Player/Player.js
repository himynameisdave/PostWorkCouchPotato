import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PlayerDisplay from './PlayerDisplay.js';
import PlayerControls from './PlayerControls.js'
import PlayerInfobox from './PlayerInfobox.js';
import {
  fetchVideos,
  playerLoadVideos,
  playerNextVideo,
  playerPrevVideo,
} from '../../actions/';

const mapStateToProps = (state) => ({
  ...state.videos
});

const mapDispatchToProps = (dispatch) => ({
  fetchVideos: () => dispatch(fetchVideos()),
  loadVideos: () => dispatch(playerLoadVideos()),
  goToNextVideo: () => dispatch(playerNextVideo()),
  goToPrevVideo: () => dispatch(playerPrevVideo())
});


class Player extends Component {

  static propTypes = {
    after: PropTypes.string.isRequired,
    videos: PropTypes.arrayOf(PropTypes.object).isRequired,
    player: PropTypes.shape({
      activeVideo: PropTypes.object,
      nextVideo: PropTypes.object,
      prevVideo: PropTypes.object,
    }).isRequired,
    fetchVideos: PropTypes.func.isRequired,
    loadVideos: PropTypes.func.isRequired,
    goToNextVideo: PropTypes.func.isRequired,
    goToPrevVideo: PropTypes.func.isRequired,
  };

  componentWillMount() {
    //  TODO:  do a "lastFetched" check
    // if (!this.props.activeVideo.id) {
      this.props.fetchVideos();
    // }
  }

  componentDidUpdate() {
    if (this.props.videos.length && !this.props.player.activeVideo) {
      this.props.loadVideos();
    }
  }

  handlePrevClick = () => {
    return !this.props.player.prevVideo ? () => {
      console.log('no prev video!');
    } : this.props.goToPrevVideo;
  }

  getThumbnail = video => (video && video.embed && video.embed.thumbnail) || '';

  render() {
    const player = this.props.player;
    const title = player && player.activeVideo && player.activeVideo.title ? player.activeVideo.title : '';
    console.log(player.activeVideo !== null ? player.activeVideo.embed : 'fartface!');
    return (
      <section className="player">
        <div className="player-l">
          {player.activeVideo ? (<PlayerDisplay
            activeVideo={player.activeVideo}
          />) : null}
        </div>
        <div className="player-l">
          {player.activeVideo ? (
            <PlayerInfobox {...player.activeVideo}/>
          ) : null}

        </div>
        <div className="player-l">
          {player.nextVideo ? <PlayerControls
              nextVideoTitle={player.nextVideo.title}
              handleNextClick={this.props.goToNextVideo}
              prevVideoTitle={(player.prevVideo && player.prevVideo.title) || ''}
              handlePrevClick={this.handlePrevClick()}
              nextThumb={this.getThumbnail(player.nextVideo)}
              prevThumb={this.getThumbnail(player.prevVideo)}
          /> : null}
        </div>
      </section>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
