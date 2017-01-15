

export const playerNextVideo = nextVideo => ({
  type: 'PLAYER_GO_TO_NEXT_VIDEO',
  payload: nextVideo
});

export const playerPrevVideo = prevVideo => ({
  type: 'PLAYER_GO_TO_PREV_VIDEO',
  payload: prevVideo
});

export const playerLoadVideos = () => ({
  type: 'PLAYER_LOAD_VIDEOS'
});

// export const loadVideos = (activeVideo, nextVideo) => ({
//   type: 'LOAD_VIDEOS',
//   payload: { activeVideo, nextVideo }
// });
