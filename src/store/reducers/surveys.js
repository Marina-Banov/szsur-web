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
  [actions.UPDATE_SURVEY_REQUEST]: (state, _) => ({
    ...state,
    isLoading: true,
  }),
  [actions.UPDATE_SURVEY_SUCCESS]: (state, action) => {
    const index = state.data.findIndex((e) => e.id === action.data.id);
    if (index >= 0) {
      state.data[index] = { ...state.data[index], ...action.data };
    }
    return {
      ...state,
      isLoading: false,
    };
  },
  [actions.UPDATE_SURVEY_ERROR]: (state, _) => ({
    ...state,
    isLoading: false,
  }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
