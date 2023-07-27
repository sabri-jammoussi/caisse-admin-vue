<template>
  <v-app id="inspire">
    <div >
    <v-navigation-drawer v-model="drawer" >
      <v-layout>
       
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
        <!-- </v-navigation-drawer> -->
        <v-main style="height: 200px"></v-main>
      </v-layout>
    </v-navigation-drawer>
  </div>
<div>
    <v-app-bar >
      <v-toolbar 
      color="rgb(41, 40, 44)"
        dark prominent
  
      >
        <v-app-bar-nav-icon @click="drawer = !drawer" style="color:white;"></v-app-bar-nav-icon>

        <v-toolbar-title style="color:white;">Application</v-toolbar-title>
          <!-- <router-link to="/">
            <v-btn icon>
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </router-link> -->
          
          <!-- <router-link v-if=" ! showLoginButton" to="/login">
    <v-btn icon @click="handleConnexionButtonClick">
      <v-tooltip activator="parent" location="end">Connexion</v-tooltip>
      <Icon icon="codicon:sign-in" width="23px" />
    </v-btn>
  </router-link> -->
  <router-link  to="/login">
  <v-btn icon style="color:white;">
    <v-tooltip activator="parent" location="end" >Déconnexion</v-tooltip>
    <Icon icon="material-symbols:logout" width="23px"  />
  </v-btn>
  </router-link>
      </v-toolbar>
    </v-app-bar>
  </div>
    <v-main>
      <router-view />
     


      
      
    </v-main>
    <v-footer color="rgb(70, 70,70)" app>
      <span style="color: white;">&copy;  {{ new Date().getFullYear() }} -APBS</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from '@iconify/vue';



  


const drawer = ref(null);
const showLoginButton = ref(false);
const showLogoutButton = ref(false);
const handleConnexionButtonClick = () => {
  // Add your logic here for handling the login functionality
  // For now, we'll just update the button visibility
  showLoginButton.value = true;
  showLogoutButton.value = false ;
};

// Handler for the Déconnexion button clic= () => {
  // Add your logic here for handling the logout functionality
  // For now, we'll just update the button visibility
//   showLoginButton.value = false;
//   showLogoutButton.value = true;
// };
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
