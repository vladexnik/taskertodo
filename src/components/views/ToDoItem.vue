<script setup>
import { computed } from 'vue'
import { updateStatus } from '../api/service'
import store from '../store'

defineProps({
  task: Object
})

const model = defineModel()
const userId = computed(() => store.state?.user?.uid)

async function changeLocalStatus(task, userId, model) {
  await updateStatus(task, userId, model)
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
    <router-link :to="`/todo/${task.id}`">
      <span class="title">{{ task.title }}</span>
    </router-link>
  </li>
</template>

<style scoped>
.main__task-item {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.title {
  font-size: 16px;
  font-weight: 500px;
  color: var(--dark-color);
}

.round {
  position: relative;
  transform: translateY(2px);
}

.round label {
  background-color: var(--white-color);
  border: 3px solid var(--orange-color);
  border-radius: 50%;
  cursor: pointer;
  height: 23px;
  width: 23px;
  position: absolute;
  left: 0;
  top: 0;
}

.round label:after {
  border: 2px solid var(--white-color);
  border-top: none;
  border-right: none;
  content: '';
  height: 4px;
  width: 12px;
  opacity: 0;
  position: absolute;
  left: 3px;
  top: 6px;
  transform: rotate(-45deg);
}

.round input[type='checkbox'] {
  visibility: hidden;
}

.round input[type='checkbox']:checked + label {
  background-color: var(--orange-color);
  border-color: var(--orange-color);
}

.round input[type='checkbox']:checked + label:after {
  opacity: 1;
}

.route:hover {
  cursor: pointer;
}
</style>
