import { actions } from "../../constants";

const initialState = {
  isLoading: false,
  data: null,
};

const actionMap = {
  [actions.GET_ORGANIZATION_REQUEST]: (state, _) => ({
    ...state,
    isLoading: true,
  }),
  [actions.GET_ORGANIZATION_SUCCESS]: (state, action) => ({
    ...state,
    data: action.data,
    isLoading: false,
  }),
  [actions.GET_ORGANIZATION_ERROR]: (state, _) => ({
    ...state,
    data: {},
    isLoading: false,
  }),
  [actions.UPDATE_ORGANIZATION_REQUEST]: (state, _) => ({
    ...state,
    isLoading: true,
  }),
  [actions.UPDATE_ORGANIZATION_SUCCESS]: (state, action) => {
    return {
      ...state,
      data: action.data,
      isLoading: false,
    };
  },
  [actions.UPDATE_ORGANIZATION_ERROR]: (state, _) => ({
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
