<template>
  <form>
    <label for="name">Nome</label>
    <input type="text" name="name" id="name" v-model="name">
    <label for="email">Email</label>
    <input type="email" name="email" id="email" v-model="email">
    <label for="password">Senha</label>
    <input type="password" name="password" id="password" v-model="password">
    <label for="cep">CEP</label>
    <input type="text" name="cep" id="cep" v-model="cep">
    <label for="rua">Rua</label>
    <input type="text" name="rua" id="rua" v-model="rua">
    <label for="numero">Número</label>
    <input type="text" name="numero" id="numero" v-model="numero">
    <label for="bairro">Bairro</label>
    <input type="text" name="bairro" id="bairro" v-model="bairro">
    <label for="cidade">Cidade</label>
    <input type="text" name="cidade" id="cidade" v-model="cidade">
    <label for="estado">Estado</label>
    <input type="text" name="estado" id="estado" v-model="estado">
    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
export default {
  name: "UserForm",
}
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}
.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>