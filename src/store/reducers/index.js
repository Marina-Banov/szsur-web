import { combineReducers } from "redux";

import events from "./events";
import surveys from "./surveys";
import tags from "./tags";

const createReducers = (asyncReducers) => {
  const appReducer = combineReducers({
    events,
    surveys,
    tags,
    ...asyncReducers,
  });

  return (state, action) => appReducer(state, action);
};

export default createReducers;
