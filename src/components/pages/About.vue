<template>
    <div class="container">
      <div class="content">
        <v-rating
          class="rating"
          v-model="rating"
          hover
          half-increments
        ></v-rating>
        <pre>{{ rating }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data: () => ({
      rating: 3.5,
    }),
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 90vh;
  }
  
  .content {
    text-align: center;
  }
  </style>
  