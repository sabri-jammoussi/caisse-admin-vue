<template>
    <v-container>
      <v-row justify="space-around">
        <v-card width="1000">
          <v-sheet width="900" class="mx-auto">
            <form @submit.prevent="submitChanges">
              <v-text-field
                v-model="nom"
                label="Nom"
                :error-messages="v$?.nom?.$errors?.map((e) => e.$message)"
                @blur="v$.nom.$touch"
                :readonly="!editMode"
                @input="v$.nom.$touch"
              ></v-text-field>
              <v-text-field
                v-model="prenom"
                label="Prenom"
                :error-messages="v$?.prenom?.$errors?.map((e) => e.$message)"
                @blur="v$.prenom.$touch"
                @input="v$.prenom.$touch"
                :readonly="!editMode"
              ></v-text-field>
              <v-text-field
                v-model="userEmail"
                label="Email"
                :error-messages="v$?.email?.$errors?.map((e) => e.$message)"
                @blur="v$.email.$touch"
                @input="v$.email.$touch"
                :readonly="!editMode"
              ></v-text-field>
              <v-text-field
                v-model="surnom"
                label="Surnom"
                :error-messages="v$?.surnom?.$errors?.map((e) => e.$message)"
                :readonly="!editMode || !canEditCode"
              ></v-text-field>
  
              <v-select
                v-model="role"
                :items="roleOptions"
                label="Role"
                :error-messages="v$?.role?.$errors?.map((e) => e.$message)"
                @blur="v$.role.$touch"
                @input="v$.role.$touch"
                :readonly="!editMode"
              ></v-select>
              <v-file-input
                label="File input"
                variant="filled"
                prepend-icon="mdi-camera"
              ></v-file-input>
              <button
                v-if="!editMode"
                @click="enableEditMode"
                color="primary"
                class="button-group1"
                style="--clr:blue"
              >
                <span>Modifier</span><i></i>
              </button>
              <button
                v-else
                type="submit"
                style="--clr:#39FF14"
                class="button-group1"
              >
                <span>Submit</span><i></i>
              </button>
              <button
                v-if="!editMode"
                style="--clr:red"
                @click="goToListUtilisateur"
              >
                <span>Retour</span><i></i>
              </button>
              <button
                v-else
                style="--clr:red"
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
    name: "EditUtilisateur",
    setup() {
      const role = ref("");
      const surnom = ref("");
      const nom = ref("");
      const prenom = ref("");
      const userEmail = ref("");
      const roleOptions = ref([]);
      const editMode = ref(false);
      const canEditCode = ref(false);
      const utilisateurOrigin = ref(null);
      const router = useRouter();
      const rules = {
        role: {
          required: withMessage("role obligatoire", required),
        },
        nom: { required: withMessage("nom obligatoire", required) },
        prenom: {
          required: withMessage("prenom obligatoire", required),
        },
        email: {
          required: withMessage("email obligatoire", required),
        },
      };
      const v$ = useVuelidate(rules, {
        role,
        surnom,
        nom,
        prenom,
        email: userEmail,
      });
  
      async function getUtilisateurData(utilisateurId) {
        try {
          const res = await axios.get(
            `http://localhost:3000/utilisateurs/${utilisateurId}`
          );
          console.log(res.data);
          const utilisateurData = res.data;
          utilisateurOrigin.value = { ...utilisateurData };
          nom.value = utilisateurData.nom;
          role.value = utilisateurData.role;
          surnom.value = utilisateurData.surnom;
          userEmail.value = utilisateurData.email;
          prenom.value = utilisateurData.prenom;
        } catch (error) {
          console.error(error);
        }
      }
  
      const getroleOptions = async () => {
        try {
          const response = await axios.get("http://localhost:3000/roles");
          roleOptions.value = response.data.map((res) => res.role);
        } catch (error) {
          console.error(error);
        }
      };
  
      function enableEditMode() {
        editMode.value = true;
        canEditCode.value = false;
      }
  
      async function submitChanges() {
        const utilisateurId = router.currentRoute.value.params.id;
        try {
          v$?.value.$touch();
          if (v$?.value.$invalid) return;
          await axios.put(`http://localhost:3000/utilisateurs/${utilisateurId}`, {
            nom: nom.value,
            prenom: prenom.value,
            surnom: surnom.value,
            role: role.value,
            email: userEmail.value,
          });
  
          router.push({ name: "ListPersonnel" });
        } catch (error) {
          console.error(error);
        }
      }
  
      function goToListUtilisateur() {
        console.log("return to list");
        router.push({ name: "ListPersonnel" });
      }
  
      function resetForm() {
        editMode.value = false;
  nom.value = utilisateurOrigin.value.nom;
  prenom.value = utilisateurOrigin.value.prenom;
  surnom.value = utilisateurOrigin.value.surnom;
  role.value = utilisateurOrigin.value.role;
  userEmail.value = utilisateurOrigin.value.email;
//   window.location.reload();
}

  
      onMounted(async () => {
        const utilisateurId = router.currentRoute.value.params.id;
        await getUtilisateurData(utilisateurId);
        await getroleOptions();
      });
  
      return {
        role,
        surnom,
        nom,
        prenom,
        userEmail,
        v$,
        editMode,
        canEditCode,
        submitChanges,
        enableEditMode,
        goToListUtilisateur,
        resetForm,
        roleOptions,
      };
    },
  };
  </script>
  <style scoped>
  button {
    border-radius: 12px;
  position: relative;
  background: #494949;
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
  