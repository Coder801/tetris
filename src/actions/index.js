import { PLAY_GAME } from "../constants/actionTypes";

const playGame = status => ({
  type: PLAY_GAME,
  payload: status
});

export { playGame };
