<template>
  <v-sheet width="900" class="mx-auto">
    <form @submit.prevent="addCaisse">
      <v-text-field
        v-model="state.Code"
        label="Code"
        :error-messages="v$.Code.$errors.map((e) => e.$message)"
        @blur="v$.Code.touch"
        @input="v$.Code.$touch"
      >
      </v-text-field>
      <v-text-field
        v-model="state.Intitule"
        label="Intitule"
        :error-messages="v$?.Intitule?.$errors?.map((e) => e.$message)"
        @blur="v$.Intitule.touch"
        @input="v$.Intitule.$touch"
      ></v-text-field>
      <v-select
        v-model="state.Depot"
        :items="state.depotOptions"
        label="Depot"
        :error-messages="v$?.Depot?.$errors?.map((e) => e.$message)"
        @blur="v$.Depot.touch"
    @input="v$.Depot.$touch"
      ></v-select>
      <v-select
        v-model="state.Souches"
        :items="state.souchesOptions"
        label="Souches"
        :error-messages="v$?.Souches?.$errors?.map((e) => e.$message)"
        @blur="v$.Souches.touch"
        @input="v$.Souches.$touch"
      ></v-select>

      <v-btn type="submit" color="#007bff">Ajouter</v-btn>
      <router-link to="/ListCaisse">
        <v-btn color="red">Annuler</v-btn>
      </router-link>
    </form>
  </v-sheet>
</template>

<script>
import axios from "axios";
import router from "@/router/index";
import { reactive, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  name: "ADDCaisse",
  setup() {
    const initialState = {
      Code: "",
      Intitule: "",
      Depot: "",
      Souches: "",
      depotOptions: [],
      souchesOptions: [],
    };

    const state = reactive({
      ...initialState,
    });

    const rules = {
      Code: { required: helpers.withMessage("Code is required", required) },
      Intitule: {
        required: helpers.withMessage("Intitule is required", required),
      },
      Depot: { required: helpers.withMessage("Depot is required", required) },
      Souches: {
        required: helpers.withMessage("Souches is required", required),
      },
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
    v$.value.$touch();
    if (v$.value.$invalid) return;

    // Check if code already exists
    const response = await axios.get("http://localhost:3000/caisses");
    const existingCaisse = response.data.find(
      (caisse) => caisse.Code === state.Code
    );
    if (existingCaisse) {
      alert("Le code existe déjà !! Veuillez entrer un code unique.");
      return;
    }

    // Add the caisse
    await axios.post("http://localhost:3000/caisses", {
      Code: state.Code,
      Intitule: state.Intitule,
      Depot: state.Depot,
      Souches: state.Souches,
    });

    state.Code = "";
    state.Intitule = "";
    state.Depot = "";
    state.Souches = "";

    router.push({ name: "ListCaisse" });
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
  },
};
</script>
