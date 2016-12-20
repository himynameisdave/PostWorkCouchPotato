import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PlayerDisplay from './PlayerDisplay.js';
import PlayerControls from './PlayerControls.js'
import { fetchVideos, loadVideos } from '../../actions/';

const mapStateToProps = (state) => ({
  ...state.videos,
  ...state.player
});
const mapDispatchToProps = (dispatch) => ({
  fetchVideos: () => dispatch(fetchVideos()),
  loadVideos: (activeVideo, nextVideo) => dispatch(loadVideos(activeVideo, nextVideo))
});


class Player extends Component {

  static propTypes = {
    //  state.videos
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired,
    after: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    videos: PropTypes.array.isRequired,
    //  state.player
    activeVideo: PropTypes.object.isRequired,
    nextVideo: PropTypes.object.isRequired,
    prevVideo: PropTypes.object.isRequired,
    //  mapDispatchToProps.fetchVideos
    fetchVideos: PropTypes.func.isRequired
  };

  componentWillMount() {
    console.log(this.props);
    this.props.fetchVideos();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.videos.length <= nextProps.videos.length) {
      // this.props.loadVideos(ne);
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props.isFetching !== nextProps.isFetching ||
  //          this.props.error !== nextProps.error ||
  //          this.props.after !== nextProps.after ||
  //          this.props.videos.length !== nextProps.videos.length;
  //
  // }

  render() {
    return (
      <section className="player">
        <div className="player-l">
          <PlayerDisplay />
        </div>
        <div className="player-l">
          <PlayerControls
            controls={[ { className: 'yeye', children: (<span>yeye</span>) } ]}
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
