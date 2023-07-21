<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-layout>
        <v-navigation-drawer floating permanent>
          <v-list density="compact" nav>
            <router-link to="/" class="v-list-item__content">
            <v-list-item
              prepend-icon="mdi-view-dashboard"
              value="home"
            >
          
                <v-tooltip activator="parent" location="end">Accueil</v-tooltip>
                <span class="v-list-item__title">Accueil</span>
       
            </v-list-item>
          </router-link>
          <v-list-item >
          
            <v-tooltip>
              <template v-slot:activator="{ on }">
                <v-icon v-if="showAdministrationMenu">mdi-chevron-up</v-icon>
                  <v-icon v-else>mdi-chevron-down</v-icon>
                <v-btn
                  @click="showAdministrationMenu = !showAdministrationMenu"
                  flat
                  color="white"
                  v-on="on"
                >
                  <span>Administration</span>
                  
                </v-btn>
              </template>
              <span>Administration</span>
            </v-tooltip>
          </v-list-item>
            <v-list v-if="showAdministrationMenu">
             
              <router-link
                v-for="item in items"
                :key="item.text"
                :to="item.route"
              > 
        
                <v-list-item :prepend-icon="item.icon">
                  <span>{{ item.text }}</span>
           
                </v-list-item>
                
              </router-link>
      
            </v-list>
         
		   <router-link to="/about" class="v-list-item__content">
            <v-list-item
              prepend-icon="mdi-forum"
              value="about"
            >
            
              <v-tooltip activator="parent" location="end">A propos</v-tooltip>
              <span class="v-list-item__title">A propos</span>
            </v-list-item>
		   </router-link>
       
      </v-list>
        </v-navigation-drawer>
        <v-main style="height: 400px"></v-main>
      </v-layout>
    </v-navigation-drawer>

    <v-app-bar>
      <v-toolbar
        dark
        prominent
        image="https://images.vexels.com/content/221369/preview/sky-at-night-background-design-a1471a.png"
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Application</v-toolbar-title>
        <router-link to="/">
          <v-btn icon>
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </router-link>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

      </v-toolbar>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(null);

const items = [
  { icon: "mdi-account-circle ", text: "Personnel", route: "/listpersonnel" },
  { icon: "mdi-cash-register ", text: "Caisse", route: "/listcaisse" },
  //{ icon: 'mdi-cart' ,text: 'Client', route: '/' },
  // { icon :'mdi-cash-register   ',text: 'Click Me4', route: '/' },
];

const showAdministrationMenu = ref(false);

const navigateToPage = (route) => {
  useRouter().push(route);
};
</script>
