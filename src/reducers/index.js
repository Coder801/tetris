import updateGame from "./game";

const reducer = (state, action) => ({
  game: updateGame(state, action)
});

export default reducer;
