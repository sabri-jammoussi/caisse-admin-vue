<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The requested page does not exist.</p>
    <!-- You can add additional content or styling here -->
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.not-found h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.5rem;
  color: #777;
}
</style>
