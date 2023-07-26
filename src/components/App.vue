<script setup>


</script>
<template>
    <div id="app">
      <!-- The regular router-view for the Navbar -->
      <router-view/>
  
      <!-- Login (outside navbar) -->
      <router-view name="login"></router-view>
  
      <!-- Sign Up (outside navbar) -->
      <router-view name="signup"></router-view>
    </div>
  </template>
  <style>
  /* Global styles for the whole application */
  html, body, #app {
    height: 100%;
  }
  
  body {
    background-image: url("@/assests/images/bg.jpg");
    background-size: cover;
    background-position: center;
  }
  
  /* Center the content vertically */
  #app {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  </style>
  
