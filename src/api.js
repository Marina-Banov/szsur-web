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

export default { setToken, get };
