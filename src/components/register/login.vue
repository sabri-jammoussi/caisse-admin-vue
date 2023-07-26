<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>
            <h2 class="text-center">Connexion</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="validate">
              <v-row>
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
                    <p class="text-body-2">Vous n'avez pas de compte ? <a href="/signup"  class="register">Register</a></p>
                  </div>
                </v-col>
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn :disabled="!valid" color="success" type="submit">Connexion</v-btn>
                </v-col>
                <v-col cols="12">
                  <!-- Show error message when it's not empty -->
                  <div v-if="errorText" class="error-message">{{ errorText }}</div>
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
import { ref } from 'vue';
import axios from 'axios';
import router from "@/router/index";

const valid = ref(true);
const loginEmail = ref('');
const loginPassword = ref('');
const show1 = ref(false);
const errorText = ref('');

const rules = {
  required: (value) => !!value || 'Password obligatoire.',
  min: (v) => (v && v.length >= 8) || 'Min 8 caractères'
};

const loginEmailRules = [
  (v) => !!v || 'E-mail obligatoire',
  (v) => /.+@.+\..+/.test(v) || 'E-mail doit avoir @'
];

const validate = async () => {
  try {
    // Make a GET request to your backend API with the provided email
    const response = await axios.get(`http://localhost:3000/authentification?email=${loginEmail.value}`);
    // Assuming the response data contains an array of users with the provided email
    const usersWithEmail = response.data;

    // Check if the array is not empty, which means the email exists in the database
    if (usersWithEmail.length > 0) {
      // Check if the password provided matches the password of the user
      const user = usersWithEmail[0]; 
      if (user.password === loginPassword.value) {
        router.push({ name: 'Home' });
      } else {
        // Handle invalid login credentials here (e.g., show error message)
        errorText.value = 'Invalid credentials. Please check your email and password.';
      }
    } else {
      // Handle invalid login credentials here (e.g., show error message)
      errorText.value = 'Invalid credentials. Please check your email and password.';
    }
  } catch (error) {
    // Handle API request errors here
    console.error('Error during API request:', error);
  }
};
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
.register{
  text-decoration: underline;
  color: blue;
}
</style>
