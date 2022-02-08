<template>
  <form class="add-product">
    <label for="name">Nome</label>
    <input type="text" id="name" name="name" v-model="product.nome">
    <label for="price">Preço (R$)</label>
    <input type="number" name="price" id="price" v-model="product.preco">
    <label for="photos">Fotos</label>
    <input type="file" name="photos" id="photos" multiple ref="photos">
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
        preco: "",
        descricao: "",
        fotos: null,
        vendido: "false", 
      }
    }
  },
  methods: {
    formatProduct() {
      const form = new FormData();

      const files = this.$refs.photos.files;
      for(let i = 0; i < files.length; i++) {
        form.append(files[i].name, files[i]);
      }

      form.append("nome", this.product.nome);
      form.append("preco", this.product.preco);
      form.append("descricao", this.product.descricao);
      form.append("vendido", this.product.vendido);
      form.append("usuario_id",this.$store.state.user.id);

      return form;
    },
    async addProduct(event) {
      const product = this.formatProduct();
      const button = event.currentTarget;
      button.value = 'Adicionando...';
      button.setAttribute("disabled", '');
      await api.post("/produto", product);
      await this.$store.dispatch("getUserProducts");
      button.removeAttribute("disabled");
      button.value = "Adicionar Produto";
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