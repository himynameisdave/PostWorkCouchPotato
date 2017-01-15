

export const goToNextVideo = prevVideo => ({
  type: 'GO_TO_NEXT_VIDEO',
  payload: prevVideo
});

export const goToPrevVideo = nextVideo => ({
  type: 'GO_TO_PREV_VIDEO',
  payload: nextVideo
});

export const setActiveVideo = videoId => ({
  type: 'SET_ACTIVE_VIDEO',
  payload: videoId
});

export const loadVideos = (activeVideo, nextVideo) => ({
  type: 'LOAD_VIDEOS',
  payload: { activeVideo, nextVideo }
});
