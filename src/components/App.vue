<template>
    <div v-if="isLoading" class="progress_circular">
      <v-progress-circular :size="60" color="success" indeterminate></v-progress-circular>
    </div>
  
    <div id="app" v-else>
      <div class="backgroung_image">
        <router-view name="login"></router-view>

        <router-view name="signup"></router-view>
      </div>

      <router-view />

    </div>

  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  
  export default {
    setup() {
      const isLoading = ref(true); 
  

      onMounted(async   () => {
       await setTimeout(() => {
          isLoading.value = false; 
        }, 2000);
      });
  
      return {
        isLoading,
      };
    },
  };
  </script>
  
  <style>

  html, body, #app {
    height: 100%;
  }
  
  .backgroung_image {
    background-image: url("@/assests/images/a5.jpg");
         /* background-color: rgb(219, 231, 231); */
    background-size: cover;
    background-position: center;
  }
  
  /* Center the content vertically */
  #app {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .progress_circular {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  </style>
  