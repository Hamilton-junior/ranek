import Vue from 'vue';
import Vuex from 'vuex';
import { api } from '../services.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    user: {
      id: '',
      name: '',
      email: '',
      password: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
    user_products: null,
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
    },
    UPDATE_USER_PRODUCTS(state, payload) {
      state.user_products = payload;
    },
    ADD_USER_PRODUCTS(state, payload) {
      state.user_products.unshift(payload);
    }
  },
  actions: {
    getUser(context, payload) {
      return api.get(`/usuario/${payload}`).then((response) => {
        context.commit('UPDATE_USER', response.data);
        context.commit('UPDATE_LOGIN', true);
      });
    },
    getUserProducts(context) {
      api.get(`/produto?usuario_id=${context.state.user.id}`).then(response => {
        context.commit("UPDATE_USER_PRODUCTS", response.data)
      })
    },
    createUser(context, payload) {
      context.commit('UPDATE_USER', { id: payload.email });
      return api.post('/usuario', payload);
    },
    logOutUser(context) {
      context.commit("UPDATE_USER", {
        id: '',
        name: '',
        email: '',
        password: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
      });
      context.commit("UPDATE_LOGIN", false);
    }
  },
});
