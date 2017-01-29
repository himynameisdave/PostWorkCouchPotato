require('isomorphic-fetch');

export const fetchVideos_pending = () => ({
  type: 'FETCH_VIDEOS_PENDING'
});

export const fetchVideos_success = payload => ({
  type: 'FETCH_VIDEOS_SUCCESS',
  payload
});

export const fetchVideos_failed = error => ({
  type: 'FETCH_VIDEOS_FAILED',
  error
});


export const fetchVideos = (after) => (dispatch) => {
  dispatch(fetchVideos_pending());
  //  do url loation finding this is dev only...
  fetch('http://localhost:6868/api/videos')
    .then(d => d.json())
    .then(videos => dispatch(fetchVideos_success(videos)))
    //  TODO: dispatch loadVideos
    .catch(e => {
      console.warn("whoops shitty", e);
      return dispatch(fetchVideos_failed(e));
    });
};
