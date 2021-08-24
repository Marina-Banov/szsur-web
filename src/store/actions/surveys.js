import { actions, paths } from "../../constants";
import api from "api";

const getSurveys = () =>
  api.get(paths.SURVEYS, [
    actions.GET_SURVEYS_REQUEST,
    actions.GET_SURVEYS_SUCCESS,
    actions.GET_SURVEYS_ERROR,
  ]);

export default {
  getSurveys,
};
