import { PLAY_GAME } from "../constants/actionTypes";

const updateGame = (state, action) => {
  if (state === undefined) {
    return {
      play: false
    };
  }

  switch (action.type) {
    case PLAY_GAME:
      return {
        play: action.payload
      };

    default:
      return state.game;
  }
};

export default updateGame;
