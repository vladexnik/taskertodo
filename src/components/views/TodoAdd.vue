<script setup>
import { computed, ref } from 'vue'
import { addNewTask } from '../api/service'
import { showAddTaskMessage } from '@/utils/errMessages'
import IconAdd from '../icons/IconAdd.vue'
import IconBack from '../icons/IconBack.vue'
import store from '../store'

const errorMessage = 'Input data in all fields or reload the page!'
const succesMessage = 'Task added successfully!'

const userId = computed(() => store.state?.user?.uid)
const activeDay = computed(() => store.state?.activeDay)

const task = ref({
  title: '',
  description: '',
  date: activeDay.value,
  checked: false
})
let taskAdded = ref(null)

const addTaskConfirm = async (task, userId) => {
  // console.log(task, userId)
  if (task.title !== '' && task.description !== '') {
    await addNewTask(task, userId)
    showAddTaskMessage(taskAdded, true)
    task.title = ''
    task.description = ''
  } else if (task.title === '' || task.description === '') {
    showAddTaskMessage(taskAdded, false)
  } else {
    showAddTaskMessage(taskAdded, false)
  }
}
</script>

<template>
  <div class="wrapper">
    <button @click="$router.back()" type="button" class="back">
      <IconBack />
      Today's tasks
    </button>
    <form @submit.prevent="addTaskConfirm(task, userId)" class="form-item" id="form-item">
      <label class="form-item__label">
        Task Title:
        <input
          type="text"
          name="title"
          v-model.trim="task.title"
          class="form-item__input-title form-item__input"
        />
      </label>
      <label class="form-item__label">
        Description Title:
        <textarea
          type="text"
          name="description"
          v-model.trim="task.description"
          class="form-item__input-description form-item__input"
          rows="20"
          columns="20"
        />
      </label>
      <button type="submit" class="buttons__btn done">
        <IconAdd />
      </button>
      <div v-if="taskAdded" class="message success-message">{{ succesMessage }}</div>
      <div v-if="taskAdded === false" class="message error-message">
        {{ errorMessage }}
      </div>
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
  margin-top: 20px;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  margin-bottom: 20px;
}
.success-message {
  color: green;
}
.error-message {
  color: red;
}
</style>
