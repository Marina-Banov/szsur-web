import { actions } from "../../constants";

const initialState = {
  organizationName: null,
};

const actionMap = {
  [actions.GET_USER_REQUEST]: (state, _) => state,
  [actions.GET_USER_SUCCESS]: (state, action) => ({
    ...state,
    organizationName: action.data.isAdmin,
  }),
  [actions.GET_USER_ERROR]: (state, _) => state,
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
