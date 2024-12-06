<template>
  <div class="container items-center px-4 py-8 m-auto">
    <div class="flex flex-wrap pb-3 bg-white divide-y rounded-sm shadow-lg xl:divide-x xl:divide-y-0">
      <div v-for="(subCategory, index) in category.sub_category" :key="index" class="w-full p-2 xl:w-1/4 sm:w-1/2">
        <div class="flex flex-col">
          <div class="flex flex-row items-center justify-between px-4 py-4">
            <div class="flex mr-4">
              <span class="items-center px-4 py-4 m-auto  rounded-full "
                :class="`bg-${subCategory.color}-200 hover:bg-${subCategory.color}-300` ">
                <img :class="`text-${subCategory.color}-500 hover:text-${subCategory.color}-600`" class="items-center w-8 h-8 m-auto" :src="subCategory.icon" alt="">
                </span>
            </div>
            <div class="flex-1 pl-1">
              <div class="text-xl font-medium text-gray-600">
                {{ typeof subCategory.value === 'object' ? subCategory.value.value : subCategory.value }}
              </div>
              <div class="text-sm text-gray-400 sm:text-base">{{ subCategory.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>














<script setup>
import axios from 'axios';
import { ref, onMounted ,computed ,watch } from 'vue';
import useTrendingProductsStore from '@/stores/useTrendingProductsStore';


const store = useTrendingProductsStore();
const api = 'http://localhost:8000/api/'

const trendingProducts = ref(null);

const ProductsDataToTal = ref([]);

const SalesDataToTal = ref([]);

const AllSalesRevenue = ref([]);

const box = '/src/assets/box.svg';
const crown = '/src/assets/crown.svg';
const money = '/src/assets/money.svg';
const sales = '/src/assets/sales.svg';



const props = defineProps({
  dateRange: {
    type: Object,
    required: true,
    default: () => ({
      startDate: "",
      endDate: ""
    })
  }
})

const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

const fetchSalesData = async (startDate, endDate) => {
  try {
    const params = startDate && endDate ? {
      startDate: `${formatDate(startDate)}`,
      endDate: `${formatDate(endDate)}T23:59:59`
    } : {};

    const response = await axios.get(api + 'analytics/total_sales', { params });
    AllSalesRevenue.value = response.data.totalSales;
  } catch (error) {
    console.error('Error:', error);
  }
};

watch(() => props.dateRange, (newDateRange) => {
  if (newDateRange.startDate && newDateRange.endDate) {
    fetchSalesData(newDateRange.startDate, newDateRange.endDate);
  }
}, { deep: true })



const category = {
  sub_category: [
    {
      name: 'Number #1 Product',
      value:trendingProducts,
      icon: crown,
      color: ''
    },
    {
      name: 'Products',
      value: ProductsDataToTal,
      icon: box,
      color: 'yellow'
    },
    {
      name: 'Number of Sales',
      value: SalesDataToTal,
      icon: sales,
      color: 'red'
    },
    {
      name: 'All Sales Revenue',
      value: computed(() =>
        AllSalesRevenue.value !== null ? new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2
            }).format(Number(AllSalesRevenue.value)) : '$0.00'
      ),
      icon: money,
      color: 'green',
      change: 100
    }
  ],
}


onMounted(async () => {

// get number of sales
try {
  const response = await axios.get(api + 'sales');
  SalesDataToTal.value = response.data.totalSalesCount;
} catch (error) {
  console.error('Error fetching data:', error);
}

// get number of products
try {
  const response = await axios.get(api + 'products_sales');
  ProductsDataToTal.value = response.data.length;
} catch (error) {
  console.error('Error fetching data:', error);
}




  // get first trending product
  await store.fetchTrendingProducts();
if (store.trendingProducts.length > 0) {
  trendingProducts.value = store.trendingProducts[0].productName;
} else {
  trendingProducts.value = 'No products available';
}
  await fetchSalesData();
});

</script>
