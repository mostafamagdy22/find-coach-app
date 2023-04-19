export default {
    async registerCoach(contxt,data) {
        const userId = contxt.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: JSON.parse(JSON.stringify(data.areas.val))
        };

        const response = await fetch(`https://find-205f5-default-rtdb.firebaseio.com/coaches/${userId}.json`,{
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        // const responseData = await response.json();

        if(!response.ok) {
            // error ...
        }

        contxt.commit('registerData',{...coachData,id: userId});
    },
    async loadCoaches(context,payLoad) {
        if (!payLoad.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }


        const response = await fetch('https://find-205f5-default-rtdb.firebaseio.com/coaches.json');

        const responseData = await response.json();

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const coaches = [];

        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            }
            coaches.push(coach);
        }
        context.commit('setCoaches',coaches);
        context.commit('lastFetchStamp');
    }
};