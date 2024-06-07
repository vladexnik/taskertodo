<script setup>
import { onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import firebase from 'firebase/compat/app'
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
  <main>
    <router-view />
  </main>
</template>

<style></style>
