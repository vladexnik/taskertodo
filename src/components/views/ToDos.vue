<script setup>
import ToDoItem from './ToDoItem.vue'
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { getAllTasks } from '../api/service'

// store.commit('setUser', 'vlad')
// console.log(store.state.user)

const store = useStore()
const user = computed(() => store.state.user)
const userId = computed(() => store.state.user?.uid)
const authIsReady = computed(() => store.state.authIsReady)

let data = ref(null)

watchEffect(() => {
  if (authIsReady.value) {
    showAllTasks()
    console.log(userId.value, 'userid mainpage')
  }
})

async function showAllTasks() {
  data.value = await getAllTasks(userId.value)
  console.log(data.value)
}

const updateChecked = (task, checked) => {
  task.checked = !checked
}

const completeTask = (task) => {
  task.checked = !task.checked
}

const Logout = () => {
  store.dispatch('logout')
}

// const points = computed(() => {
//   return store.state.points
// })
// const updatePoints = (points) => {
//   store.commit('updatePoints', points)
// }
</script>

<template>
  <div class="container">
    <template v-if="authIsReady">
      <header class="header">
        <h3 class="header__title">Welcome to tasker, {{ user?.email.split('@')[0] || 'user' }}</h3>
        <button class="logout" @click="Logout">{{ user ? 'Logout' : 'Login' }}</button>
      </header>
      <!-- <div>points : {{ points }}</div>
    <button @click="updatePoints(3)">larger</button> -->

      <section v-if="data" class="main">
        <p class="main__tasker-count">{{ data.length }} Tasks Today</p>
        <ToDoItem
          v-for="task in data"
          :task="task"
          :title="task.title"
          :key="task.id"
          v-model="task.checked"
          @complete="completeTask(task)"
          @update:checked="updateChecked(task, task.checked)"
        />
      </section>
      <div v-else>Loading...</div>
      <button type="button" id="show-modal" @click="$router.push('/todo/newtodo')" class="btn-add">
        Add a New Task
      </button>
    </template>
  </div>
</template>

<style scoped>
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

.wrapper {
  max-width: 600px;
}
.form-item__label {
  display: flex;
  flex-direction: column;
}

input:focus {
  border: none;
}
.form-item__input {
  border: 0px;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.buttons__btn {
  font-size: 18px;
  height: 40px;
  padding: 5px;
  width: 100px;
  border-radius: 10px;
  color: white;
  background-color: #ff9d00;
  border: #ff9d00;
}

.back {
  height: 25px;
  border: none;
  background-color: transparent;
  margin-bottom: 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
}
.buttons__btn:hover {
  cursor: pointer;
  transform: translateY(1px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.delete {
  background-color: red;
}

.done {
  background-color: rgb(32, 226, 106);
}
</style>
