<template>
  <v-container>
    
    <v-row justify="space-around">
      <v-card width="1000" height="450"   title="Ajouter Caisse">
        <v-sheet width="900"   class="mx-auto">
          <form @submit.prevent="addCaisse">
            <v-text-field
              v-model="code"
              label="Code"
              :error-messages="v$.code.$errors.map((e) => e.$message)"
            ></v-text-field>
            <v-text-field
              v-model="intitule"
              label="Intitule"
              :error-messages="v$?.intitule?.$errors?.map((e) => e.$message)"
              @blur="v$.intitule.touch"
              @input="v$.intitule.$touch"
            ></v-text-field>
            <v-select
              v-model="depot"
              :items="depotOptions"
              label="Depot"
              :error-messages="v$?.depot?.$errors?.map((e) => e.$message)"
              @blur="v$.depot.touch"
              @input="v$.depot.$touch"
            ></v-select>
            <v-select
              v-model="souche"
              :items="souchesOptions"
              label="Souches"
              :error-messages="v$?.souche?.$errors?.map((e) => e.$message)"
              @blur="v$.souche.touch"
              @input="v$.souche.$touch"
            ></v-select>
            <v-row justify="flex-end"     class="button-group">
              <v-btn type="submit" class="button-85 green-btn">Ajouter</v-btn>
              <router-link to="/ListCaisse">
                <v-btn type="submit" class="button-85 red-btn">Annuler</v-btn>
              </router-link>
            </v-row >
          </form>
        </v-sheet>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import router from "@/router/index";
import { ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
const { withMessage, withAsync } = helpers;
export default {
  name: "ADDCaisse",
  setup() {
    const code = ref("");
    const intitule = ref("");
    const depot = ref("");
    const souche = ref("");
    const depotOptions = ref([]);
    const souchesOptions = ref([]);

    const codeIsUnique = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/caisses?code=${code.value}`
        );

        const existingCaisse = response.data.find(
          (caisse) => caisse.Code === code.value
        );

        if (existingCaisse) return false;
        else return true;
        /*    var result = existingCaisse ? false : true;
        console.log("********************code unique22222",result)
        return result; */
      } catch (error) {
        console.error(error);
        return false;
      }
    };

    const rules = {
      code: {
        required: withMessage("Code obligatoire", required),
        custom: withMessage("Code existe déja", withAsync(codeIsUnique)),
      },
      intitule: {
        required: withMessage("Intitule obligatoire", required),
      },
      depot: { required: withMessage("Depot obligatoire", required) },
      souche: {
        required: withMessage("Souches obligatoire", required),
      },
    };

    const v$ = useVuelidate(rules, { code, intitule, depot, souche });

    const getDepotOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/depots");
        depotOptions.value = response.data.map((depot) => depot.intitule);
      } catch (error) {
        console.error(error);
      }
    };

    const getSouchesOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/souches");
        souchesOptions.value = response.data.map((souche) => souche.intitule);
      } catch (error) {
        console.error(error);
      }
    };

    const addCaisse = async () => {
      try {
        v$.value.$touch();
        if (v$.value.$invalid) return;

        // Add the caisse
        await axios.post("http://localhost:3000/caisses", {
          Code: code.value,
          Intitule: intitule.value,
          Depot: depot.value,
          Souches: souche.value,
        });

        // Reset the form
        code.value = "";
        intitule.value = "";
        depot.value = "";
        souche.value = "";

        router.push({ name: "ListCaisse" });
      } catch (error) {
        console.error(error);
        // Uncomment the following line if you want to display an error message
        // alert("An error occurred while adding the caisse");
      }
    };

    onMounted(async () => {
      await getDepotOptions();
      await getSouchesOptions();
    });

    return {
      code,
      intitule,
      depot,
      souche,
      v$,
      addCaisse,
      depotOptions,
      souchesOptions,
    };
  },
};
</script>
<style scoped>
.button-group {
  margin-top: 20px;
  justify-content: flex-end;
  
}
.green-btn {
  background: #36b120;
  color: #ffffff;

}

.red-btn {
  background: red;
  color: #ffffff;
  margin-left: 20px;  
}

/* Add hover styles for the buttons */
.green-btn:hover {
  background: #258e0d;
  color: #ffffff;
}

.red-btn:hover {
  background: #b31010;
  color: #ffffff;
}

</style>
