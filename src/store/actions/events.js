import { actions, paths } from "../../constants";
import api from "api";

const getEvents = () =>
  api.get(paths.EVENTS, [
    actions.GET_EVENTS_REQUEST,
    actions.GET_EVENTS_SUCCESS,
    actions.GET_EVENTS_ERROR,
  ]);

export default {
  getEvents,
};
