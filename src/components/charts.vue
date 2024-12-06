<template>
  <div v-if="chartType === 1" class="w-full flex gap-2 bg-white flex-wrap ">
    <!-- products table  -->
    <div class=" md:w-[49%] w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div class="relative overflow-auto h-[400px]">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
            <tr>
              <th scope="col" class="px-6 py-3">Product Name</th>
              <th scope="col" class="px-6 py-3">Total sales</th>
              <th scope="col" class="px-6 py-3">Sales Revenue</th>
              <th scope="col" class="px-6 py-3">Category</th>
              <th scope="col" class="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product) in products" :key="product._id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                {{ product.ProductName }}
              </th>
              <td class="px-6 py-4">{{ product.sales.salesCount }}</td>
              <td class="px-6 py-4">${{ product.sales.totalAmount.toFixed(2) }}</td>
              <td class="px-6 py-4">{{ product.Category }}</td>
              <td class="px-6 py-4">${{ product.Price.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- products table ends here  -->

    <!-- pie chart start here  -->
    <div class=" md:w-[49%] w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div class="flex justify-between mb-3">
        <div class="flex justify-center items-center">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Répartition des ventes par
            catégorie</h5>

        </div>
        <div>

        </div>
      </div>

      <!-- Donut Chart -->
      <div class=" w-full justify-center items-center">
        <div class="py-6" id="donut-chart"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ApexCharts from 'apexcharts'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios';

const api = 'http://localhost:8000/api/';

const products = ref([]);
const productsCount = ref(0);

const props = defineProps({
  chartType: {
    type: Number,
    required: true
  },
  dateRange: {
    type: Object,
    required: true,
    default: () => ({
      startDate: "",
      endDate: ""
    })
  }
})

// Watch for changes in dateRange
watch(() => props.dateRange, (newDateRange) => {
  // Update your chart data here based on the new date range
  console.log('Chart date range updated:', newDateRange)
}, { deep: true })

let donutChart = null;

const fetchChartData = async () => {
  try {
    const response = await axios.get(api + 'analytics/category_sales');
    const data = response.data;

    const series = data.categorySales.map((item) => parseFloat(item.percentage.replace('%', '')));
    const labels = data.categorySales.map((item) => item.category);

    return {
      series: series,
      labels: labels,
      colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694', '#A3A3A3'],
      chart: {
        type: 'donut',
        height: 320,
        width: '100%',
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: 'Inter, sans-serif',
                offsetY: 20,
              },
              total: {
                showAlways: true,
                show: true,
                label: 'Total Sales',
                fontFamily: 'Inter, sans-serif',
                formatter() {
                  return data.totalSalesCount;
                },
              },
              value: {
                show: true,
                fontFamily: 'Inter, sans-serif',
                offsetY: -20,
                formatter(value) {
                  return value + '%';
                },
              },
            },
            size: '80%',
          },
        },
      },
      stroke: {
        colors: ['transparent'],
      },
    };
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return null;
  }
};


onMounted(async () => {
  if (
    props.chartType === 1 &&
    document.getElementById('donut-chart') &&
    typeof ApexCharts !== 'undefined'
  ) {
    const donutOptions = await fetchChartData();
    if (donutOptions) {
      donutChart = new ApexCharts(document.getElementById('donut-chart'), donutOptions);
      donutChart.render();
    }
  }

  try {
    const response = await fetch(api + 'products_sales');
    const data = await response.json();
    products.value = data;
    productsCount.value = data.length;
  } catch (error) {
    console.log('Error fetching products:', error);
  }

});
</script>
