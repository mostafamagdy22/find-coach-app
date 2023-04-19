export default {
    getCoaches(state) {
        return state.coaches;
    },
    isItEmpty(state) {
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_,getters,_2,rootGetters) {
        const coaches = getters.getCoaches;
        const userId = rootGetters.userId;
        return coaches.some(coach => coach.id === userId);
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            return true;
        }
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
};