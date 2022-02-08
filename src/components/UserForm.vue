<template>
  <form>
    <div class="user" v-if="showLoginData">
      <label for="name">Nome</label>
      <input type="text" name="name" id="name" v-model="nome" />
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="email" />
      <label for="password">Senha</label>
      <input type="password" name="password" id="password" v-model="senha" />
    </div>
    <label for="cep">CEP</label>
    <input type="text" name="cep" id="cep" v-model="cep" @keyup="fillCep" />
    <label for="rua">Rua</label>
    <input type="text" name="rua" id="rua" v-model="rua" />
    <label for="numero">Número</label>
    <input type="text" name="numero" id="numero" v-model="numero" />
    <label for="bairro">Bairro</label>
    <input type="text" name="bairro" id="bairro" v-model="bairro" />
    <label for="cidade">Cidade</label>
    <input type="text" name="cidade" id="cidade" v-model="cidade" />
    <label for="estado">Estado</label>
    <input type="text" name="estado" id="estado" v-model="estado" />
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from "@/helpers.js";
import { getCep } from "@/services.js";
export default {
  name: "UserForm",
  methods: {
    fillCep() {
      const cep = this.cep.replace(/\D/g, "");
      if (cep.length === 8) {
        getCep(cep).then((response) => {
          this.rua = response.data.logradouro;
          this.bairro = response.data.bairro;
          this.cidade = response.data.localidade;
          this.estado = response.data.uf;
        });
      }
    },
  },
  computed: {
    ...mapFields({
      fields: [
        "nome",
        "email",
        "senha",
        "cep",
        "rua",
        "numero",
        "bairro",
        "cidade",
        "estado",
      ],
      base: "user",
      mutation: "UPDATE_USER",
    }),
    showLoginData() {
      return !this.$store.state.login || this.$route.name === "user-edit";
    },
  },
};
</script>

<style scoped>
form,
.user {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}
.user {
  grid-column: 1 / -1;
}
.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>