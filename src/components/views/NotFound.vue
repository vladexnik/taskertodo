<template>
  <div class="not__found">
    <div class="not__found-content">
      <h1 class="not__found__title">404</h1>
      <p class="not__found__message">Oops! The page you're looking for doesn't exist.</p>
      <router-link to="/" class="not__found__link">
        Go Back Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not__found {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60%;
  text-align: center;
  font-family: Arial, sans-serif;
}

.not__found__content {
  max-width: 400px;
}

.not__found__title {
  font-size: 6rem;
  font-weight: bold;
}

.not__found__message {
  font-size: 1.2rem;
  margin: 1rem 0;
}

.not__found__link {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  color: #fff;
  background: linear-gradient(-140deg, var(--orange-color), var(--red-color));
  border-radius: 0.25rem;
  text-decoration: none;
  transition: background-color 0.3s;
}

.not__found__link:hover {
  background: linear-gradient(-140deg, var(--orange-color), var(--red-color));
}
</style>
