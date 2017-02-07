import { defaultVideosState } from './defaults.js';
import videosFetch from './videos-fetch.js';
import videosPlayer from './videos-player.js';


const videos = (state = defaultVideosState, action) => {
  // const mapSetNextVideoToActive = setNextVideoToActive(null);
  if (action.type.indexOf('FETCH_VIDEOS') > -1) {
    return videosFetch(state, action);
  }
  return videosPlayer(state, action);
};

export default videos;
