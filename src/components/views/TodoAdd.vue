<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addNewTask } from '../api/service'
import store from '../store'

const router = useRouter()
let route = useRoute()
const readonlybool = ref(route.path === '/todo/newtodo' ? false : true)
const errorMessage = ref('Input fields to validate task')
const userId = computed(() => store.state?.user?.uid)
const activeDay = computed(() => store.state?.activeDay)

const task = ref({
  title: '',
  description: '',
  date: activeDay.value,
  checked: false
})

const addTaskConfirm = async (task, userId) => {
  console.log(task, userId)
  let hasError = ref(false)
  if (task.title !== '' && task.description !== '') {
    await addNewTask(task, userId)
    console.log('task added confirm', task.date)
    alert(`Task ${task.title} is added`)
  } else {
    alert(errorMessage.value)
    hasError.value = true
    console.log(hasError.value)
  }
}
</script>

<template>
  <div class="wrapper">
    <button @click="router.back()" type="button" class="back">
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
    <form @submit.prevent="addTaskConfirm(task, userId)" class="form-item">
      <label class="form-item__label" v-if="!readonlybool">
        Task Title:
        <input
          type="text"
          name="title"
          v-model.trim="task.title"
          class="form-item__input-title form-item__input"
          :readonly="readonlybool"
        />
      </label>
      <!-- <ToDoItem /> -->
      <label class="form-item__label">
        Description Title:
        <textarea
          type="text"
          name="description"
          v-model.trim="task.description"
          class="form-item__input-description form-item__input"
          rows="20"
          columns="20"
          :readonly="readonlybool"
        />
      </label>
      <button type="submit" class="buttons__btn done">
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
      <!-- <p class="message" v-if="hasError">{{ errorMessage }}</p> -->
    </form>
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

.message {
  text-align: left;
  padding-left: 10px;
  font-weight: 600;
  color: red;
}
</style>
