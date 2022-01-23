<template>
    <ul v-if="pagesTotal > 1">
      <li v-for="page in pagesTotal" :key="page">
        <router-link :to="{query: queryMethod(page)}">{{page}}</router-link>
      </li>
    </ul>
</template>

<script>
export default {
  name: "ProductsPaginate",
  props: {
    productsTotal: {
      type: Number,
      default: 1,
    },
    productsPerPage: {
      type: Number,
      default: 1,
    }
  },
  methods: {
    queryMethod(page) {
      return {
        ...this.$route.query,
        _page: page
      }
    }
  },
  computed: {
    pagesTotal() {
      const total = this.productsTotal / this.productsPerPage;
      return (total !== Infinity) ? Math.ceil(total) : 0;
    }
  }
}
</script>

<style scoped>
ul {
  grid-column: 1/ -1;
}
li {
  display: inline-block;
}
li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}
li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}
</style>