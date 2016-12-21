import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PlayerDisplay from './PlayerDisplay.js';
import PlayerControls from './PlayerControls.js'
import {
  fetchVideos,
  loadVideos,
  goToNextVideo,
  goToPrevVideo
} from '../../actions/';

const mapStateToProps = (state) => ({
  ...state.videos,
  ...state.player
});
const mapDispatchToProps = (dispatch) => ({
  fetchVideos: () => dispatch(fetchVideos()),
  loadVideos: (activeVideo, nextVideo) => dispatch(loadVideos(activeVideo, nextVideo)),
  goToNextVideo: () => dispatch(goToNextVideo()),
  goToPrevVideo: () => dispatch(goToPrevVideo())
});


class Player extends Component {

  static propTypes = {
    //  state.videos
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired,
    after: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
    //  state.player
    activeVideo: PropTypes.object.isRequired,
    nextVideo: PropTypes.object.isRequired,
    prevVideo: PropTypes.object.isRequired,
    //  mapDispatchToProps.fetchVideos
    fetchVideos: PropTypes.func.isRequired,
    loadVideos: PropTypes.func.isRequired,
  };

  static defaultState = {
    activeVideo: {},
    nextVideo: {},
    prevVideo: {}
  };

  componentWillMount() {
    //  TODO:  do a "lastFetched" check
    if (!this.props.activeVideo.id) {
      this.props.fetchVideos();
    }
  }

  componentWillReceiveProps(nextProps) {
    //  TODO:  this seems kinds ugly...
    if (!this.props.activeVideo.id && nextProps.videos.length > 0) {
      // if (!this.props.activeVideo || !this.props.activeVideo.id) {
        this.props.loadVideos(nextProps.videos[0], nextProps.videos[1]);
        // if (this.props.after) {
          // this.props.fetchVideos(after);
        // }
      // }
    }
  }

  render() {
    return (
      <section className="player">
        <div className="player-l">
          <PlayerDisplay
            activeVideo={this.props.activeVideo}
          />
        </div>
        <div className="player-l">
          <PlayerControls
            handlePrevClick={() => console.log('prev')}
            handleNextClick={() => console.log('next')}
          />
        </div>
      </section>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
