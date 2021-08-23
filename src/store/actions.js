import constants from "../appConstants";

const actions = constants.actions;

const setTags = (payload) => ({
  type: actions.SET_TAGS,
  payload,
});

const setEvents = (payload) => ({
  type: actions.SET_EVENTS,
  payload,
});

const setSurveys = (payload) => ({
  type: actions.SET_SURVEYS,
  payload,
});

const setSurveyImage = (index, imageURL) => ({
  type: actions.SET_SURVEY_IMAGE,
  payload: { index, imageURL },
});

export default {
  setTags,
  setEvents,
  setSurveys,
  setSurveyImage,
};