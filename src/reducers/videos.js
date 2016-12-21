
const defaultVideosState = {
  isFetching: false,
  lastFetched: 0,
  error: false,
  after: '',
  videos: []
};

//  No dupes
const addVideos = (oldVideos, newVideos) => {
  let unique = [];
  return oldVideos.concat(newVideos).filter(({ id }) => {
    if (!unique.includes(id)) {
      unique = unique.concat([id]);
      return true;
    }
    return false;
  });
};

const videos = (state = defaultVideosState, action) => {
  switch (action.type) {
    case 'FETCH_VIDEOS_PENDING':
      return { ...state, isFetching: true };
    case 'FETCH_VIDEOS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        lastFetched: Date.now(),
        after: action.payload.after,
        videos: addVideos(state.videos, action.payload.videos)
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

export default videos;
