<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email">
      <label for="password">Senha</label>
      <input type="password" name="password" id="password" v-model="login.senha">
      <button class="btn" @click.prevent="logar">Logar</button>
    </form>
    <p class="lose-password">
      <a href="/" target="_blank">Perdeu a senha? Clique aqui.</a>
    </p>
    <LoginCreate />
  </section>
</template>

<script>
import LoginCreate from "@/components/LoginCreate.vue";
export default {
  name: "Login",
  components: {
    LoginCreate,
  },
  data() {
    return {
      login: {
        email: '',
        senha: '',
      }
    }
  },
  methods: {
    logar() {
      this.$store.dispatch('loginUser', this.login).then(() => {
      this.$store.dispatch("getUser");
      this.$router.push({name: 'user'})
      })
      
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}
  .login {
    max-width: 500px;
    margin: 0 auto;
    padding: 0 20px;
  }
  form {
    display: grid;
  }
  .btn {
    width: 100%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
  .lose-password {
    text-align: center;
    margin: 20px auto 0 auto;
  }
  .lose-password:hover,
  .lose-password a:hover {
    color: #87f;
    text-decoration: underline;
  }
</style>