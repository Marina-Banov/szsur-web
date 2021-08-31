import { combineReducers } from "redux";

import events from "./events";
import surveys from "./surveys";
import tags from "./tags";
import user from "./user";

const createReducers = (asyncReducers) => {
  const appReducer = combineReducers({
    events,
    surveys,
    tags,
    user,
    ...asyncReducers,
  });

  return (state, action) => appReducer(state, action);
};

export default createReducers;
