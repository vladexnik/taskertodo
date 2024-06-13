<script setup>
import ToDoItem from './ToDoItem.vue'
import Loader from '../loader/Loader.vue'
import Calendar from './Calendar/Calendar.vue'
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { getAllTasks } from '../api/service'
import { useLoader } from '../composables/useLoader'
import dayjs from 'dayjs'

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

function toggleTheme() {
  document.body.classList.toggle('dark-theme')
}

watchEffect(() => {
  showCurrentDateTasks()
}, [activeDay])

async function showAllTasks() {
  showLoader()
  data.value = await getAllTasks(userId.value)
  hideLoader()
}

function showCurrentDateTasks() {
  currentDateTasks.value = data.value?.filter((task) => task.date === activeDay.value)
}

const Logout = () => {
  store.dispatch('logout')
  store.commit('setActiveDay', dayjs().format('YYYY-MM-DD'))
}
</script>

<template>
  <template v-if="authIsReady">
    <div class="container">
      <header class="header">
        <h3 class="header__title">Welcome to tasker, {{ user?.email.split('@')[0] || 'user' }}!</h3>
        <button class="header__logout" @click="toggleTheme">theme</button>
        <button class="header__logout" @click="Logout">{{ user ? 'Logout' : 'Login' }}</button>
      </header>
      <section v-if="currentDateTasks" class="todos">
        <Calendar :data="data" />
        <p class="todos__tasker-count">{{ currentDateTasks?.length || 'No' }} Tasks For Day</p>
        <ul class="todos__todo-items">
          <ToDoItem
            v-for="task in currentDateTasks"
            :task="task"
            :title="task.title"
            :key="task.id"
            v-model="task.checked"
          />
        </ul>
        <button
          type="button"
          id="show-modal"
          @click="$router.push('/todo/newtodo')"
          class="todos__btn-add"
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
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
}
.header__title {
  color: var(--dark-color);
}

.header__logout {
  padding: 8px 14px;
  font-size: 18px;
  background-color: var(--dark-color);
  color: var(--white-color);
  border-radius: 30px;
}

.header__logout:hover {
  transform: scale(1.05);
  cursor: pointer;
  font-size: 18px;
}

.todos__todo-items {
  transition: ease-in 3s;
}

.todos__btn-add {
  margin-top: 20px;
  max-width: 400px;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: var(--orange-color);
  background: linear-gradient(-140deg, var(--orange-color), var(--red-color));
  color: var(--white-color);
  margin-bottom: 20px;
}

.todos__btn-add:hover {
  cursor: pointer;
  transform: translateY(1px);
  box-shadow: 0 10px 20px var(--dark-btn-hover);
}

.todos__tasker-count {
  color: var(--dark-color);
  font-weight: 800px;
  font-size: 18px;
  margin: 20px 0;
}
</style>
