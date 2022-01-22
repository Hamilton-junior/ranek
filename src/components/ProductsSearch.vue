<template>
  <form>
    <input type="text" name="search" id="search" v-model="search" />
    <input type="submit" id="lupa" value="Search" @click.prevent="searchProduct" />
  </form>
</template>

<script>
export default {
  name: "ProductsSearch",
  data() {
    return {
      search: "",
    }
  },
  methods: {
    searchProduct() {
      this.$router.push({ query: { q: this.search}});
    }
  }
}
</script>

<style>

</style>