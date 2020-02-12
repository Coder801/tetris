import {
  UPDATE_LEVEL,
  UPDATE_LINES,
  UPDATE_SCORE
} from "../constants/actionTypes";

const updateInfo = (state, action) => {
  if (state === undefined) {
    return {
      score: 0,
      lines: 0,
      level: 0
    };
  }

  switch (action.type) {
    case UPDATE_LEVEL:
      return {
        ...state,
        level: action.payload
      };

    case UPDATE_LINES:
      return {
        ...state,
        lines: action.payload
      };

    case UPDATE_SCORE:
      return {
        ...state,
        score: action.payload
      };

    default:
      return state;
  }
};

export default updateInfo;
