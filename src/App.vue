<script setup>
import { ref } from 'vue'

// const open = ref(false)
// const example = ref('i want to make decision');
</script>

<template>
  <nav>
    <ul>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </ul>
  </nav>
  <main>
    <router-view />
  </main>

  <!-- <button @click="open = true">Open Modal</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport> -->
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.modal {
  position: fixed;
  z-index: 999;
  background-color: aquamarine;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
button {
  margin-top: 50px;
}
header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
.meta {
  font-size: 0.8em;
  color: #42b883;
}

@media (min-width: 1024px) {
}
</style>
