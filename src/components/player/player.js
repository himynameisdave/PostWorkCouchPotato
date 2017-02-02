import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PlayerDisplay from './player-display.js';
import PlayerControls from './player-controls.js'
import PlayerInfobox from './player-info-box.js';
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
  fetchVideos: after => dispatch(fetchVideos(after)),
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
      // TODO: DISPLAY SOM UI HERE...
    } : this.props.goToPrevVideo;
  }

  videosInQueueCount = () => {
      //  TODO: clean this mess up:
      const nextId = this.props.player.nextVideo && this.props.player.nextVideo.id;
      const currentIndex = this.props.videos.reduce((a, b, i) => b.id === nextId ? i : a, -1);
      const viewedVidsCount = this.props.videos && this.props.videos.slice(0, currentIndex).length;
      return this.props.videos.length - viewedVidsCount;
  }

  handleNextClick = () => {
      /// should fetch more vids????
      if (this.props.after && this.videosInQueueCount() < 5) {
          this.props.fetchVideos(this.props.after);
      }
      return this.props.goToNextVideo();
  }

  getThumbnail = video => (video && video.embed && video.embed.thumbnail) || '';

  render() {
    const player = this.props.player;
    const title = player && player.activeVideo && player.activeVideo.title ? player.activeVideo.title : '';
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
              handleNextClick={this.handleNextClick}
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
