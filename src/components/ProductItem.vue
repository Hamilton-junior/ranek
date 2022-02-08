<template>
  <div class="product" v-if="product">
    <router-link :to="{ name: 'product', params: {id: product.id}}">
      <img v-if="product.fotos" :src="product.fotos[0].src" :alt="product.fotos[0].titulo" class="product-image">
    </router-link>
   <div class="info">
     <p class="price">{{product.preco | numberPrice}}</p>
     <p class="title">{{product.nome}}</p>
     <slot></slot>
   </div>
  </div>
</template>
<script>
export default {
  name: "ProductItem",
  props: ["product"],
};
</script>

<style scoped>
.product {
display: grid;
grid-template-columns: minmax(100px, 200px) 1fr;
gap: 20px;
margin-bottom: 40px;
position: relative;
}

@media (max-width: 500px) {
  .product {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
.title {
  color: #345;
  margin: 10px 0;
  font-weight: bold;
}
.price {
  color: #e80;
  font-weight: bold;
}
.info {
  align-self: end;
}
.product-image {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}
</style>