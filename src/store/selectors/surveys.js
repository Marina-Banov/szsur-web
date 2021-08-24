import { createSelector } from "reselect";

const getSurveys = createSelector(
  (state) => state.surveys.data,
  (surveys) => surveys
);

const getIsLoading = createSelector(
  (state) => state.surveys.isLoading,
  (isLoading) => isLoading
);

export default {
  getSurveys,
  getIsLoading,
};
