import { combineReducers } from 'redux';
import player from './player.js';
import settings from './settings.js';
import videos from './videos.js';

const rootReducer = combineReducers({
  player,
  settings,
  videos
});

export default rootReducer;
