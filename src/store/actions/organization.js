import api from "api";
import { buildURLFromParams } from "utils";
import { actions, paths } from "../../constants";

const getOrganization = (id) =>
  api.get(buildURLFromParams(paths.ORGANIZATIONS_ID, id), [
    actions.GET_ORGANIZATION_REQUEST,
    actions.GET_ORGANIZATION_SUCCESS,
    actions.GET_ORGANIZATION_ERROR,
  ]);

const updateOrganization = (id, body) =>
  api.update(buildURLFromParams(paths.ORGANIZATIONS_ID, id), body, [
    actions.UPDATE_ORGANIZATION_REQUEST,
    actions.UPDATE_ORGANIZATION_SUCCESS,
    actions.UPDATE_ORGANIZATION_ERROR,
  ]);

export default { getOrganization, updateOrganization };
