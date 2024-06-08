<script setup>
import ToDoItem from './ToDoItem.vue'
import { computed, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getTaskById, updateTask, deleteTask } from '../api/service'

const store = useStore()
const route = useRoute()
const router = useRouter()
const disableUpdFlag = ref(true)
const userId = computed(() => store.state.user?.uid)
const taskId = ref(route.params.id)

// let onetask = ref({})
let onetask = ref(null)

function changeFlag(bool) {
  disableUpdFlag.value = bool
  console.log(disableUpdFlag.value)
}

async function getSingleTask(taskId, userId) {
  onetask.value = await getTaskById(taskId, userId)
  return onetask.value
}

async function handleDeleteTask(taskId, userId) {
  console.log(taskId, userId, 'upd')
  await deleteTask(taskId, userId)
  router.push('/')
}

async function handleUpdateTask(task, userId) {
  console.log(task, userId)
  onetask.value = await updateTask(task, userId)
  await getSingleTask(taskId.value, userId)
  changeFlag(1)
}

watch(() => {
  console.log()
})

watchEffect(async () => {
  console.log(userId.value, taskId.value)
  onetask.value = await getSingleTask(taskId.value, userId.value)
})

// watchEffect(() => {
//   console.log(onetask.value)
// })
</script>

<template>
  <div class="wrapper">
    <button @click="$router.back()" type="button" class="back">
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          d="M13.729 5.575c1.304-1.074 3.27-.146 3.27 1.544v9.762c0 1.69-1.966 2.618-3.27 1.544l-5.927-4.881a2 2 0 0 1 0-3.088l5.927-4.88Z"
          clip-rule="evenodd"
        />
      </svg>
      Today's tasks
    </button>
    <form @submit.prevent="" class="form-item" v-if="onetask">
      <ToDoItem :task="onetask" :title="onetask.title" v-model="onetask.checked" />
      <label class="form-item__label">
        Task Title:
        <input
          type="text"
          name="title"
          v-model="onetask.title"
          class="form-item__input-title form-item__input"
          :disabled="disableUpdFlag"
        />
      </label>
      <!-- <ToDoItem /> -->
      <label class="form-item__label">
        Description Title:
        <textarea
          type="text"
          name="description"
          v-model="onetask.description"
          class="form-item__input-description form-item__input"
          rows="20"
          columns="20"
          :disabled="disableUpdFlag"
        />
      </label>
      <div class="buttons">
        <button type="button" @click="handleDeleteTask(taskId, userId)" class="buttons__btn delete">
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          @click="changeFlag(0)"
          type="button"
          class="buttons__btn update"
          :disabled="!disableUpdFlag"
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
        </button>

        <button
          type="submit"
          @click.prevent="handleUpdateTask(onetask, userId)"
          class="buttons__btn done"
          :disabled="disableUpdFlag"
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <!-- <p class="message" v-if="hasError">{{ errorMessage }}</p> -->
    </form>
    <div v-else>Loading...</div>
    <div class="buttons"></div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 600px;
}
.form-item__label {
  display: flex;
  flex-direction: column;
}

.form-item__input {
  border: 0px;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid black;
}

.form-item__input:disabled {
  border: none;
  color: black;
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
.buttons__btn:disabled {
  background-color: #9b9797;
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

.message {
  text-align: left;
  padding-left: 10px;
  font-weight: 600;
  color: red;
}
</style>
