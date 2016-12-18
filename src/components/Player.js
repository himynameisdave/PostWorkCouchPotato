import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchVideos } from '../actions/';

const mapStateToProps = (state) => state.videos;
const mapDispatchToProps = (dispatch) => ({
  fetchVideos: () => dispatch(fetchVideos())
});


class Player extends Component {

  // static defaultProps = {
  //   isFetching: true,
  //   error: false,
  //   after: null,
  //   videos: []
  // }

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired,
    after: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    videos: PropTypes.array.isRequired,
    fetchVideos: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchVideos();
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <section className="player">
        player player
      </section>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
