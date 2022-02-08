<template>
  <section>
    <h2>Crie a sua conta</h2>
    <transition mode="out-in">
      <button v-if="!create" class="btn" @click="create = true">
        Criar Conta
      </button>
      <UserForm v-else>
        <button class="btn btn-form" @click.prevent="createUser">Criar Usuário</button>
      </UserForm>
    </transition>
  </section>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
export default {
  name: 'LoginCreate',
  components: {
    UserForm,
  },
  data() {
    return {
      create: false,
    };
  },
  methods: {
    async createUser() {
      try {
        // cria o usuário
      await this.$store.dispatch("createUser", this.$store.state.user);
      // para assim que o usuário for criado, já logar
      await this.$store.dispatch("loginUser", this.$store.state.user);
      await this.$store.dispatch("getUser");
      // levar para a página de usuário
      this.$router.push({ name: "user"})
      } catch(error) {
        console.log(error);
      }
    },
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}
.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.btn-form {
  max-width: 100%;
}
</style>
