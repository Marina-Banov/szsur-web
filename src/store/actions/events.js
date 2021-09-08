import { actions, paths } from "../../constants";
import api from "api";
import { buildURLFromParams } from "utils";

const getEvents = (organizationName) =>
  api.get(buildURLFromParams(paths.EVENTS_QUERY, organizationName), [
    actions.GET_EVENTS_REQUEST,
    actions.GET_EVENTS_SUCCESS,
    actions.GET_EVENTS_ERROR,
  ]);

const addEvent = (body) =>
  api.add(paths.EVENTS, body, [
    actions.POST_EVENT_REQUEST,
    actions.POST_EVENT_SUCCESS,
    actions.POST_EVENT_ERROR,
  ]);

const updateEvent = (id, body) =>
  api.update(buildURLFromParams(paths.EVENTS_ID, id), body, [
    actions.UPDATE_EVENT_REQUEST,
    actions.UPDATE_EVENT_SUCCESS,
    actions.UPDATE_EVENT_ERROR,
  ]);

const deleteEvent = (id) =>
  api.remove(buildURLFromParams(paths.EVENTS_ID, id), [
    actions.DELETE_EVENT_REQUEST,
    actions.DELETE_EVENT_SUCCESS,
    actions.DELETE_EVENT_ERROR,
  ]);

export default {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
};
