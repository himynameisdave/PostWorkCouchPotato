import {
  fetchVideos_pending,
  fetchVideos_success,
  fetchVideos_failed,
} from '../videosFetch.js';

const actionTypes = {
  pending: 'FETCH_VIDEOS_PENDING',
  success: 'FETCH_VIDEOS_SUCCESS',
  failed: 'FETCH_VIDEOS_FAILED',
};


describe('actions/videosFetch', () => {
  test('fetchVideos_pending() returns the correct action', () => {
    const action = fetchVideos_pending();
    expect(action.type).toBe(actionTypes.pending);
  });
  test('fetchVideos_success() returns the correct action', () => {
    const payload = 'TEST';
    const action = fetchVideos_success(payload);
    expect(action.type).toBe(actionTypes.success);
    expect(action.payload).toBe(payload);
  });
  test('fetchVideos_failed() returns the correct action', () => {
    const error = 'ERROR';
    const action = fetchVideos_failed(error);
    expect(action.type).toBe(actionTypes.failed);
    expect(action.error).toBe(error);
  });
});
