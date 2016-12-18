require('isomorphic-fetch');

const fetchVideos_pending = () => ({
  type: 'FETCH_VIDEOS_PENDING'
});

const fetchVideos_success = payload => ({
  type: 'FETCH_VIDEOS_SUCCESS',
  payload
});

const fetchVideos_failed = error => ({
  type: 'FETCH_VIDEOS_FAILED',
  error
});


export const fetchVideos = (after) => (dispatch) => {
  dispatch(fetchVideos_pending());
  //  do url loation finding this is dev only...
  fetch('http://localhost:6868/api/videos')
    .then(d => d.json())
    .then(videos => dispatch(fetchVideos_success(videos)))
    .catch(e => dispatch(fetchVideos_failed(e)));
};
