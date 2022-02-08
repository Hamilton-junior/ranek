import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import Login from "../views/Login.vue";
import User from "../views/user/User.vue";
import UserProducts from "../views/user/UserProducts.vue";
import UserEdit from "../views/user/UserEdit.vue";
import UserPurchases from "../views/user/UserPurchases.vue";
import UserSales from "../views/user/UserSales.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/produto/:id",
    name: "product",
    component: Product,
    props: true
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/usuario",
    component: User,
    meta: {
      login: true,
    },
    children: [
      {
        path: "",
        name: "user",
        component: UserProducts,
      },
      {
        path: "editar",
        name: "user-edit",
        component: UserEdit,
      },
      {
        path: "compras",
        name: "purchases",
        component: UserPurchases,
      },
      {
        path: "vendas",
        name: "sales",
        component: UserSales,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

// criando navigation guard
router.beforeEach((to, from, next) =>{
  // verifica se é necessário estar logado
  if(to.matched.some(record => record.meta.login)) {
    if(!window.localStorage.token) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
