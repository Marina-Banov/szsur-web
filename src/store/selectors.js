import { createSelector } from 'reselect';

const getEvents = createSelector(
    (state) => state.events,
    (events) => events
);

const getSurveys = createSelector(
    (state) => state.surveys,
    (surveys) => surveys
);

export default {
    getEvents,
    getSurveys
};
