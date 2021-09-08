import { actions } from "../../constants";

const initialState = {
  organizationName: null,
  isLoading: false,
};

const actionMap = {
  [actions.GET_USER_REQUEST]: (state, _) => ({
    ...state,
    isLoading: true,
  }),
  [actions.GET_USER_SUCCESS]: (state, action) => ({
    ...state,
    organizationName: action.data.isAdmin,
    isLoading: false,
  }),
  [actions.GET_USER_ERROR]: (state, _) => ({
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
