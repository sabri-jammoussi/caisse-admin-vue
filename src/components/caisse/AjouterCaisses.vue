<template>
  <v-sheet width="900" class="mx-auto">
    <form @submit.prevent="addCaisse"> 
    <v-text-field 
    v-model="state.Code" 
    label="Code" 
    :error-messages="v$.Code.$errors.map(e => e.$message)"  
    @blur="v$.Code.touch"
    @input="v$.Code.$touch"
    > 
    </v-text-field>
    <v-text-field v-model="state.Intitule" label="Intitule" :error-messages="v$?.Intitule?.$errors?.map(e => e.$message)"></v-text-field>
    <v-select v-model="state.Depot" :items="state.depotOptions" label="Depot" :error-messages="v$?.Depot?.$errors?.map(e => e.$message)"></v-select>
    <v-select v-model="state.Souches" :items="state.souchesOptions" label="Souches" :error-messages="v$?.Souches?.$errors?.map(e => e.$message)"></v-select>

    <v-btn type ="submit">Ajouter</v-btn>
    <router-link to="/ListCaisse">
      <v-btn>Annuler</v-btn>
    </router-link>
    </form>
  </v-sheet>
</template>

<script>
import axios from "axios";
import router from "@/router/index";
import { reactive, onMounted } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: "ADDCaisse",
  setup() {
    const initialState = {
      Code: "",
      Intitule: "",
      Depot: "",
      Souches: "",
      depotOptions: [],
      souchesOptions: []
    };

    const state = reactive({
        ...initialState,
    });

    const rules = {
      Code: { required  },
      Intitule: { required },
      Depot: { required },
      Souches: { required }
    };

    const v$ = useVuelidate(rules, state);

    const getDepotOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/depots");
        state.depotOptions = response.data.map((depot) => depot.intitule);
      } catch (error) {
        console.error(error);
      }
    };

    const getSouchesOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/souches");
        state.souchesOptions = response.data.map((souche) => souche.intitule);
      } catch (error) {
        console.error(error);
      }
    };

    const addCaisse = async () => {
      try {
         console.log("+++++++++++++++++++++++++++++V$",v$.value)
        
        v$.value.$touch();
        if (v$.value.$invalid) return;
        
        const response = await axios.post(
          "http://localhost:3000/caisses",
          {
            Code: state.Code,
            Intitule: state.Intitule,
            Depot: state.Depot,
            Souches: state.Souches
          }
        );
        console.log("okkkkkkkkkkk");
       
        alert("Caisse added successfully");
        state.Code = "";
        state.Intitule = "";
        state.Depot = "";
        state.Souches = "";
        router.push({ name: "ListCaisse" }); // Redirect to /listcaisse
      } catch (error) {
        console.error(error);
        alert("An error occurred while adding the caisse");
      }
    };
    
    onMounted(() => {
      getDepotOptions();
      getSouchesOptions();
    });

    return { state, v$, addCaisse };
  }
};
</script>
