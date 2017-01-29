
export const defaultVideosState = {
  isFetching: false,
  lastFetched: 0,
  error: false,
  after: '',
  videos: [],
  player: {
    activeVideo: null,
    nextVideo: null,
    prevVideo: null,
  }
};

export const defaultSettingsState = {
  isSettingsOpen: false,
  theme: 'light'
};
