import { createSelector } from "reselect";

const getTags = createSelector(
  (state) => state.tags.data,
  (tags) => tags
);

const getIsLoading = createSelector(
  (state) => state.tags.isLoading,
  (isLoading) => isLoading
);

export default {
  getTags,
  getIsLoading,
};
