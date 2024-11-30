<script setup>
import cards from './cards.vue'
import charts from './charts.vue'
import { ref } from 'vue'
</script>

<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      <!-- card starts here -->
      <cards></cards>
      <!-- cards end here -->

      <div class="flex items-center justify-center mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <!-- sales by category chart here -->
        <charts :chartType="1"></charts>
        <!-- sales by category end here -->
      </div>
      <div class="flex items-center justify-center mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <!-- sales by product chart here -->
        <charts :chartType="2"></charts>
        <!-- sales by product end here -->
      </div>
    </div>
  </div>
</template>
