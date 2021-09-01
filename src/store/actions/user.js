import api from "api";
import { actions, paths } from "../../constants";
import { buildURLFromParams } from "utils";

const getUser = (id) =>
  api.get(buildURLFromParams(paths.USERS_ID, id), [
    actions.GET_USER_REQUEST,
    actions.GET_USER_SUCCESS,
    actions.GET_USER_ERROR,
  ]);

export default { getUser };
