<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title>
            <h2 class="text-center">Register</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signUp">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="firstName"
                    :error-messages="
                      v$.firstName.$errors.map((e) => e.$message)
                    "
                    label="First Name"
                    maxlength="20"
                    @blur="v$.firstName.touch"
                    @input="v$.firstName.$touch"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="lastName"
                    :error-messages="v$.lastName.$errors.map((e) => e.$message)"
                    label="Last Name"
                    maxlength="20"
                    @blur="v$.lastName.touch"
                    @input="v$.lastName.$touch"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :error-messages="v$.email.$errors.map((e) => e.$message)"
                    label="E-mail"
                    @blur="v$.email.touch"
                    @input="v$.email.$touch"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    :error-messages="v$.password.$errors.map((e) => e.$message)"
                    name="input-10-1"
                    label="Password"
                    @blur="v$.password.touch"
                    @input="v$.password.$touch"
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
                    :error-messages="v$.verify.$errors.map((e) => e.$message)"
                    name="input-10-1"
                    label="Confirm Password"
                    @blur="v$.verify.touch"
                    @input="v$.verify.$touch"
                    counter
                    @click:append="show3 = !show3"
                  ></v-text-field>
                </v-col>
                <div class="mt-5">
                  <p class="text-body-2">
                    Avez vous de compte ?
                    <a href="/login" class="register">Connexion</a>
                  </p>
                </div>
                <v-col class="d-flex justify-end" cols="12">
                  <!-- Use v-btn with "success" class for green color -->
                  <div>
                    <v-btn class="success" type="submit"> Register </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import router from "@/router/index";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  helpers,
  minLength,
  sameAs,
} from "@vuelidate/validators";
const { withMessage, withAsync } = helpers;

export default {
  name: "Sign_up",
  setup() {
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const verify = ref("");
    const show2 = ref(false);
    const show3 = ref(false);

    // const passwordMatch = () => password.value === verify.value || 'Password must match';
    const emailRules = [
      (v) => /.+@.+\..+/.test(v)
    ];
    const EmailIsUnique = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/authentification?email=${email.value}`
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
      firstName: {
        required: withMessage("First Name obligatoire", required),
        min: withMessage("Min 3 caractères", minLength(3)),
      },
      lastName: {
        required: withMessage("Last Name obligatoire", required),
        min: withMessage("Min 3 caractères", minLength(3)),
      },
      email: {
        required: withMessage("E-mail obligatoire", required),
        custom: withMessage("Email existe déja", withAsync(EmailIsUnique)),
        emailRule: withMessage("email doit avoir  @ and .domain", (v) => /.+@.+\..+/.test(v) ),
      },
      password: {
        required: withMessage("Password obligatoire", required),
        min: withMessage("Min 8 caractères", minLength(8)),
      },
      verify: {
        required: withMessage("Confirm Password obligatoire", required),
        verify: withMessage("Password must match ", sameAs(password)),
      },
    };

    const v$ = useVuelidate(rules, {
      firstName,
      lastName,
      email,
      password,
      verify,
    });

    const signUp = async () => {
      try {
        v$.value.$touch();
        if (!v$.value.$invalid) {
          await axios.post(`http://localhost:3000/authentification`, {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            confirmPassword: verify.value,
          });

          // Reset the form
          firstName.value = "";
          lastName.value = "";
          email.value = "";
          password.value = "";
          verify.value = "";

          router.push({ name: "login" });
        }
      } catch (error) {
        // Handle API request errors here
        console.error("Error during API request:", error);
      }
    };

    return {
      firstName,
      lastName,
      email,
      password,
      verify,
      show2,
      show3,
      v$,
      signUp,
    };
  },
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
</style>
  