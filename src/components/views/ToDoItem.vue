<script setup>
import { computed } from 'vue'
import { deleteTask, updateStatus, getAllTasks } from '../api/service'
import store from '../store'
// import { useRouter } from 'vue-router'

const props = defineProps({
  task: Object
})

const model = defineModel()
const userId = computed(() => store.state?.user?.uid)
// const router = useRouter()

async function changeLocalStatus(task, userId, model) {
  await updateStatus(task, userId, model)
}

async function deleteTaskConfirm(task, id) {
  console.log(task, 'w', id)
  await deleteTask(task, id)
  await getAllTasks(id)
}
</script>

<template>
  <li class="main__task-item">
    <div class="round">
      <input
        type="checkbox"
        :id="task.id"
        :value="task.checked"
        v-model="model"
        @change="changeLocalStatus(task, userId, model)"
      />
      <label :for="task.id"></label>
    </div>
    <router-link :to="`/todo/${props.task.id}`">
      <span class="title">{{ task.title }}</span>
    </router-link>
    <!-- <div @click="$router.push(`/todo/${props.task.id}`)" class="route">
      <span class="title">{{ task.title }}</span>
    </div> -->
    <button type="button" @click="deleteTaskConfirm(task, userId)">delete</button>
  </li>
</template>

<style scoped>
.main__task-item {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.title {
  font-size: 16px;
  font-weight: 500px;
  color: black;
}

.round {
  position: relative;
  transform: translateY(5px);
}
.round label {
  background-color: #fff;
  border: 3px solid #ff9d00;
  border-radius: 50%;
  cursor: pointer;
  height: 23px;
  left: 0;
  position: absolute;
  top: 0;
  width: 23px;
}

.round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: '';
  height: 4px;
  left: 3px;
  opacity: 0;
  position: absolute;
  top: 6px;
  transform: rotate(-45deg);
  width: 12px;
}

.round input[type='checkbox'] {
  visibility: hidden;
}

.round input[type='checkbox']:checked + label {
  background-color: #ff9d00;
  border-color: #ff9d00;
}

.round input[type='checkbox']:checked + label:after {
  opacity: 1;
}

.route:hover {
  cursor: pointer;
}
</style>
