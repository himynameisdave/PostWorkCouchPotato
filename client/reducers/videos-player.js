
//  TODO: break this off
const setFirstVideoToActive = state => {
  // console.log(state);
  return Object.assign({}, state, {
    player: Object.assign({}, state.player, {
      activeVideo: state.videos[0],
      nextVideo: state.videos[1],
    })
  });
};


const getNextVideo = (videos, { id, title }, word) => {
  const activeVideoIndex = videos.reduce((a, vid, index) => {
    if (vid.id === id) return index;
    return a;
  }, -1);
  return videos[activeVideoIndex + 1];
};

const videosPlayer = (state, action) => {
  switch (action.type) {
    case 'PLAYER_LOAD_VIDEOS':
      return state.player.activeVideo ? state : setFirstVideoToActive(state);
    case 'PLAYER_GO_TO_NEXT_VIDEO':
      return Object.assign({}, state, {
        player: Object.assign({}, state.player, {
          activeVideo: state.player.nextVideo,
          prevVideo: state.player.activeVideo,
          nextVideo: getNextVideo(state.videos, state.player.nextVideo, 'next'),
        })
      });
    case 'PLAYER_GO_TO_PREV_VIDEO':
      return Object.assign({}, state, {
        player: Object.assign({}, state.player, {
          activeVideo: state.player.prevVideo,
          nextVideo: state.player.activeVideo,
          prevVideo: getNextVideo(state.videos.slice().reverse(), state.player.prevVideo, 'prev'),
        })
      });
    default:
      return state;
  }
};

export default videosPlayer;
