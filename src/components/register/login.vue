<template>
  <v-container fluid>
    <v-row justify="center" class="mt-10">
      <v-col cols="12" sm="8" md="6">
        <v-card class="login-card">
          <v-card-title>
            <h2 class="text-center">Connexion</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="validate">
              <v-row>
                <v-col cols="12">
                  <!-- Show error message when it's not empty -->
                  <div v-if="errorText" class="error-message">{{ errorText }}</div>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" placeholder="UserName@Domain.com" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginPassword"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    :rules="[rules.required, rules.min]"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <div class="mt-2">
                    <p class="text-body-2">Vous n'avez pas de compte ? <a href="/signup" class="register">Register</a></p>
                  </div>
                </v-col>
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn :disabled="!valid" color="success" type="submit">Connexion</v-btn>
                </v-col>
               
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router/index';
import { useUserStore } from '@/store/store.js';

const valid = ref(true);
const loginEmail = ref('');
const loginPassword = ref('');
const show1 = ref(false);
const errorText = ref('');
const useremail = useUserStore();
const emailuser = ref();

const rules = {
  required: (value) => !!value || 'Password obligatoire.',
  min: (v) => (v && v.length >= 8) || 'Min 8 caractères'
};

const loginEmailRules = [
  (v) => !!v || 'E-mail obligatoire',
  (v) => /.+@.+\..+/.test(v) || 'E-mail doit avoir @ et .Domain '
];

const validate = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/authentification?email=${loginEmail.value}`);
    const usersWithEmail = response.data;

    if (usersWithEmail.length > 0) {
      const user = usersWithEmail[0];
      if (user.password === loginPassword.value) {
        router.push({ name: 'Home' });
      } else {
        errorText.value = "Les informations d'identification invalides. Veuillez vérifier votre e-mail et votre mot de passe.";
      }
    } else {
      errorText.value = "Les informations d'identification invalides. Veuillez vérifier votre e-mail et votre mot de passe.";
    }
  } catch (error) {
    console.error('Error during API request:', error);
  }
};

// Use onMounted hook to call validate function when the component is mounted
onMounted(async () => {
  const emailuser = loginEmail.value;
  useremail.setEmail(emailuser);
});
</script>

<style>
/* Optional styling can be added here */
.success {
  background: #2ecc71;
  color: #ffffff;
}

.success:hover {
  background: #27ae60;
  color: #ffffff;
}

.error-message {
  color: red;
  margin-top: 8px;
}

.register {
  text-decoration: underline;
  color: blue;
}

.login-card {
  /* background-image: url("@/assests/images/bg.jpg"); */
  overflow: hidden;
  background-size: cover;
  background-position: center;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1);
            box-shadow: 0 0 17px #333;
            border-radius: 12px;
  backdrop-filter: blur(5px); /* Apply a blur effect for transparency */
}

/* Center the content vertically */
.v-container .v-row.justify-center {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
