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
    data: action.data.map((s) => Object.assign({ results: [] }, s)),
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
      data: [...state.data],
      isLoading: false,
    };
  },
  [actions.UPDATE_SURVEY_ERROR]: (state, _) => ({
    ...state,
    isLoading: false,
  }),
  [actions.DELETE_SURVEY_REQUEST]: (state, _) => ({
    ...state,
    isLoading: true,
  }),
  [actions.DELETE_SURVEY_SUCCESS]: (state, action) => {
    const index = state.data.findIndex((e) => e.id === action.data.id);
    if (index >= 0) {
      state.data.splice(index, 1);
    }
    return {
      ...state,
      data: [...state.data],
      isLoading: false,
    };
  },
  [actions.DELETE_SURVEY_ERROR]: (state, _) => ({
    ...state,
    isLoading: false,
  }),
  [actions.POST_SURVEY_REQUEST]: (state, _) => ({
    ...state,
    isLoading: true,
  }),
  [actions.POST_SURVEY_SUCCESS]: (state, action) => {
    state.data.push(action.data);
    return {
      ...state,
      data: [...state.data],
      isLoading: false,
    };
  },
  [actions.POST_SURVEY_ERROR]: (state, _) => ({
    ...state,
    isLoading: false,
  }),
  [actions.RESET]: (state, _) => initialState,
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
