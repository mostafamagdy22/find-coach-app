<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <filterd-coaches @change-filter="setFilters"></filterd-coaches>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isCoach" to="/register" link mode="flat"
            >Register As Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoach">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :areas="coach.areas"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h2 v-else>No Coaches Found!</h2>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import FilterdCoaches from "../../components/coaches/FilterdCoaches.vue";

export default {
  components: {
    CoachItem,
    FilterdCoaches,
  },
  data() {
    return {
      error: null,
      isLoading: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    filteredCoaches() {
      const caoches = this.$store.getters["coaches/getCoaches"];
      return caoches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        } else if (
          this.activeFilters.backend &&
          coach.areas.includes("backend")
        ) {
          return true;
        } else if (
          this.activeFilters.career &&
          coach.areas.includes("career")
        ) {
          return true;
        }
        return false;
      });
    },
    hasCoach() {
      return !this.isLoading && this.$store.getters["coaches/isItEmpty"];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updated) {
      this.activeFilters = updated;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
