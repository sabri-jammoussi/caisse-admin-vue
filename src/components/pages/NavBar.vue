<template>

  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer"  >
      <!--  -->

      <v-layout>
       
        <v-navigation-drawer floating permanent >
          <v-list density="compact" nav >
            <v-list-item
    prepend-icon="mdi-view-dashboard"
    value="home"
  >
    <router-link to="/" class="v-list-item__content">
      <v-tooltip activator="parent" location="end">Home</v-tooltip>
      <span class="v-list-item__title">Home</span>
    </router-link>
  </v-list-item>
             <!-- dropdown Menu  -->

    

    <v-menu>
      
      <template v-slot:activator="{ props: menu }">
        
        <v-tooltip >
          <template v-slot:activator="{ props: tooltip }">
            <v-list-item           >
               <v-btn
  
              flat
              color="white"
              v-bind="mergeProps(menu, tooltip)"
                prepend-icon="mdi-chevron-down "
            >
              Administration
            
            </v-btn>
            </v-list-item>
           
          </template>
          <span>Administration</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :prepend-icon="item.icon"
        >
        <router-link :to="item.route">
          <span>{{ item.text }}</span>
        </router-link>
        </v-list-item>
      </v-list>
    </v-menu>
    

              <v-list-item
    prepend-icon="mdi-forum"
    value="about"
  >
    <router-link to="/about" class="v-list-item__content">
      <v-tooltip activator="parent" location="end">About</v-tooltip>
      <span class="v-list-item__title">About</span>
    </router-link>
  </v-list-item>
    </v-list>
        </v-navigation-drawer>
        <v-main style="height: 250px"></v-main>
      </v-layout>
     
    </v-navigation-drawer>

    <v-app-bar>
      <v-toolbar
        dark
        prominent
        image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
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
     <router-view/>
    </v-main>
  </v-app>
  
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(null);
</script>

<script>
import { mergeProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  data() {
    return {
      drawer: false,
      items: [
        

        { icon:'mdi-account-circle ',text: 'Personnel', route: '/listpersonnel' },
        { icon:'mdi-cash-register ' ,text: 'Caisse', route: '/listcaisse' },
         //{ icon: 'mdi-cart' ,text: 'Client', route: '/' },
        // { icon :'mdi-cash-register   ',text: 'Click Me4', route: '/' },
      ],
    };
  },
  methods: {
    mergeProps,
    navigateToPage(route) {
      this.$router.push(route);
    },
  },
};
</script>


