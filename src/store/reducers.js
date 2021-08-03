const initialState = {
    tags: null,
    events: null,
    surveys: null,
};

const actionMap = {
    SET_TAGS: (state, { payload }) => ({
        ...state,
        tags: payload,
    }),
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
