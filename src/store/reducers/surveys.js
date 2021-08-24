import { actions } from "../../constants";

const initialState = {
  isLoading: false,
  data: null,
};

const actionMap = {
  [actions.GET_SURVEYS_REQUEST]: (state, _) => ({
    ...state,
    isLoading: true,
  }),
  [actions.GET_SURVEYS_SUCCESS]: (state, action) => ({
    ...state,
    data: action.data,
    isLoading: false,
  }),
  [actions.GET_SURVEYS_ERROR]: (state, _) => ({
    ...state,
    data: [],
    isLoading: false,
  }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
