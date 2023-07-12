<template>
<v-container>
    <v-row justify="space-around">
      <v-card width="1000" title="Modifer"    >
  <v-sheet width="900" class="mx-auto">
    <v-text-field
      v-model="model.caisse.Code"
      :readonly="!editMode || !canEditCode"
      label="Code"
    ></v-text-field>
    <v-text-field
      v-model="model.caisse.Intitule"
      :readonly="!editMode"
      label="Intitule"
    ></v-text-field>
    <v-select
      v-model="model.caisse.Depot"
      :readonly="!editMode"
      :items="depotOptions"
      label="Depot"
    ></v-select>
    <v-select
      v-model="model.caisse.Souches"
      :readonly="!editMode"
      :items="souchesOptions"
      label="Souches"
    ></v-select>

    <v-btn v-if="!editMode" @click="enableEditMode">Modifier</v-btn>
    <v-btn v-else @click="submitChanges">Submit</v-btn>
    <router-link to="/ListCaisse">
      <v-btn>Retour</v-btn>
    </router-link>
  </v-sheet>
  </v-card>
    </v-row>
</v-container>
</template>

<script>
import axios from "axios";
import router from "@/router/index";

export default {
  name: "EditCaisse",
  data() {
    return {
      model: {
        caisse: {
          Code: "",
          Intitule: "",
          Depot: "",
          Souches: ""
        }
      },
      depotOptions: [],
      souchesOptions: [],
      editMode: false,
      canEditCode: false
    };
  },
  mounted() {
    this.getCaisseData(this.$route.params.id);
    this.getDepotOptions();
    this.getSouchesOptions();
  },
  methods: {
    async getCaisseData(Caisseid) {
      try {
        const res = await axios.get(`http://localhost:3000/caisses/${Caisseid}`);
        console.log(res.data);
        const caisseData = res.data; // Assuming the response contains the caisse data
        this.model.caisse = {
          Code: caisseData.Code,
          Intitule: caisseData.Intitule,
          Depot: caisseData.Depot,
          Souches: caisseData.Souches
        };
      } catch (error) {
        console.error(error);
      }
    },
    async getDepotOptions() {
      try {
        const res = await axios.get("http://localhost:3000/depots");
        this.depotOptions = res.data.map((depot) => depot.intitule);
      } catch (error) {
        console.error(error);
      }
    },
    async getSouchesOptions() {
      try {
        const res = await axios.get("http://localhost:3000/souches");
        this.souchesOptions = res.data.map((souche) => souche.intitule);
      } catch (error) {
        console.error(error);
      }
    },
    enableEditMode() {
      this.editMode = true;
      this.canEditCode = false;
    },
    async submitChanges() {
      const caisseId = this.$route.params.id;
      try {
        const res = await axios.put(`http://localhost:3000/caisses/${caisseId}`, this.model.caisse);
        console.log("aa");
        // alert(res.data.message);
        router.push({ name: "ListCaisse" }); // Redirect to /listcaisse
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
