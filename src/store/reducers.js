const initialState = {
    events: null,
    surveys: null,
};

const actionMap = {
    SET_EVENTS: (state, { payload }) => ({
        ...state,
        events: payload,
    }),
    SET_SURVEYS: (state, { payload }) => ({
        ...state,
        surveys: payload,
    }),
}

export default {
    initialState, actionMap
};
