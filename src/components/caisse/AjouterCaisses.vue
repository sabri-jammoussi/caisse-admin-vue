<template>
  <v-container>
    
    <v-row justify="space-around">
      <v-card width="1000"   title="Ajouter Caisse">
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
            <button style="--clr:#39FF14" type="submit" class="button-85"><span>Ajouter</span><i></i></button >

            <router-link to="/ListCaisse">
              <button style="--clr:red" type="submit" class="button-85"><span>Annuler</span><i></i></button >
            </router-link>
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
  align-content: center;
  justify-content: flex-end;
  margin-top: 20px;
  margin-left: 80px;
}

  button {
    border-radius: 12px;
  position: relative;
  background: #444;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  border: none;
  letter-spacing: 0.1rem;
  font-size: 1rem;
  padding: 1rem 3rem;
  transition: 0.2s;
  align-content: center;
  justify-content: flex-end;
  margin-top: 20px;
  margin-left: 160px;
}

button:hover {
  letter-spacing: 0.2rem;
  padding: 1.1rem 3.1rem;
  background: var(--clr);
  color: var(--clr);
  /* box-shadow: 0 0 35px var(--clr); */
  animation: box 3s infinite;
}

button::before {
  content: "";
  position: absolute;
  inset: 2px;
  background: #484646;
  border-radius: 12px;
}

button span {
  position: relative;
  z-index: 1;
}
button i {
  position: absolute;
  inset: 0;
  display: block;
}

button i::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 2px;
  left: 80%;
  top: -2px;
  border: 2px solid var(--clr);
  background: #272822;
  transition: 0.2s;
}

button:hover i::before {
  width: 15px;
  left: 20%;
  animation: move 3s infinite;
}

button i::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 2px;
  left: 20%;
  bottom: -2px;
  border: 2px solid var(--clr);
  background: #272822;
  transition: 0.2s;
}

button:hover i::after {
  width: 15px;
  left: 80%;
  animation: move 3s infinite;
}

@keyframes move {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes box {
  0% {
    box-shadow: #27272c;
  }
  50% {
    box-shadow: 0 0 25px var(--clr);
  }
  100% {
    box-shadow: #27272c;
  }
}

</style>
