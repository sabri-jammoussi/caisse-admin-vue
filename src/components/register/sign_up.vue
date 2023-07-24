<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>
            <h2 class="text-center">Register</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="registerForm" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="firstName" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    :rules="[rules.required, rules.min]"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show2 = !show2"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    block
                    v-model="verify"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show3 ? 'text' : 'password'"
                    :rules="[rules.required, passwordMatch]"
                    name="input-10-1"
                    label="Confirm Password"
                    counter
                    @click:append="show3 = !show3"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex justify-end" cols="12">
                  <v-btn :disabled="!valid" color="success" @click="validate">Register</v-btn>
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

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const verify = ref('');

const show2 = ref(false);
const show3 = ref(false);

const rules = {
  required: (value) => !!value || 'Ce champ obligatoire.',
  min: (v) => (v && v.length >= 8) || 'Min 8 caractères'
};

const emailRules = [
  (v) => !!v || 'E-mail obligatoire',
  (v) => /.+@.+\..+/.test(v) || 'E-mail doit avoir @'
];

const passwordMatch = () => password.value === verify.value || 'Password doit correspondre';

const validate = () => {
  if (registerForm.value.validate()) {
    // submit form to server/API here...
  }
};
</script>

<style>
/* Optional styling can be added here */
</style>
