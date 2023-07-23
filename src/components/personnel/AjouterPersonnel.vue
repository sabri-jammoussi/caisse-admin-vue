<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="1000" title="Ajouter Utilisateur">
        <v-sheet width="900" class="mx-auto">
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
            <v-file-input
              label="File input"
              variant="filled"
              prepend-icon="mdi-camera"
            ></v-file-input>

            <button style="--clr: #39ff14" type="submit" class="button-85">
              <span>Ajouter</span><i></i>
            </button>

            <router-link to="/listpersonnel">
              <button style="--clr: red" type="submit" class="button-85">
                <span>Annuler</span><i></i>
              </button>
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
  name: "ADDUtilisateur",
  setup() {
    const role = ref("");
    const surnom = ref("");
    const nom = ref("");
    const prenom = ref("");
    const email = ref("");
    const roleOptions = ref([]);

    const SurnomIsUnique = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/utilisateurs?surnom=${surnom.value}`
        );

        const existingNom = response.data.find(
          (utilisateur) => utilisateur.surnom === surnom.value
        );
        console.log(existingNom)
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
    
    
    console.log(existingEmail)
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
        custom : withMessage("Email existe déja",withAsync(EmailIsUnique)),
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
