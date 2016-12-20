
const defaultVideosState = {
  isFetching: false,
  error: false,
  after: null,
  videos: []
};

const videos = (state = defaultVideosState, action) => {
  switch (action.type) {
    case 'FETCH_VIDEOS_PENDING':
      return { ...state, isFetching: true };
    case 'FETCH_VIDEOS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        after: action.payload.after,
        videos: state.videos.concat(action.payload.videos)
      };
    case 'FETCH_VIDEOS_FAILED':
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
};

export default videos;
