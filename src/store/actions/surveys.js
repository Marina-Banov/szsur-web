import { actions, paths } from "../../constants";
import api from "api";
import { buildURLFromParams } from "utils";

const getSurveys = (organization) =>
  api.get(buildURLFromParams(paths.SURVEYS_QUERY, organization), [
    actions.GET_SURVEYS_REQUEST,
    actions.GET_SURVEYS_SUCCESS,
    actions.GET_SURVEYS_ERROR,
  ]);

const addSurvey = (body) =>
  api.add(paths.SURVEYS, body, [
    actions.POST_SURVEY_REQUEST,
    actions.POST_SURVEY_SUCCESS,
    actions.POST_SURVEY_ERROR,
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
  addSurvey,
  updateSurvey,
  deleteSurvey,
};
