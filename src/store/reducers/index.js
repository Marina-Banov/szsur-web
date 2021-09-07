import { combineReducers } from "redux";

import events from "./events";
import organization from "./organization";
import surveys from "./surveys";
import tags from "./tags";
import user from "./user";

const createReducers = (asyncReducers) => {
  const appReducer = combineReducers({
    events,
    organization,
    surveys,
    tags,
    user,
    ...asyncReducers,
  });

  return (state, action) => appReducer(state, action);
};

export default createReducers;
