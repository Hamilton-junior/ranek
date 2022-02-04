<template>
  <form class="add-product">
    <label for="name">Nome</label>
    <input type="text" id="name" name="name" v-model="product.nome">
    <label for="price">Preço (R$)</label>
    <input type="number" name="price" id="price" v-model="product.preco">
    <label for="photos">Fotos</label>
    <input type="file" name="photos" id="photos" ref="photos">
    <label for="description">Descrição</label>
    <textarea name="description" id="description" cols="30" rows="10" v-model="product.descricao"></textarea>
    <input type="button" value="Adicionar Produto" class="btn" @click.prevent="addProduct">
  </form>
</template>

<script>
import {api} from '@/services.js';


export default {
  name: 'ProductAdd',
  data() {
    return {
      product: {
        nome: "",
        preço: "",
        descricao: "",
        fotos: null, 
      }
    }
  },
  methods: {
    formatProduct() {
      this.product.usuario_id = this.$store.state.user.id;
    },
    addProduct() {
      this.formatProduct();
      api.post("/produto", this.product).then(()=> {
        this.$store.dispatch("getUserProducts")
      })
    }
  }
}
</script>

<style scoped>
.add-product {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}
.btn {
  grid-column: 2;
}
</style>