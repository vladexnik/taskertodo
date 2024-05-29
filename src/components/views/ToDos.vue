<script setup>
import { onBeforeMount, ref } from 'vue'
import { getAuth, signOut } from 'firebase/auth'

const data = ref([
  { id: 0, title: 'find bird', description: 'Fly away w d dith bird' },
  { id: 1, title: 'take ddf bird', description: 'Fly a df dfway with bird' },
  { id: 2, title: 'find flight', description: 'Fly awdf f day with bird' },
  { id: 4, title: 'fin plane', description: 'Fly away rd' },
  { id: 5, title: 'find kill', description: 'kilian heay d' }
])
console.log(data)

const name = ref('')

onBeforeMount(() => {
  const user = getAuth().currentUser
  if (user) {
    name.value = user.email.split('@')[0]
  }
})

const LogOut = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      alert(error)
    })
}
</script>

<template>
  <h1>Welcome, {{ name }}</h1>
  <button class="logout" @click="LogOut">Logout</button>
  <div class="notes">
    <ul>
      <li v-for="note in data" :key="note.id">
        <p>
          <strong>{{ note.title }}</strong>
        </p>
        <p>{{ note.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.notes {
  margin-top: 100px;
}
.logout {
  padding: 3px;
  background-color: blue;
}
</style>
