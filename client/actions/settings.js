

export const openSettings = () => ({ type: 'OPEN_SETTINGS' });
export const closeSettings = () => ({ type: 'CLOSE_SETTINGS' });

export const changeTheme = (newTheme) => ({
  type: 'CHANGE_THEME',
  payload: newTheme
});
