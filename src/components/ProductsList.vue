<template>
  <section class="products-container">
    <div v-for="product in products" :key="product.id">
      <img v-if="product.fotos" :src="product.fotos[0].src" :alt="product.fotos[0].titulo">
      <p class="price">{{product.preco}}</p>
      <h2 class="title">{{product.nome}}</h2>
      <p>{{product.descricao}}</p>
    </div>
  </section>
</template>

<script>
import {api} from '@/services.js';
import {serialize} from '@/helpers.js';
export default {
  name: "ProductsList",
  data() {
    return {
      products: null,
      productsPerPage: 9,
    }
  },
  computed: {
    url() {
      const query = serialize(this.$router.query);
      return `/produto?_limit=${this.productsPerPage}${query}`;
    }
  },
  methods: {
    getProducts() {
      api.get(this.url)
      .then(response => {
        this.products = response.data;
      })
    }
  },
  watch: {
    url() {
      this.getProducts();
    }
  },
  created() {
    this.getProducts();
  }
}
</script>

<style>

</style>