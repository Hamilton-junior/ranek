<template>
  <section>
    <div v-if="purchases">
      <h2>Compras</h2>
      <div class="product-wrapper" v-for='(purchase, index) in purchases' :key="index">
        <ProductItem v-if="purchase.produto" :product="purchase.produto">
          <p class="seller">
            <span>Vendedor:</span>{{purchase.vendedor_id}}
          </p>
        </ProductItem>  
      </div>
    </div>
    <PageLoading v-else />
  </section>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';
import { api } from '@/services.js';
import { mapState } from 'vuex';
export default {
  name: "UserPurchases",
  data() {
    return {
      purchases: null,
    }
  },
  components: {
    ProductItem,
  },
  computed: {
    ...mapState(['user', 'login'])
  },
  methods: {
    getPurchases() {
      api.get('/transacao?tipo=comprador_id').then((response) => {
        this.purchases = response.data;
      })
    }
  },
  watch: {
    login() {
      this.getPurchases();
    }
  },
  created() {
    if(this.login) {
      this.getPurchases();
    }
    document.title = "Usuário | Compras";
  }
}
</script>

<style scoped>
  .product-wrapper {
    margin-bottom: 40px;
  }
  .seller  span{
    color: #e80;
  }
  h2 {
    margin-bottom: 20px;
  }
</style>