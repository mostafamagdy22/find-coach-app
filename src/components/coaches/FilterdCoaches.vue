<template>
    <base-card>
        <h2>Find Your Coach</h2>
        <span class="filter-option">
            <input type="checkbox" id="frontend" checked @change="filterOptions">
            <label for="frontend">Frontend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="backend" checked @change="filterOptions">
            <label for="backend">Backend</label>
        </span>
        <span class="filter-option">
            <input type="checkbox" id="career" checked @change="filterOptions">
            <label for="career">Career</label>
        </span>
    </base-card>    
</template>

<script>
export default {
    emits: ['change-filter'],
    data() {
        return {
            optins: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    methods: {
        filterOptions(event) {
            const inputId = event.target.id;
            const isActive = event.target.checked;
            const updatedFilters = {
                ...this.optins,
                [inputId]: isActive
            }
            this.optins = updatedFilters;
            this.$emit('change-filter',updatedFilters);
        }
    }
}
</script>

<style scoped>
h2 {
    margin: 0.5rem 0;
  }
  
  .filter-option {
    margin-right: 1rem;
  }
  
  .filter-option label,
  .filter-option input {
    vertical-align: middle;
  }
  
  .filter-option label {
    margin-left: 0.25rem;
  }
  
  .filter-option.active label {
    font-weight: bold;
  }
</style>