export default {
    registerData(state,payLoad) {
        state.coaches.push(payLoad);
    },
    setCoaches(state,payLoad) {
        state.coaches = payLoad;
    },
    lastFetchStamp(state) {
        state.lastFetch = new Date().getTime();
    }
};