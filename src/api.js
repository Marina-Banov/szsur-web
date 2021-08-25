import request from "superagent";
import { buildURL } from "utils/buildURL";

let authToken = null;

const setToken = (token) => {
  authToken = token;
  /*
    axios.defaults.headers.common['Authorization'] =
      `Bearer ${token}`;
   */
};

const add =
  (path, body, [REQUEST, SUCCESS, ERROR]) =>
  async (dispatch) => {
    await dispatch({
      type: REQUEST,
    });
    try {
      const response = await request
        .post(buildURL(process.env.REACT_APP_API_PATH, path))
        .set("Authorization", "Bearer " + authToken)
        .send(body);
      return dispatch({
        type: SUCCESS,
        data: response.body,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        error,
      });
    }
  };

const get =
  (path, [REQUEST, SUCCESS, ERROR]) =>
  async (dispatch) => {
    await dispatch({
      type: REQUEST,
    });
    try {
      const response = await request
        .get(buildURL(process.env.REACT_APP_API_PATH, path))
        .set("Authorization", "Bearer " + authToken);
      return dispatch({
        type: SUCCESS,
        data: response.body,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        error,
      });
    }
  };

const update =
  (path, body, [REQUEST, SUCCESS, ERROR]) =>
  async (dispatch) => {
    await dispatch({
      type: REQUEST,
    });
    try {
      const response = await request
        .put(buildURL(process.env.REACT_APP_API_PATH, path))
        .set("Authorization", "Bearer " + authToken)
        .send(body);
      return dispatch({
        type: SUCCESS,
        data: response.body,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        error,
      });
    }
  };

const remove =
  (path, [REQUEST, SUCCESS, ERROR]) =>
  async (dispatch) => {
    await dispatch({
      type: REQUEST,
    });
    try {
      const response = await request
        .delete(buildURL(process.env.REACT_APP_API_PATH, path))
        .set("Authorization", "Bearer " + authToken);
      return dispatch({
        type: SUCCESS,
        data: response.body,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        error,
      });
    }
  };

export default { setToken, add, get, update, remove };
