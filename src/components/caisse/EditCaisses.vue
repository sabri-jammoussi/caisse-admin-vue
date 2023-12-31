<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="1000" title="Modifier">
        <v-sheet width="900" class="mx-auto">
          <form @submit.prevent="submitChanges">
            <v-text-field
              v-model="model.caisse.Code"
              :readonly="!editMode || !canEditCode"
              label="Code"
            ></v-text-field>
            <v-text-field
              v-model="model.caisse.Intitule"
              :readonly="!editMode"
              :error-messages="
                v$?.caisse?.Intitule?.$errors?.map((e) => e.$message)
              "
              @blur="v$?.caisse?.Intitule?.$touch"
              @input="v$?.caisse?.Intitule?.$touch"
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

            <button
              v-if="!editMode"
              @click="enableEditMode"
              color="primary"
              class="button-group1"
              style="--clr: blue"
            >
              <span>Modifier</span><i></i>
            </button>
            <button
              v-else
              type="submit"
              style="--clr: #39ff14"
              class="button-group1"
            >
              <span>Submit</span><i></i>
            </button>
            <button v-if="!editMode" style="--clr: red" @click="goToListCaisse">
              <span>Retour</span><i></i>
            </button>
            <button
              v-else
              style="--clr: red"
              @click="resetForm"
              class="button-group"
            >
              <span>Annuler</span><i></i>
            </button>
            
          </form>
        </v-sheet>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useRouter } from "vue-router";
const { withMessage } = helpers;

export default {
  name: "EditCaisse",
  setup() {
    const model = ref({
      caisse: {
        Code: "",
        Intitule: "",
        Depot: "",
        Souches: "",
      },
    });

    const rules = {
      caisse: {
        Intitule: {
          required: withMessage("Intitule obligatoire", required),
        },
      },
    };

    const v$ = useVuelidate(rules, model);
    const caisseOrigin = ref(null);
    const depotOptions = ref([]);
    const souchesOptions = ref([]);
    const editMode = ref(false);
    const canEditCode = ref(false);

    const router = useRouter();

    async function getCaisseData(Caisseid) {
      try {
        const res = await axios.get(
          `http://localhost:3000/caisses/${Caisseid}`
        );
        console.log(res.data);
        const caisseData = res.data;
        caisseOrigin.value = { ...caisseData };
        model.value.caisse = {
          Code: caisseData.Code,
          Intitule: caisseData.Intitule,
          Depot: caisseData.Depot,
          Souches: caisseData.Souches,
        };
      } catch (error) {
        console.error(error);
      }
    }

    async function getDepotOptions() {
      try {
        const res = await axios.get("http://localhost:3000/depots");
        depotOptions.value = res.data.map((depot) => depot.intitule);
      } catch (error) {
        console.error(error);
      }
    }

    async function getSouchesOptions() {
      try {
        const res = await axios.get("http://localhost:3000/souches");
        souchesOptions.value = res.data.map((souche) => souche.intitule);
      } catch (error) {
        console.error(error);
      }
    }

    function enableEditMode() {
      editMode.value = true;
      canEditCode.value = false;
    }

    async function submitChanges() {
      const caisseId = router.currentRoute.value.params.id;
      try {
        v$?.value.$touch();
        if (v$?.value.$invalid) return;
        await axios.put(
          `http://localhost:3000/caisses/${caisseId}`,
          model.value.caisse
        );

        router.push({ name: "ListCaisse" });
      } catch (error) {
        console.error(error);
      }
    }

    function goToListCaisse() {
      router.push({ name: "ListCaisse" });
    }

    function resetForm() {
      editMode.value = false;
  model.value.caisse = { ...caisseOrigin.value };
 
}


    onMounted(async () => {
      const caisseId = router.currentRoute.value.params.id;
      await getCaisseData(caisseId);
      await getDepotOptions();
      await getSouchesOptions();
    });

    return {
      model,
      depotOptions,
      souchesOptions,
      editMode,
      canEditCode,
      enableEditMode,
      submitChanges,
      goToListCaisse,
      resetForm,
      v$,
    };
  },
};
</script>

<style scoped>
button {
  border-radius: 12px;
  position: relative;
  background: #9FAFA1;
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
