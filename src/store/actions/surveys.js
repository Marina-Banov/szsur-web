import { actions, paths } from "../../constants";
import api from "api";
import { buildURLFromParams } from "utils/buildURL";

const getSurveys = () =>
  api.get(paths.SURVEYS, [
    actions.GET_SURVEYS_REQUEST,
    actions.GET_SURVEYS_SUCCESS,
    actions.GET_SURVEYS_ERROR,
  ]);

const updateSurvey = (id, body) =>
  api.update(buildURLFromParams(paths.SURVEYS_ID, id), body, [
    actions.UPDATE_SURVEY_REQUEST,
    actions.UPDATE_SURVEY_SUCCESS,
    actions.UPDATE_SURVEY_ERROR,
  ]);

const deleteSurvey = (id) =>
  api.remove(buildURLFromParams(paths.SURVEYS_ID, id), [
    actions.DELETE_SURVEY_REQUEST,
    actions.DELETE_SURVEY_SUCCESS,
    actions.DELETE_SURVEY_ERROR,
  ]);

export default {
  getSurveys,
  updateSurvey,
  deleteSurvey,
};
