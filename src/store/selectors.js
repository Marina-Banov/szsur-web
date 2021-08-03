import { createSelector } from 'reselect';

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

export default {
    getTags,
    getEvents,
    getSurveys
};
