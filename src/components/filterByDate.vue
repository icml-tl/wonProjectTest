<template>
  <div class="relative">
    <button @click="toggleDropdown" class="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span>{{ selectedFilter.label }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" :class="{ 'transform rotate-180': isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div v-if="isOpen" class="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
      <div class="py-1">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="selectFilter(filter)"
          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
          :class="{ 'bg-blue-50 text-blue-600': selectedFilter.value === filter.value }"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const filters = [
  { label: 'All time', value: 'alltime' },
  { label: '7 past days', value: '7days' },
  { label: '30 past days', value: '30days' },
  { label: '12 past months', value: '12months' }
]
const selectedFilter = ref(filters[0])
const emit = defineEmits(['filter-changed'])

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.`
}

const calculateDateRange = (filter) => {
  if (filter.value === 'alltime') {
    return {
      startDate: "",
      endDate: ""
    }
  }

  const endDate = new Date()
  endDate.setHours(23, 59, 59, 999)

  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)

  switch (filter.value) {
    case '7days':
      startDate.setDate(startDate.getDate() - 7)
      break
    case '30days':
      startDate.setDate(startDate.getDate() - 30)
      break
    case '12months':
      startDate.setMonth(startDate.getMonth() - 12)
      break
  }

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  }
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectFilter = (filter) => {
  selectedFilter.value = filter
  isOpen.value = false
  const dateRange = calculateDateRange(filter)
  emit('filter-changed', dateRange)
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // Emit the date range
  const dateRange = calculateDateRange(selectedFilter.value)
  emit('filter-changed', dateRange)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
