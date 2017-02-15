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
import been from '../../../helpers/utils/been.js';

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
      if (this.shouldFetchNewVideos()) {
          console.info('\n==========\nFETCHING NEW VIDS!\n==========\n' );
          if (this.props.player && this.props.player.nextVideo) {
              return this.props.fetchVideos(this.props.player.nextVideo.name);
          }
          this.props.fetchVideos();
      }
  }

  componentDidUpdate() {
    if (this.props.videos.length && !this.props.player.activeVideo) {
      this.props.loadVideos();
    }
  }

  getThumbnail = video => (video && video.embed && video.embed.thumbnail) || '';

  handleNextClick = () => {
      /// should fetch more vids????
      if (this.props.after && this.videosInQueueCount() < 5) {
          console.warn('\n\ndafug u doin mang?!\n', this.videosInQueueCount());

          this.props.fetchVideos(this.props.after);
      }
      return this.props.goToNextVideo();
  }

  handlePrevClick = () => {
    return !this.props.player.prevVideo ? () => {
      console.log('no prev video!');
      // TODO: DISPLAY SOM UI HERE...
    } : this.props.goToPrevVideo;
  }

  videosInQueueCount = () => {
      const { videos, player } = this.props;
      const nextId = player.nextVideo.id;
      const indNext = videos.reduce((a, b, i) => {
          if (b.id === nextId) a = i;
          return a;
      }, -1)
      return videos.length - indNext;
  }

  shouldFetchNewVideos = () => {
      return been(10).mins.since(this.props.lastFetched) || !this.props.player.activeVideo;
  }

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
