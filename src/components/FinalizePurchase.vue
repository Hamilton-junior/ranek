<template>
  <section>
    <h2>Endereço de Envio</h2>
    <ErroNotification :erros="erros" />
    <UserForm>
      <button class="btn" @click.prevent="finalizePurchase">Finalizar Compra</button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import { api } from '@/services.js';
import { mapState } from 'vuex';
export default {
  name: 'FinalizePurchase',
  props: ['product'],
  data() {
    return {
      erros: [],
    }
  },
  components: {
    UserForm,
  },
  computed: {
    ...mapState(['user']),
    purchase() {
      return {
        comprador_id: this.user.email,
        vendedor_id: this.product.usuario_id,
        produto: this.product,
        endereco: {
          cep: this.user.cep,
          rua: this.user.rua,
          numero: this.user.numero,
          bairro: this.user.bairro,
          cidade: this.user.cidade,
          estado: this.user.estado,
        }
      }
    }
  },
  methods: {
    createTransaction() {
      return api.post("/transacao", this.purchase).then(() => {
        this.$router.push({name: "purchases"})
      })
    },
    async createUser() {
      try {
        // cria o usuário
      await this.$store.dispatch("createUser", this.$store.state.user);
      // para assim que o usuário for criado, já logar
      await this.$store.dispatch("loginUser", this.$store.state.user)
      await this.$store.dispatch("getUser");
      // levar para a página de usuário
      await this.createTransaction();
      } catch(error) {
        this.erros.push(error.response.data.message);
      }
    },
    finalizePurchase() {
      this.erros = [];
      if(this.$store.state.login) {
        this.createTransaction();
      } else {
        this.createUser();
      }
      
    }
  }
}
</script>

<style scoped>
  h2 {
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .btn {
    background: #e80;
  }
</style>