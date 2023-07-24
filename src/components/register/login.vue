<template>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title>
              <h2 class="text-center">Connexion     </h2>
            </v-card-title>
            <v-card-text>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
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
                <p class="text-body-2">Vous n'avez pas de compte ? <a href="/signup" >Register</a></p>
            </div>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-end">
                    <v-btn :disabled="!valid" color="success" @click="validate">Connexion</v-btn>
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
  
  const valid = ref(true);
  
  const loginEmail = ref('');
  const loginPassword = ref('');
  
  const show1 = ref(false);
  
  const rules = {
    required: (value) => !!value || 'Password obligatoire.',
    min: (v) => (v && v.length >= 8) || 'Min 8 caractères'
  };
  
  const loginEmailRules = [
    (v) => !!v || 'E-mail obligatoire',
    (v) => /.+@.+\..+/.test(v) || 'E-mail doit avoir @'
  ];
  
  const validate = () => {
    if (loginForm.value.validate()) {
      // submit form to server/API here...
    }
  };
  </script>
  
  <style>
  /* Optional styling can be added here */
  </style>
  