import { createSelector } from "reselect";

const getTags = createSelector(
  (state) => state.tags,
  (tags) => tags
);

const getEvents = createSelector(
  (state) => state.events,
  (events) => events
);

const getSurveys = createSelector(
  (state) => state.surveys,
  (surveys) => surveys
);

const getLoadSurveysImages = createSelector(
  (state) => state.loadSurveysImages,
  (loadSurveysImages) => loadSurveysImages
);

export default {
  getTags,
  getEvents,
  getSurveys,
  getLoadSurveysImages,
};
