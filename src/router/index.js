import { createRouter, createWebHistory } from "vue-router";
import Navbar from "@/components/pages/NavBar.vue";
import Home from "@/components/pages/Home.vue";
import About from "@/components/pages/About.vue";
import Listcaisse from "@/components/caisse/ListCaisse.vue";
import Ajoutercaisse from "@/components/caisse/AjouterCaisses.vue";
import Editcaisse from "@/components/caisse/EditCaisses.vue";
import Ajouterpersonnel from "@/components/personnel/Ajouterpersonnel.vue";
import Listpersonnel from "@/components/personnel/ListPersonnel.vue";
import Editpersonnel from "@/components/personnel/EditPersonnel.vue";
import login from "@/components/register/login.vue";
import signup from "@/components/register/sign_up.vue";
import app from '@/components/App.vue'
import NotFound from "@/components/NotFound.vue";

const routes = [
  {
    path: "/",
    component: Navbar,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "about",
        name: "About",
        component: About,
      },
      {
        path: "listcaisse",
        name: "ListCaisse",
        component: Listcaisse,
      },
      {
        path: "AjouterCaisse",
        name: "Ajouter Caisse",
        component: Ajoutercaisse,
      },
      {
        path: "EditCaisse/:id",
        name: "EditCaisse",
        component: Editcaisse,
      },
      {
        path: "listpersonnel",
        name: "ListPersonnel",
        component: Listpersonnel,
      },
      {
        path: "ajouterpersonnel",
        name: "AjouterPersonnel",
        component: Ajouterpersonnel,
      },
      {
        path: "editpersonnel/:id",
        name: "EditPersonnel",
        component: Editpersonnel,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    components: {
      default: app,
      login: login,
    },
  },
  {
    path: "/signup",
    name: "signup",
    components: {
      default: app,
      signup: signup,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
