import { actions } from "../../constants";

const initialState = {
  isLoading: false,
  data: null,
};

const actionMap = {
  [actions.GET_EVENTS_REQUEST]: (state, _) => ({
    ...state,
    isLoading: true,
  }),
  [actions.GET_EVENTS_SUCCESS]: (state, action) => ({
    ...state,
    data: action.data,
    isLoading: false,
  }),
  [actions.GET_EVENTS_ERROR]: (state, _) => ({
    ...state,
    data: [],
    isLoading: false,
  }),
  [actions.UPDATE_EVENT_REQUEST]: (state, _) => ({
    ...state,
    isLoading: true,
  }),
  [actions.UPDATE_EVENT_SUCCESS]: (state, action) => {
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
  [actions.UPDATE_EVENT_ERROR]: (state, _) => ({
    ...state,
    isLoading: false,
  }),
  [actions.DELETE_EVENT_REQUEST]: (state, _) => ({
    ...state,
    isLoading: true,
  }),
  [actions.DELETE_EVENT_SUCCESS]: (state, action) => {
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
  [actions.DELETE_EVENT_ERROR]: (state, _) => ({
    ...state,
    isLoading: false,
  }),
  [actions.POST_EVENT_REQUEST]: (state, _) => ({
    ...state,
    isLoading: true,
  }),
  [actions.POST_EVENT_SUCCESS]: (state, action) => {
    state.data.push(action.data);
    return {
      ...state,
      data: [...state.data],
      isLoading: false,
    };
  },
  [actions.POST_EVENT_ERROR]: (state, _) => ({
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
