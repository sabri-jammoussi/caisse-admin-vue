import { createRouter, createWebHistory } from "vue-router"
import Home from   '../components/pages/Home.vue'
import About from   '../components/pages/About.vue'
import Listcaisse from '../components/caisse/ListCaisse.vue'
import Ajoutercaisse from '../components/caisse/AjouterCaisses.vue'
import Editcaisse from '../components/caisse/EditCaisses.vue'
import Listpersonnel from '../components/personnel/ListPersonnel.vue'
import NotFound from   '../components/NotFound.vue'
import { RouterLink } from 'vue-router';

const routes =[
    {
    path: '/',
    name: "Home",
    component : Home 
    },
    {
        path :'/about',
        name : "About",
        component :About
    },
    {
        path : '/listcaisse',
        name:"ListCaisse",
        component : Listcaisse,
        
    },
    {
        path : '/AjouterCaisse',
        name:"Ajouter Caisse",
        component : Ajoutercaisse
    },
    {
        path : '/EditCaisse/:id',
        name:"EditCaisse",
        component : Editcaisse
    },
    {
        path : '/listpersonnel',
        name:"ListPersonnel",
        component : Listpersonnel
    },
    {
        path: '/:pathMatch(.*)*',
        component : NotFound
    },
  
]
const router = createRouter({
    history : createWebHistory(),
    routes,
    RouterLink,
})

export default router