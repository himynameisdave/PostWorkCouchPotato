import { combineReducers } from 'redux';
import settings from './settings.js';
import videos from './videos.js';

const rootReducer = combineReducers({
  settings,
  videos
});

export default rootReducer;
