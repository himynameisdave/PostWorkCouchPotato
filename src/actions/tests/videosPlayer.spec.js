import { deepEqual } from 'assert';
import {
  playerNextVideo,
  playerPrevVideo,
  playerLoadVideos,
} from '../videosPlayer.js';

const actionTypes = {
  next: 'PLAYER_GO_TO_NEXT_VIDEO',
  prev: 'PLAYER_GO_TO_PREV_VIDEO',
  load: 'PLAYER_LOAD_VIDEOS',
};
const sampleVideo = { id: '1234', title: 'sweet ass video', score: 9001 };


describe('actions/videosPlayer', () => {
  test('playerNextVideo() returns the correct action', () => {
    const action = playerNextVideo(sampleVideo);
    expect(action.type).toBe(actionTypes.next);
    deepEqual(action.payload, sampleVideo);
  });
  test('playerPrevVideo() returns the correct action', () => {
    const action = playerPrevVideo(sampleVideo);
    expect(action.type).toBe(actionTypes.prev);
    deepEqual(action.payload, sampleVideo);
  });
  test('playerLoadVideos() returns the correct action', () => {
    const action = playerLoadVideos();
    expect(action.type).toBe(actionTypes.load);
  });
});
