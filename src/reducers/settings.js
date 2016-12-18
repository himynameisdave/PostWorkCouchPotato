
const defaultSettingsState = {
  isSettingsOpen: false,
  theme: 'light'
};


const settings = (state = defaultSettingsState, action) => {
  switch (action.type) {
    case 'OPEN_SETTINGS':
      return { ...state, isSettingsOpen: true };
    case 'CLOSE_SETTINGS':
      return { ...state, isSettingsOpen: false };
    case 'CHANGE_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export default settings;
