<script setup>
import ToDoItem from './ToDoItem.vue'
import Loader from '../loader/Loader.vue'
import Calendar from './Calendar/Calendar.vue'
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { getAllTasks } from '../api/service'
import { useLoader } from '../composables/useLoader'
import dayjs from 'dayjs'

// store.commit('setUser', 'vlad')
// console.log(store.state.user)

const store = useStore()
const user = computed(() => store.state.user)
const userId = computed(() => store.state.user?.uid)
const authIsReady = computed(() => store.state.authIsReady)
const activeDay = computed(() => store.state?.activeDay)
let data = ref(null)
let currentDateTasks = ref(null)
const { isLoading, showLoader, hideLoader } = useLoader()

watchEffect(async () => {
  if (authIsReady.value) {
    await showAllTasks()
  }
})

watchEffect(() => {
  showCurrentDateTasks()
  // console.log(checkedTasks.value, ' dd', uncheckedTasks.value)
}, [activeDay])

async function showAllTasks() {
  showLoader()
  data.value = await getAllTasks(userId.value)
  hideLoader()
}

function showCurrentDateTasks() {
  currentDateTasks.value = data.value?.filter((task) => task.date === activeDay.value)
  console.log(currentDateTasks.value, activeDay.value)
}

const updateChecked = (task, checked) => {
  task.checked = !checked
}

const completeTask = (task) => {
  task.checked = !task.checked
}

const Logout = () => {
  store.dispatch('logout')
  store.commit('setActiveDay', dayjs().format('YYYY-MM-DD'))
}

// const points = computed(() => {
//   return store.state.points
// })
// const updatePoints = (points) => {
//   store.commit('updatePoints', points)
// }
</script>

<template>
  <template v-if="authIsReady">
    <div class="container">
      <header class="header">
        <h3 class="header__title">Welcome to tasker, {{ user?.email.split('@')[0] || 'user' }}</h3>
        <button class="header__logout" @click="Logout">{{ user ? 'Logout' : 'Login' }}</button>
      </header>
      <!-- <div>points : {{ points }}</div>
    <button @click="updatePoints(3)">larger</button> -->
      <section v-if="currentDateTasks" class="todos">
        <Calendar :data="data" />
        <p class="todos__tasker-count">{{ currentDateTasks?.length || 'No' }} Tasks For Day</p>
        <ToDoItem
          v-for="task in currentDateTasks"
          :task="task"
          :title="task.title"
          :key="task.id"
          v-model="task.checked"
          @complete="completeTask(task)"
          @update:checked="updateChecked(task, task.checked)"
        />
        <button
          type="button"
          id="show-modal"
          @click="$router.push('/todo/newtodo')"
          class="btn-add"
        >
          Add a New Task
        </button>
      </section>
      <div v-else>
        <Loader :isLoading="isLoading" />
      </div>
    </div>
  </template>
</template>

<style scoped>
.container {
  margin: 20px 20px;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
}
.header__logout {
  height: 100%;
  padding: 8px 14px;
  font-size: 18px;
  background-color: rgb(51, 51, 51);
  color: white;
  border-radius: 30px;
}
.header__logout:hover {
  transform: scale(1.05);
  cursor: pointer;
  font-size: 18px;
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

.todos__tasker-count {
  font-weight: 800px;
  font-size: 18px;
  margin: 20px 0;
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
