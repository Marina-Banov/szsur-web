import { actions, paths } from "../../constants";
import api from "api";

const getTags = () =>
  api.get(paths.TAGS, [
    actions.GET_TAGS_REQUEST,
    actions.GET_TAGS_SUCCESS,
    actions.GET_TAGS_ERROR,
  ]);

const updateTags = (body) =>
  api.update(paths.TAGS, body, [
    actions.UPDATE_TAGS_REQUEST,
    actions.UPDATE_TAGS_SUCCESS,
    actions.UPDATE_TAGS_ERROR,
  ]);

export default {
  getTags,
  updateTags,
};
