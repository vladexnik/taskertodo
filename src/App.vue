<script setup>
import { onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import firebase from 'firebase/compat/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

console.log(firebase)

const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.replace('/login')
    } else if (route.path == '/login' || route.path == '/signup') {
      router.replace('/todos')
    }
  })
})
</script>

<template>
  <!-- <ul>
      <router-link to="/login">Login</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/todos">ToDos</router-link>
    </ul> -->

  <main>
    <router-view />
  </main>
</template>

<style></style>
