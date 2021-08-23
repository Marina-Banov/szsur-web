import constants from "../appConstants";

const actions = constants.actions;

const initialState = {
  tags: null,
  events: null,
  surveys: null,
  loadEventsImages: null,
  loadSurveysImages: null,
};

const actionMap = {
  [actions.SET_TAGS]: (state, { payload }) => ({
    ...state,
    tags: payload,
  }),
  [actions.SET_EVENTS]: (state, { payload }) => ({
    ...state,
    events: payload,
    loadEventsImages: new Array(payload.length).fill(true),
  }),
  [actions.SET_SURVEYS]: (state, { payload }) => ({
    ...state,
    surveys: payload,
    loadSurveysImages: new Array(payload.length).fill(true),
  }),
  [actions.SET_SURVEY_IMAGE]: (state, { payload }) => {
    const surveys = { ...state.surveys };
    const loadSurveysImages = { ...state.loadSurveysImages };
    surveys[payload.index].image = payload.imageURL;
    loadSurveysImages[payload.index] = false;
    return { ...state, surveys, loadSurveysImages };
  },
};

export default {
  initialState,
  actionMap,
};
