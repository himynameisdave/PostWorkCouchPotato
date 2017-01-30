import { deepEqual } from 'assert';
import videosFetch from '../videosFetch.js';
import { defaultVideosState } from '../defaults.js';
import {
  fetchVideos_pending,
  fetchVideos_success,
  fetchVideos_failed,
} from '../../actions/videosFetch.js';

const sampleVideo = { id: '1234', title: 'sweet ass video', score: 9001 };


describe('reducers/videosPlayer', () => {
  test('returns the default state when no action is called', () => {
    const state = videosFetch(defaultVideosState, {});
    expect(state).toBe(defaultVideosState);
  });

  //  MORE TESTS GO HERE

});
