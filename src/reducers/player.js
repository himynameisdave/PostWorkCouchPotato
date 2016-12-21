

const defaultPlayerState = {
  activeVideo: {},
  nextVideo: {},
  prevVideo: {}
};

const player = (state = defaultPlayerState, action) => {
  switch (action.type) {
    case 'GO_TO_NEXT_VIDEO':
      return {
        ...state,
        nextVideo: state.activeVideo,
        activeVideo: state.prevVideo,
        prevVideo: action.payload
      };
    case 'GO_TO_PREV_VIDEO':
      return {
        ...state,
        nextVideo: state.activeVideo,
        activeVideo: state.prevVideo,
        prevVideo: action.payload
      };
    case 'LOAD_VIDEOS':
      return {
        ...state,
        activeVideo: action.payload.activeVideo,
        nextVideo: action.payload.nextVideo
      };
    default:
      return state;
  }
};


export default player;
