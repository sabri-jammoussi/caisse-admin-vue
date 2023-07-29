<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="1000" title="Ajouter Utilisateur">
        <v-sheet width="900" height="460" class="mx-auto">
          <form @submit.prevent="addUtilisateur">
            <v-text-field
              v-model="nom"
              label="Nom"
              :error-messages="v$?.nom?.$errors?.map((e) => e.$message)"
              @blur="v$.nom.touch"
              @input="v$.nom.$touch"
            ></v-text-field>
            <v-text-field
              v-model="prenom"
              label="Prenom"
              :error-messages="v$?.prenom?.$errors?.map((e) => e.$message)"
              @blur="v$.prenom.touch"
              @input="v$.prenom.$touch"
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              :error-messages="v$?.email?.$errors?.map((e) => e.$message)"
              @blur="v$.email.touch"
              @input="v$.email.$touch"
            ></v-text-field>
            <v-text-field
              v-model="surnom"
              label="Surnom"
              :error-messages="v$?.surnom?.$errors?.map((e) => e.$message)"
              @blur="v$.surnom.touch"
              @input="v$.surnom.$touch"
            ></v-text-field>

            <v-select
              v-model="role"
              :items="roleOptions"
              label="Role"
              :error-messages="v$?.role?.$errors?.map((e) => e.$message)"
              @blur="v$.role.touch"
              @input="v$.role.$touch"
            ></v-select>
            <!-- <v-file-input
              v-model="photo"
              label="Photo"
              @change="onPhotoChange"
              variant="filled"
              prepend-icon="mdi-camera"
            ></v-file-input> -->

            <v-row justify="flex-end"     class="button-group">
              <v-btn type="submit" class="button-85 green-btn">Ajouter</v-btn>
              <router-link to="/listpersonnel">
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
  name: "ADDUtilisateur",
  setup() {
    const role = ref("");
    const surnom = ref("");
    const nom = ref("");
    const prenom = ref("");
    const email = ref("");
    const roleOptions = ref([]);
     const photo = ref(null);
    const SurnomIsUnique = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/utilisateurs?surnom=${surnom.value}`
        );

        const existingNom = response.data.find(
          (utilisateur) => utilisateur.surnom === surnom.value
        );
        console.log(existingNom);
        if (existingNom) return false;
        else return true;
        /*    var result = existingCaisse ? false : true;
        console.log("********************role unique22222",result)
        return result; */
      } catch (error) {
        console.error(error);
        return false;
      }
    };
    const EmailIsUnique = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/utilisateurs?email=${email.value}`
        );

        const existingEmail = response.data.find(
          (utilisateur) => utilisateur.email === email.value
        );

        console.log(existingEmail);
        return !existingEmail;

        // Return false if email is not unique, true otherwise
      } catch (error) {
        console.error(error);
        return false;
      }
    };

    const rules = {
      role: {
        required: withMessage("role obligatoire", required),
      },
      surnom: {
        required: withMessage("surnom obligatoire", required),
        custom: withMessage("surnom existe déja", withAsync(SurnomIsUnique)),
        
      },
      nom: { required: withMessage("nom obligatoire", required) },
      prenom: {
        required: withMessage("prenoms obligatoire", required),
      },
      email: {
        required: withMessage("email obligatoire ", required),
        custom: withMessage("Email existe déja", withAsync(EmailIsUnique)),
        emailRule: withMessage("email doit avoir  @ and .domain", (v) => /.+@.+\..+/.test(v) ),
      },
    };

    const v$ = useVuelidate(rules, { role, surnom, nom, prenom, email });

    const getroleOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/roles");
        roleOptions.value = response.data.map((res) => res.role);
      } catch (error) {
        console.error(error);
      }
    };

    const addUtilisateur = async () => {
      try {
        v$.value.$touch();
        if (v$.value.$invalid) return;

        // Add the caisse
        await axios.post("http://localhost:3000/utilisateurs", {
          role: role.value,
          surnom: surnom.value,
          nom: nom.value,
          prenom: prenom.value,
          email: email.value,
        });

        // Reset the form
        role.value = "";
        surnom.value = "";
        nom.value = "";
        prenom.value = "";
        email.value = "";
        router.push({ name: "ListPersonnel" });
      } catch (error) {
        console.error(error);
        // Uncomment the following line if you want to display an error message
        // alert("An error occurred while adding the caisse");
      }
    };

    onMounted(async () => {
      await getroleOptions();
    });

    return {
      role,
      surnom,
      nom,
      prenom,
      email,
      v$,
      addUtilisateur,
      roleOptions,
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
