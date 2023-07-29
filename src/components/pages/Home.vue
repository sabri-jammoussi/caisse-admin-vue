<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.dark.background }"
  >
    <v-container>
      <v-item-group mandatory class="mt-n10">
        <v-container>
          <v-row justify="center" class="space">
            <v-col cols="12" md="2">
              <v-item v-slot="{ active, toggle }">
                <v-card
                  :color="active ? '#49D9A0' : 'white'"
                  class="d-flex align-center rounded-xl"
                  dark
                  height="200"
                  @click="toggle"
                >
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-4">
                            <Icon
                              icon="streamline:interface-weather-windmill-windmill-velocity-weather-wind"
                              width="60px"
                              color="green"
                            />
                          </div>
                          <v-list-item-subtitle
                            :class="active ? 'white--text' : 'black--text'"
                            >Team velocity</v-list-item-subtitle
                          >
                          <v-list-item-title
                            class="headline mb-1"
                            :class="active ? 'white--text' : 'black--text'"
                          >
                            <strong>62%</strong>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-card>
              </v-item>
            </v-col>
            <v-col cols="12" md="2">
              <v-item v-slot="{ active }">
                <v-card
                  :color="active ? '#49D9A0' : 'white'"
                  class="d-flex align-center rounded-xl"
                  dark
                  height="200"
                  @click="navigateToRoute" 
                >
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-4">
                            <Icon
                              icon="et:profile-male"
                              width="60px"
                              color="green"
                            />
                          </div>
                          <v-list-item-subtitle
                            :class="active ? 'white--text' : 'black--text'"
                            >Team members</v-list-item-subtitle
                          >
                          <v-list-item-title
                            class="headline mb-1"
                            :class="active ? 'white--text' : 'black--text'"
                          >
                            <strong>{{ utilisateursCount }}</strong>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-card>
              </v-item>
            </v-col>
            <v-col cols="12" md="2">
              <v-item v-slot="{ active, toggle }">
                <v-card
                  :color="active ? '#49D9A0' : 'white'"
                  class="d-flex align-center rounded-xl"
                  dark
                  height="200"
                  @click="toggle"
                >
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-4">
                            <Icon
                              icon="clarity:tasks-line"
                              width="60px"
                              color="green"
                            />
                          </div>
                          <v-list-item-subtitle
                            :class="active ? 'white--text' : 'black--text'"
                            >Tasks delivered</v-list-item-subtitle
                          >
                          <v-list-item-title
                            class="headline mb-1"
                            :class="active ? 'white--text' : 'black--text'"
                          >
                            <strong>23</strong>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-card>
              </v-item>
            </v-col>
            <v-col cols="12" md="2">
              <v-item v-slot="{ active, toggle }">
                <v-card
                  :color="active ? '#49D9A0' : 'white'"
                  class="d-flex align-center rounded-xl"
                  dark
                  height="200"
                  @click="toggle"
                >
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-4">
                            <Icon
                              icon="material-symbols:search"
                              width="60px"
                              color="green"
                            />
                          </div>
                          <v-list-item-subtitle
                            :class="active ? 'white--text' : 'black--text'"
                            >Spikes delivered</v-list-item-subtitle
                          >
                          <v-list-item-title
                            class="headline mb-1"
                            :class="active ? 'white--text' : 'black--text'"
                          >
                            <strong>23</strong>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-card>
              </v-item>
            </v-col>
            <v-col cols="12" md="2">
              <v-item v-slot="{ active, toggle }">
                <v-card
                  :color="active ? '#49D9A0' : 'white'"
                  class="d-flex align-center rounded-xl"
                  dark
                  height="200"
                  @click="toggle"
                >
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-list-item three-line class="mt-10">
                        <v-list-item-content>
                          <div class="mb-4">
                            <Icon
                              icon="fontisto:world-o"
                              width="60px"
                              color="green"
                            />
                          </div>
                          <v-list-item-subtitle
                            :class="active ? 'white--text' : 'black--text'"
                            >News events</v-list-item-subtitle
                          >
                          <v-list-item-title
                            class="headline mb-1"
                            :class="active ? 'white--text' : 'black--text'"
                          >
                            <strong>15</strong>
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-col>
                  </v-row>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>

      <v-toolbar color="rgba(0,0,0,0)" flat class="mt-n15">
        <v-toolbar-title>Team members</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link to="/ajouterpersonnel">
          <v-btn rounded small> Add member </v-btn>
        </router-link>
      </v-toolbar>
      <v-card class="rounded-lg" >
        <v-row >
          <v-col  v-for="(item, index) in utilisateurs" :key="index" cols="12" sm="3">
            <v-list subheader two-line >
              <v-list-item >
                <v-badge
                  bordered
                  bottom
                  color="#49D9A0"
                  dot
                  offset-x="28"
                  offset-y="22"
                >
                  <v-list-item-avatar>
                    <v-avatar size="40">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/lists/2.jpg"
                      ></v-img>
                    </v-avatar>
                  </v-list-item-avatar>
                </v-badge>
                <v-list-item-content>
                  <v-list-item-title> {{ item.nom }} {{ item.prenom }} </v-list-item-title>

                  <v-list-item-subtitle>{{ item.role }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
         
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
import { ref , onMounted } from "vue";
import axios from "axios";
import { Icon } from "@iconify/vue";

export default {
  name: "Home",
  components: {
    Icon,
  },
  setup() {
    const activeItem = ref(null);
    const utilisateurs = ref([]);
    const utilisateursCount = ref(0);
    const getUtilisateurs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/utilisateurs");

        utilisateurs.value = res.data;
        console.log("aaaaaaaaaa", utilisateurs.value)
        utilisateursCount.value = utilisateurs.value.length;
      } catch (err) {
        console.error("errorr " ,err);
      }
    };
    
    const toggle = (item) => {
      activeItem.value = item === activeItem.value ? null : item;
    };
    const navigateToRoute = () => {
      // Add the route path you want to navigate to
      router.push({ name: "ListPersonnel" });
    };
   onMounted(()=>{
    getUtilisateurs();
   })
    return {
      activeItem,
      toggle,
      getUtilisateurs,
      utilisateurs,
      utilisateursCount,
      navigateToRoute
    };
  },
};
</script>
 

  <style>
.space {
  margin-top: -150px;
  margin-left: -100px;
  margin-right: -100px;
}
</style>
  