import videosFetch from './videosFetch.js';
import videosPlayer from './videosPlayer.js';

//  TODO: break this off into it's own tyng
const defaultVideosState = {
  isFetching: false,
  lastFetched: 0,
  error: false,
  after: '',
  videos: [],
  player: {
    activeVideo: null,
    nextVideo: null,
    prevVideo: null,
  }
};


const videos = (state = defaultVideosState, action) => {
  // const mapSetNextVideoToActive = setNextVideoToActive(null);
  if (action.type.indexOf('FETCH_VIDEOS') > -1) {
    return videosFetch(state, action);
  }
  return videosPlayer(state, action);
};

export default videos;
