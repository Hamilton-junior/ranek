<template>
  <section class="products-container">
    <transition mode="out-in">
      <div v-if="products && products.length" class="products" key="products">
        <div class="product" v-for="(product, index) in products" :key="index">
          <router-link to="/">
            <img
              v-if="product.fotos"
              :src="product.fotos[0].src"
              :alt="product.fotos[0].titulo"
            />
            <p class="price">{{ product.preco }}</p>
            <h2 class="title">{{ product.nome }}</h2>
            <p>{{ product.descricao }}</p>
          </router-link>
        </div>
        <ProductsPaginate
          :productsTotal="productsTotal"
          :productsPerPage="productsPerPage"
        />
      </div>
      <div v-else-if="products && products.length === 0" key="noResults">
        <p class="no-results">
          Busca sem resultados. Tente buscar outro termo.
        </p>
      </div>
      <PageLoading v-else key="loading"/>
    </transition>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { serialize } from "@/helpers.js";
import ProductsPaginate from "./ProductsPaginate.vue";
export default {
  name: "ProductsList",
  data() {
    return {
      products: null,
      productsPerPage: 9,
      productsTotal: 0,
    };
  },
  components: {
    ProductsPaginate,
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/produto?_limit=${this.productsPerPage}${query}`;
    },
  },
  methods: {
    getProducts() {
      this.products = null;
      api.get(this.url).then((response) => {
        this.productsTotal = Number(response.headers["x-total-count"]);
        console.log(response);
        this.products = response.data;
      });
    },
  },
  watch: {
    url() {
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
.products-container {
  max-width: 1000px;
  margin: 0 auto;
}
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 30px;
}
.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}
.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}
.product img {
  border-radius: 4px;
  margin-bottom: 20px;
}
.title {
  margin-bottom: 10px;
}
.price {
  color: #e80;
  font-weight: bold;
}
.no-results {
  text-align: center;
}
</style>
