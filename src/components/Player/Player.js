import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PlayerDisplay from './PlayerDisplay.js';
import PlayerControls from './PlayerControls.js'
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
  // loadVideos: (activeVideo, nextVideo) => dispatch(loadVideos(activeVideo, nextVideo)),
  goToNextVideo: () => dispatch(playerNextVideo()),
  goToPrevVideo: () => dispatch(playerPrevVideo())
});


class Player extends Component {

  static propTypes = {
    //  state.videos
    // isFetching: PropTypes.bool.isRequired,
    // error: PropTypes.any.isRequired,
    // after: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
    player: PropTypes.shape({
      activeVideo: PropTypes.object,
      nextVideo: PropTypes.object,
      prevVideo: PropTypes.object,
    }).isRequired,
    // //  state.player
    // activeVideo: PropTypes.object.isRequired,
    // nextVideo: PropTypes.object.isRequired,
    // prevVideo: PropTypes.object.isRequired,
    // //  mapDispatchToProps.fetchVideos
    fetchVideos: PropTypes.func.isRequired,
    loadVideos: PropTypes.func.isRequired,
    goToNextVideo: PropTypes.func.isRequired,
    goToPrevVideo: PropTypes.func.isRequired,
  };

  static defaultState = {
    // activeVideo: {},
    // nextVideo: {},
    // prevVideo: {}
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

  render() {
    const { activeVideo } = this.props.player;
    const title = this.props.player && this.props.player.activeVideo && this.props.player.activeVideo.title ? this.props.player.activeVideo.title : '';
    return (
      <section className="player">
        <div className="player-l">
          {activeVideo ? (<PlayerDisplay
            activeVideo={activeVideo}
          />) : null}
        </div>
        <div className="player-l">
          <button onClick={this.handlePrevClick()}>
            Prev
          </button>
          <h1>{title}</h1>
          <button onClick={this.props.goToNextVideo}>
            Next
          </button>
        </div>
      </section>
    );
    /*
    return (
      <section className="player">
        <div className="player-l">
          <PlayerDisplay
            activeVideo={this.props.activeVideo}
          />
        </div>
        <div className="player-l">
          <PlayerControls
            handlePrevClick={this.props.prevVideo.id ? this.props.goToPrevVideo : () => null}
            handleNextClick={this.props.nextVideo.id ? this.props.goToNextVideo : () => null}
            prevVideoTitle={this.props.prevVideo.title || ''}
            nextVideoTitle={this.props.nextVideo.title || ''}
            goToPrevVideo={this.props.goToPrevVideo}
          />
        </div>
      </section>
    );
    */
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
