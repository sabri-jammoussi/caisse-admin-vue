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
                v$?.caisse?.Intitule?.$errors?.map((e) => e.$message)"
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

            <v-btn
              v-if="!editMode"
              @click="enableEditMode"
              color="primary"
              class="button-group1"
              >Modifier</v-btn
            >
            <v-btn v-else type="submit" color="success" class="button-group1"
              >Submit</v-btn
            >
            <v-btn
              v-if="!editMode"
              color="red"
              @click="goToListCaisse"
              class="button-group"
              >Retour</v-btn
            >
            <v-btn v-else color="red" @click="resetForm" class="button-group"
              >Annuler</v-btn
            >
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
        await axios.put(`http://localhost:3000/caisses/${caisseId}`, model.value.caisse );

        router.push({ name: "ListCaisse" });
      } catch (error) {
        console.error(error);
      }
    }

    function goToListCaisse() {
      router.push({ name: "ListCaisse" });
    }

    function resetForm() {
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
.button-group1 {
  align-content: center;
  justify-content: flex-end;
  margin-top: 20px;
}
.button-group {
  align-content: center;
  justify-content: flex-end;
  margin-top: 20px;
  margin-left: 80px;
}

.v-input__control--outlined.error--text {
  border-color: red;
}
</style>
