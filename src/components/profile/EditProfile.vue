<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="login-card">
            <v-card-title>
              <h2 class="text-center">Modifier</h2>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="submitChanges">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="firstName"
                      :error-messages="
                        v$.firstName.$errors.map((e) => e.$message)
                      "
                      label="Prénom"
                      maxlength="20"
                      @blur="v$.firstName.touch"
                      @input="v$.firstName.$touch"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="lastName"
                      :error-messages="v$.lastName.$errors.map((e) => e.$message)"
                      label="Nom de famille"
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
             
                  <v-col cols="12" class="d-flex justify-center" >
                    <!-- Use v-btn with "success" class for green color -->
                    <div>
                      <v-btn class="successs" type="submit"> Modifier </v-btn>
                    </div>
                  </v-col>
                  <v-col class="d-flex justify-center " cols="12">
                    <!-- Use v-btn with "success" class for green color -->
                    <div>
                      <router-link to="/">
                        <v-btn color="red"  type="submit"> Annuler </v-btn>
                      </router-link>
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
  import { ref , onMounted} from "vue";
  import axios from "axios";
  import router from "@/router/index";
  import { useVuelidate } from "@vuelidate/core";
  import {useUserStore } from"@/store/store"; 
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
      const utilisateurOrigin = ref(null);
      const store = useUserStore();  
      const utilisateurId = store.user.id;
      // const passwordMatch = () => password.value === verify.value || 'Password must match';
    //   const emailRules = [
    //     (v) => /.+@.+\..+/.test(v)
    //   ];
      /*  */
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
          emailRule: withMessage("email doit avoir  @ and .domain", (v) => /.+@.+\..+/.test(v) ),
        },
        password: {
          required: withMessage("Password obligatoire", required),
          min: withMessage("Min 8 caractères", minLength(8)),
        },
        verify: {
          required: withMessage("Confirm Password obligatoire", required),
          verify: withMessage("le mot de passe doit correspondre ", sameAs(password)),
        },
      };
  
      const v$ = useVuelidate(rules, {
        firstName,
        lastName,
        email,
        password,
        verify,
      });
      async function getUtilisateurData() {
        try {
          const res = await axios.get(
            `http://localhost:3000/authentification/${utilisateurId}`
          );
          console.log("dataaa",res.data);
          const utilisateurData = res.data;
          utilisateurOrigin.value = { ...utilisateurData };
          firstName.value = utilisateurData.firstName;
          lastName.value = utilisateurData.lastName;
          email.value = utilisateurData.email;
          password.value = utilisateurData.password;
          verify.value = utilisateurData.confirmPassword;
        } catch (error) {
          console.error(error);
        }
      }

      const submitChanges = async () => {


        try {
          v$.value.$touch();
          if (!v$.value.$invalid) {
            await axios.put(`http://localhost:3000/authentification/${utilisateurId}`, {
              firstName: firstName.value,
              lastName: lastName.value,
              email: email.value,

              password: password.value,
              confirmPassword: verify.value,
            });
  
       
  
            router.push({ name: "Home" });
          }
        } catch (error) {
          // Handle API request errors here
          console.error("Error during API request:", error);
        }
      };
      onMounted(async () => {
        const utilisateurId = router.currentRoute.value.params.id;
        await getUtilisateurData(utilisateurId);
        
      });
      return {
        firstName,
        lastName,
        email,
        password,
        verify,
        show2,
        show3,
        v$,
        submitChanges,
        getUtilisateurData
      };
    },
  };
  </script>
  
  <style>
  /* Optional styling can be added here */
  .successs {
    background: #2ecc71;
    color: #ffffff;
  }
  
  .successs:hover {
    background: #27ae60;
    color: #ffffff;
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
  </style>
    