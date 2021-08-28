import { createSelector } from "reselect";

const getEvents = createSelector(
  (state) => state.events.data,
  (events) => events
);

const getIsLoading = createSelector(
  (state) => state.events.isLoading,
  (isLoading) => isLoading
);

export default {
  getEvents,
  getIsLoading,
};
