require('isomorphic-fetch');

export const fetchVideos_pending = () => ({ type: 'FETCH_VIDEOS_PENDING' });

export const fetchVideos_success = payload =>
    ({ type: 'FETCH_VIDEOS_SUCCESS', payload });

export const fetchVideos_failed = error =>
    ({ type: 'FETCH_VIDEOS_FAILED', error });

// const getApiUrl = () => 'localhost:6969';
// if in prod or dev?
export const fetchVideos = after => (dispatch) => {
    dispatch(fetchVideos_pending());
    let url = 'http://localhost:5000/api/videos'
    //  do url loation finding this is dev only...
    if (process.env.NODE_ENV === 'production') {
        url = '/api/videos';
    }
    if (after) {
        url = `${url}/${after}`;
    }
    console.info('requesting this url', url);
    fetch(url)
        .then(d => d.json())
        .then(videos => dispatch(fetchVideos_success(videos)))
        .catch(e => {
            console.warn('whoops shitty', e); // Todo: better error handle
            return dispatch(fetchVideos_failed(e));
        });
};
