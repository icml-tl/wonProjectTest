import { defineStore } from 'pinia';
import axios from 'axios';

const api = 'http://localhost:8000/api/';

export default defineStore('trendingProducts', {
  state: () => ({
    trendingProducts: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchTrendingProducts() {
      this.isLoading = true;
      try {
        const response = await axios.get(api + 'analytics/trending_products');
        this.trendingProducts = response.data.products.map(product => ({
          productName: product.productName,
          totalQuantity: product.totalQuantity,
          productId: product.productId
        }));
      } catch (error) {
        this.error = 'Error fetching API: ' + error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
