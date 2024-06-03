<script setup>
import ToDoItem from './ToDoItem.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
// store.commit('setUser', 'vlad')
// console.log(store.state.user)

const store = useStore()
const user = computed(() => store.state.user)
const authIsReady = computed(() => store.state.authIsReady)
console.log(authIsReady, user)

const Logout = () => {
  store.dispatch('logout')
}

const data = ref([
  { id: 0, title: 'find bird', description: 'Fly away w d dith bird', done: false },
  { id: 1, title: 'take ddf bird', description: 'Fly a df dfway with bird', done: false },
  { id: 2, title: 'find flight', description: 'Fly awdf f day with bird', done: false },
  {
    id: 4,
    title: 'dfdfdffin plane go away i am yor blood',
    description: 'Fly df df rwfffffd wregyjill[p.p daway rd',
    done: false
  },
  {
    id: 5,
    title: 'dfdfdfdfdffind dflmd fm fmfm fkfkd l',
    description: 'kilian heay d fdfd  f fd df dfdsferiuhieruqpwel [dfs ofker pk',
    done: false
  },
  { id: 6, title: 'fd df df fd find bird', description: 'Fly away w d dith bird', done: false },
  { id: 7, title: ' jljljk htake ddf bird', description: 'Fly a df dfway with bird', done: false },
  { id: 88, title: 'bnbnmbvc find flight', description: 'Fly awdf f day with bird', done: false },
  {
    id: 33,
    title: 'fgt dfin plane go away i am yor blood',
    description: 'g hg Fly df df rwfffffd wregyjill[p.p daway rd',
    done: false
  }
])

// const points = computed(() => {
//   return store.state.points
// })
// const updatePoints = (points) => {
//   store.commit('updatePoints', points)
// }
</script>

<template>
  <div class="container">
    <template v-if="user">
      <header class="header">
        <h2 class="header__title">Welcome to tasker, {{ user?.email.split('@')[0] || 'user' }}</h2>
        <button class="logout" @click="Logout">{{ user ? 'Logout' : 'Login' }}</button>
      </header>
      <!-- <div>points : {{ points }}</div>
    <button @click="updatePoints(3)">larger</button> -->

      <section class="main">
        <p class="main__tasker-count">{{ 5 }} Tasks Today</p>
        <ToDoItem v-for="item in data" :todo="item" :key="item.id" />
      </section>
      <button class="btn-add" type="button">
        <router-link to="/todos/newtodo">Add a New Task</router-link>
      </button>
    </template>
  </div>
</template>

<style scoped>
.container {
  padding: 10px;
}
.btn-add {
  margin-top: 20px;
  max-width: 400px;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: #ff9d00;
  background-color: #ff9d00;
  color: white;
}
.btn-add:hover {
  cursor: pointer;
  transform: translateY(1px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.notes {
  margin-top: 100px;
}
.logout {
  height: 100%;
  padding: 8px 14px;
  font-size: 18px;
  background-color: rgb(51, 51, 51);
  color: white;
  border-radius: 30px;
}
.logout:hover {
  transform: scale(1.05);
  cursor: pointer;
  font-size: 18px;
}
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
}

.main__tasker-count {
  font-weight: 800px;
  font-size: 18px;
  margin: 30px 0;
}
</style>
