<template>
<router-view/>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <!--  -->

      <v-layout>
        
        <v-navigation-drawer floating permanent>
          <v-list density="compact" nav>
            <v-list-item
              prepend-icon="mdi-view-dashboard"
              title="Home"
              value="home"
            ></v-list-item>
             <!-- dropdown Menu  -->
<div class="text-center">
    

    <v-menu>
      
      <template v-slot:activator="{ props: menu }">
        
        <v-tooltip >
          <template v-slot:activator="{ props: tooltip }">
            <v-list-item           prepend-icon="mdi-dialpad">
               <v-btn
  
              flat
              color="white"
              v-bind="mergeProps(menu, tooltip)"
            >
              Administration
            
            </v-btn>
            </v-list-item>
           
          </template>
          <span>Administration</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item.text"
        >
        <router-link to="/navbar">
          <v-btn>{{ item.text }}</v-btn>
        </router-link>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
            <v-list-item
              prepend-icon="mdi-forum"
              title="About"
              value="about"
            ></v-list-item>
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
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>
    </v-app-bar>

    <v-main>
      <!--  -->
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
        { icon:'dashboard' ,text: 'Click Me1', route: '/' },
        { icon: 'folder' ,text: 'Click Me2', route: '/' },
        { text: 'Click Me3', route: '/' },
        { text: 'Click Me4', route: '/' },
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


