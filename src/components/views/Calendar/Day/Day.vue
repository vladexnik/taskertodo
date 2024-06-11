<script setup>
import { computed, watchEffect } from 'vue'
import IconOrangeCircle from '../../../icons/IconOrangeCircle.vue'
import IconRedCircle from '../../../icons/IconRedCircle.vue'

const props = defineProps({
  day: Object,
  data: Array,
  isActive: Boolean
})

let tasksForDay = props.data.filter((task) => task.date === props.day.date)
const checkedTasks = computed(() => {
  return tasksForDay.some((task) => task.checked)
})
const uncheckedTasks = computed(() => {
  return tasksForDay.some((task) => !task.checked)
})

watchEffect(() => {
  console.log(props.day, props.data, tasksForDay, checkedTasks.value, uncheckedTasks.value)
}, [tasksForDay])
</script>

<template>
  <li class="wrapper">
    <button class="container" :class="{ active: isActive }" @click="$emit('setActiveDay')">
      <p class="container__day-week">{{ day.dayOfWeek }}</p>
      <p class="container__number">{{ day.dayOfMonth }}</p>
    </button>
    <div class="tasks-status">
      <icon-orange-circle class="tasks-status__none" :class="{ show: checkedTasks }" />
      <icon-red-circle class="tasks-status__none" :class="{ show: uncheckedTasks }" />
    </div>
  </li>
</template>

<style scoped>
.wrapper {
  width: 50px;
  font-size: 12px;
  font-weight: 800;
}
.tasks-status__none {
  display: none;
}
.show {
  display: block;
}
.container {
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  height: 60px;
  border: 2px solid rgb(82, 82, 82);
  border-radius: 13px;
  display: flex;
  color: black;
  transition: ease 0.5s;
}
.container__day-week {
  color: rgb(148, 148, 148);
}
.tasks-status {
  display: flex;
  justify-content: center;
}
.container:hover {
  cursor: pointer;
  color: orange;
  border-color: orange;
  transition: ease 0.5s;
}

.active {
  background-color: black;
  color: white;
  border-color: black;
}
</style>
