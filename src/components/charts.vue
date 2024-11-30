<script setup>
import ApexCharts from 'apexcharts'
import { onMounted } from 'vue'

// first chart option here
const options1 = {
  colors: ['#1154fb', '#ffd125'],
  series: [
    {
      name: 'Organic',
      color: '#1154fb',
      data: [
        { x: 'Mon', y: 231 },
        { x: 'Tue', y: 122 },
        { x: 'Wed', y: 63 },
        { x: 'Thu', y: 421 },
        { x: 'Fri', y: 122 },
        { x: 'Sat', y: 323 },
        { x: 'Sun', y: 111 },
      ],
    },
    {
      name: 'Social media',
      color: '#ffd125',
      data: [
        { x: 'Mon', y: 232 },
        { x: 'Tue', y: 113 },
        { x: 'Wed', y: 341 },
        { x: 'Thu', y: 224 },
        { x: 'Fri', y: 522 },
        { x: 'Sat', y: 411 },
        { x: 'Sun', y: 243 },
      ],
    },
  ],
  chart: {
    type: 'bar',
    height: '320px',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '70%',
      borderRadiusApplication: 'end',
      borderRadius: 8,
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
    style: {
      fontFamily: 'Inter, sans-serif',
    },
  },
  states: {
    hover: {
      filter: {
        type: 'darken',
        value: 1,
      },
    },
  },
  stroke: {
    show: true,
    width: 0,
    colors: ['transparent'],
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -14,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    floating: false,
    labels: {
      show: true,
      style: {
        fontFamily: 'Inter, sans-serif',
        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  fill: {
    opacity: 1,
  },
}
// end here

// second chart option here

const options2 = {
  // set this option to enable the tooltip for the chart, learn more here: https://apexcharts.com/docs/tooltip/
  tooltip: {
    enabled: true,
    x: {
      show: true,
    },
    y: {
      show: true,
    },
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -26,
    },
  },
  series: [
    {
      name: 'Developer Edition',
      data: [1500, 1418, 1456, 1526, 1356, 1256],
      color: '#fb1111',
    },
    {
      name: 'Designer Edition',
      data: [643, 413, 765, 412, 1423, 1731],
      color: '#21ff35',
    },
  ],
  chart: {
    height: '100%',
    maxWidth: '100%',
    type: 'area',
    fontFamily: 'Inter, sans-serif',
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: true,
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: '#1C64F2',
      gradientToColors: ['#1C64F2'],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 6,
  },
  xaxis: {
    categories: [
      '01 February',
      '02 February',
      '03 February',
      '04 February',
      '05 February',
      '06 February',
      '07 February',
    ],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    labels: {
      formatter: function (value) {
        return '$' + value
      },
    },
  },
}
//  end here

const props = defineProps({
  chartType: {
    type: Number,
    required: true,
  },
})

onMounted(() => {
  if (
    props.chartType === 1 &&
    document.getElementById('column-chart') &&
    typeof ApexCharts !== 'undefined'
  ) {
    const chart = new ApexCharts(document.getElementById('column-chart'), options1)
    chart.render()
  }

  if (
    props.chartType === 2 &&
    document.getElementById('tooltip-chart') &&
    typeof ApexCharts !== 'undefined'
  ) {
    const chart = new ApexCharts(document.getElementById('tooltip-chart'), options2)
    chart.render()
  }
})
</script>

<template>
  <!-- first chart  -->

  <div v-if="chartType === 1" class="w-full rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center">
        <div
          class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3"
        >
          <svg
            class="w-6 h-6 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 19"
          >
            <path
              d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"
            />
            <path
              d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"
            />
          </svg>
        </div>
        <div>
          <h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">3.4k</h5>
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Leads generated per week
          </p>
        </div>
      </div>
      <div>
        <span
          class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300"
        >
          <svg
            class="w-2.5 h-2.5 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
          42.5%
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2">
      <dl class="flex items-center">
        <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">Money spent:</dt>
        <dd class="text-gray-900 text-sm dark:text-white font-semibold">$3,232</dd>
      </dl>
      <dl class="flex items-center justify-end">
        <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">Conversion rate:</dt>
        <dd class="text-gray-900 text-sm dark:text-white font-semibold">1.2%</dd>
      </dl>
    </div>

    <!-- chart is rendring from here -->
    <div v-if="chartType === 1" id="column-chart"></div>
    <!-- end -->

    <div
      class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between"
    ></div>
  </div>
  <!-- first chart ends here  -->

  <!-- second chart  -->

  <div v-if="chartType === 2" class="w-full rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
    <div class="flex justify-between mb-5">
      <div>
        <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">$12,423</h5>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Sales this week</p>
      </div>
      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center"
      >
        23%
        <svg
          class="w-3 h-3 ms-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13V1m0 0L1 5m4-4 4 4"
          />
        </svg>
      </div>
    </div>
    <!-- chart rendring here -->
    <div v-if="chartType === 2" id="tooltip-chart"></div>
    <div
      class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5"
    ></div>
  </div>
  <!-- second chart ends here  -->
</template>
