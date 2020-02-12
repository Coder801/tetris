import updateGame from "./game";
import updateInfo from "./info";

const reducer = (state, action) => ({
  game: updateGame(state, action),
  score: updateInfo(state, action)
});

export default reducer;
