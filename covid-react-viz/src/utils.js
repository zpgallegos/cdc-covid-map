export const getStateKey = (obj, state) => {
    return obj[state.view][state.timePeriod][state.metric];
};
