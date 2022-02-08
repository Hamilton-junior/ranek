<template>
  <section>
    <ErroNotification :erros="erros" />
    <UserForm>
      <button class="btn" @click.prevent="updateUser">Atualizar Usuário</button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import { api } from '@/services.js';
export default {
  name: "UserEdit",
  data() {
    return {
      erros: [],
    }
  },
  components: {
    UserForm,
  },
  methods: {
    updateUser() {
      this.erros = [];
      api.put('/usuario', this.$store.state.user).then(() => {
        this.$store.dispatch("getUser");
        this.$router.push({name: "user"});
      }).catch(error => {
        this.erros.push(error.response.data.message);
      })
    }
  },
  created() {
    document.title = "Usuário | Editar";
  }
}
</script>

<style>

</style>