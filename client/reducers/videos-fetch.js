import addUniqueVideo from '../utils/add-unique-video.js';
import been from '../../helpers/utils/been.js';

const filterVideoIfStale = video => been(10).mins.since(video.fetchedAt);


//  TODO: should take a default state......
const videosFetch = (state, action) => {
  switch (action.type) {
    case 'FETCH_VIDEOS_PENDING':
      return { ...state, isFetching: true };
    case 'FETCH_VIDEOS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        lastFetched: Date.now(),
        after: action.payload.after,
        videos: addUniqueVideo(state.videos.filter(filterVideoIfStale), action.payload.videos)
      };
    case 'FETCH_VIDEOS_FAILED':
      return {
        ...state,
        isFetching: false,
        lastFetched: Date.now(),
        error: action.error
      };
    default:
      return state;
  }
};

export default videosFetch;
