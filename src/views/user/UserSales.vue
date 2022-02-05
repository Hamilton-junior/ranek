<template>
  <section>
    <div v-if="sales">
      <h2>Vendas</h2>
      <div class="product-wrapper" v-for='(sale, index) in sales' :key="index">
        <ProductItem v-if="sale.produto" :product="sale.produto">
          <p class="seller">
            <span>Comprador:</span>{{sale.comprador_id}}
          </p>
        </ProductItem>
        <div class="delivery">
          <h3>Entrega:</h3>
          <ul v-if="sale.endereco">
            <li v-for="(value, key) in sale.endereco" :key="key">
              {{key}}:{{value}}  
            </li>  
          </ul>  
        </div>  
      </div>
    </div>
  </section>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';
import { api } from '@/services.js';
import { mapState } from 'vuex';
export default {
  name: "UserSales",
  data() {
    return {
      sales: null,
    }
  },
  components: {
    ProductItem,
  },
  computed: {
    ...mapState(['user', 'login'])
  },
  methods: {
    getSales() {
      api.get(`/transacao?vendedor_id=${this.user.id}`).then((response) => {
        this.sales = response.data;
      })
    }
  },
  watch: {
    login() {
      this.getSales();
    }
  },
  created() {
    if(this.login) {
      this.getSales();
    }
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
  .delivery {
    display: grid;
    grid-template-columns: minmax(100px, 200px) 1fr;
    gap: 20px;
    margin-bottom: 60px;
  }
  h3 {
    margin: 0px;
    justify-self: end;
  }
</style>