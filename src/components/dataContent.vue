<template>
  <div class="p-4 sm:ml-64 overflow-hidden">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <div class="flex items-end w-full justify-end mb-4 rounded bg-transparent">
        <filterByDate @filter-changed="handleFilterChange" />
      </div>
      <!-- card starts here -->
      <cards  :dateRange="selectedDateRange"></cards>

      <!-- products ranking -->
      <productsRanking :dateRange="selectedDateRange"></productsRanking>

      <div class="flex items-center  justify-center mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <!-- sales by category pie chart here -->
        <charts :chartType="1" :dateRange="selectedDateRange"></charts>

      </div>
    </div>
  </div>
</template>

<script setup>
import cards from './cards.vue'
import charts from './charts.vue'
import productsRanking from './productsRanking.vue';
import filterByDate from './filterByDate.vue'
import { ref } from 'vue'

const selectedDateRange = ref({
  startDate: "",
  endDate: ""
})

const handleFilterChange = (dateRange) => {
  selectedDateRange.value = dateRange
  if (!dateRange.startDate && !dateRange.endDate) {
    console.log('All time selected - no date filtering')
    // Handle all time case - fetch all data without date constraints
  } else {
    console.log('Date range:', dateRange)
    // Handle specific date range filtering
  }
}

</script>
