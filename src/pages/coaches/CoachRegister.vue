<template>
    <section>
        <h2>Register As A Coach Now!</h2>
        <coaches-form @save-data="theData"></coaches-form>
    </section>
</template>

<script>
import CoachesForm from '../../components/coaches/CoachesForm.vue';

export default {
    components: {
        CoachesForm
    },
    methods: {
        theData(allData) {
            this.$store.dispatch('coaches/registerCoach',allData);
            this.$router.replace('/coaches');
        }
    }
}
</script>