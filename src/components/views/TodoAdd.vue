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
  try {
    if (task.title !== '' && task.description !== '') {
      await addNewTask(task, userId)
      showAddTaskMessage(taskAdded, true)
      task.title = ''
      task.description = ''
    } else if (task.title === '' || task.description === '') {
      showAddTaskMessage(taskAdded, false)
    } else {
      console.log(1)
      showAddTaskMessage(taskAdded, false)
    }
  } catch (e) {
    console.log(e)
    showAddTaskMessage(taskAdded, false)
  }
}
</script>

<template>
  <div class="wrapper">
    <button @click="$router.push('/')" type="button" class="back">
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
          rows="15"
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
.done {
  background-color: var(--green-color);
}

.message {
  margin-top: 20px;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  background-color: var(--grey-color);
  margin-bottom: 20px;
}

.success-message {
  color: var(--green-color);
}

.error-message {
  color: var(--red-color);
}
</style>
