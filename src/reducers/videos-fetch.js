import addUniqueVideo from '../utils/add-unique-video.js';

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
        videos: addUniqueVideo(state.videos, action.payload.videos)
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
