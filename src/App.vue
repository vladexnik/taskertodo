<script setup>
import { onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = useRouter()
const route = useRoute()

onBeforeMount(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.replace('/login')
    } else if (route.path == '/login' || route.path == '/signup') {
      router.replace('/')
    }
  })
})
</script>

<template>
  <main class="main">
    <router-view />
  </main>
</template>

<style>
.main {
  max-width: 782px;
  height: 90vh;
  margin: 0 auto;
}
</style>
