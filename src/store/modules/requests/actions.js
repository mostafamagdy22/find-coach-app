export default {
    async pushData(contxt,data) {
        const newRequest = {
            message: data.message,
            email: data.email
        }
        const response = await fetch(`https://find-205f5-default-rtdb.firebaseio.com/requests/${data.coachId}.json`,{
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.coachId = data.coachId;

        contxt.commit('addRequest',newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const response = await fetch(`https://find-205f5-default-rtdb.firebaseio.com/requests/${coachId}.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch request.');
            throw error;
        }

        const requests = [];

        for(const key in responseData) {
            const request = {
                id: key,
                coachId: coachId,
                email: responseData[key].email,
                message: responseData[key].message 
            };
            requests.push(request);
        }

        context.commit('setRequests',requests);
    }
};